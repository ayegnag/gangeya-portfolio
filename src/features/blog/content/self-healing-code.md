---
title: What If Code Could Heal Itself
description: A thought experiment on software architecture that allows for self-healing and adaptation.
image: "/images/blog/self-healing-code.png"
createdAt: 2026-04-06
updatedAt: 2026-04-06
---

![Taking Notes](/images/blog/self-healing-code.png)

# What If Code Could Heal Itself?

I came across a news piece about MS Outlook crashing on the Artemis II mission. It was later fixed by remote access by the ground control. Around the same time, I was reading about how the Mars rovers handle failures — Curiosity had its wheel-driving algorithm rewritten mid-mission and uploaded from Earth after terrain damage became a real concern. The rover adapted. It kept running in a degraded state while waiting for the fix, flagged the problem, and carried on.

Two pieces of software. Completely different outcomes under failure, one crashes - other adapts. That contrast is what started this whole thought experiment.


## The Gap in How We Handle Failure

Error handling in most applications looks like this:

```js
try {
  const data = await fetchUserDashboard(userId);
  render(data);
} catch (err) {
  showErrorScreen(err);
}
```

We tell the code what to do when things go wrong — as long as we anticipated what "wrong" looks like. The retry logic, the circuit breakers, the fallback states — all of it is written upfront, for failures we predicted.

The failures we didn't predict are the ones that cause outages. The third-party API that changes its response shape silently. The certificate that expires in a dependency you don't control. The combination of OS version, hardware, and load that nobody could have tested in staging. These aren't bugs in the traditional sense. The code is doing what it was told. The environment around it changed.

Voyager 1's Fault Protection Software — written in the 1970s — autonomously detects anomalies and switches the spacecraft into safe mode with no ground intervention. That firmware has been running for 47 years. Outlook crashed on a rocket.

The philosophy is different, not the quality of the engineers.

## The Idea: A Self-Healing Module

What if applications had a module whose job was to detect runtime failures, classify them, attempt a patch, observe whether it worked, and either keep or revert it — without crashing, while keeping the user informed?

The high-level loop:

```
Failure Occurs
      │
      ▼
┌─────────────────────┐
│  Classification     │  ← External or internal failure?
│  Engine             │    External: eligible. Internal: stop here.
└────────┬────────────┘
         │ external
         ▼
┌─────────────────────┐
│  Healing Spec       │  ← Known fix for this fingerprint?
│  Lookup             │    Local cache → Org server → HaaS registry
└────────┬────────────┘
         │ spec found
         ▼
┌─────────────────────┐
│  Patch Execution    │  ← Run patch in sandboxed context
│  + Monitoring       │    Watch verifyResolved() condition
└────────┬────────────┘
         │
    ┌────┴─────┐
    │          │
resolved   unresolved
    │          │
    ▼          ▼
 Revert    Promote to
 patch     persistent fix
           (pending review)
```

Three separate problems to solve: classification, healing specs, and patch memory. Each is independently useful. You can adopt them in layers.

## Pillar 1 - Classification

The most important gate in the system. The classifier answers one question: *did the environment fail the code, or did the code fail the environment?*

```
EXTERNAL  →  network timeouts, API unavailability, rate limits,
             config drift, expired certs, hardware I/O, dependency downtime

INTERNAL  →  wrong business logic, null pointer from your own data model,
             race conditions, security violations, data integrity failures
```

Internal failures should never be healed. A patch over a null pointer dereference might silence the error and corrupt data silently for weeks. The classifier is the immune system's self vs non-self check — it keeps the healer from touching things it shouldn't.

In practice, this lives as metadata on the function or component:

```ts
@healingContract({
  category: 'EXTERNAL',         // eligible for healing
  stance: 'HEAL',               // what to do on failure
  fallback: 'DEGRADE',          // if healing fails
  maxAttempts: 3,
  timeout: 8000,
  criticality: 'MEDIUM'
})
async function loadUserDashboard(userId: string): Promise<Dashboard> {
  return await UserService.getDashboard(userId);
}
```

```ts
@healingContract({
  category: 'INTERNAL',         // do not attempt healing
  stance: 'DISABLE',
  reason: 'business_logic'
})
function calculateTaxRate(income: number, region: string): number {
  // logic error here needs a human fix, not a runtime patch
}
```

The `stance` field defines the full behaviour chain. There are four stances:

| Stance | Behaviour |
|---|---|
| `HEAL` | Attempt patch, show healing UI, revert if resolved |
| `DEGRADE` | Keep running in reduced capacity, no retry |
| `DISABLE` | Remove from UI, fail silently |
| `ESCALATE` | Alert human or parent system immediately |

Stances chain as fallbacks. A `HEAL` component that exhausts its attempts moves to `DEGRADE`. A `DEGRADE` component that stays broken long enough moves to `DISABLE`.

```
HEAL  →(attempts exhausted)→  DEGRADE  →(timeout)→  DISABLE
```

## Pillar 2 - Healing Specs

Rather than generating patches from scratch at runtime, the healing logic is written as specs — closer to recovery test cases than to generated code. Humans write the healing knowledge. The module executes it.

```ts
// user-dashboard.healing.spec.ts

healingSpec('loadUserDashboard', {

  scenario: 'UserService timeout',
  trigger: { errorType: 'TIMEOUT', dependency: 'UserService' },
  patch: async (ctx) => {
    const cached = await CacheStore.get(`dashboard:${ctx.userId}`);
    return cached ?? EMPTY_DASHBOARD_DEFAULTS;
  },
  verifyResolved: async () => {
    return await UserService.ping() === 'OK';
  },
  revertAfter: { successfulChecks: 3, intervalMs: 10000 }

})

healingSpec('loadUserDashboard', {

  scenario: 'Missing user preferences in response',
  trigger: { errorType: 'NULL_REFERENCE', field: 'user.preferences' },
  patch: async (ctx) => ({
    ...ctx.partialData,
    preferences: DEFAULT_USER_PREFERENCES
  }),
  verifyResolved: async () => true   // structural gap, revert not applicable

})
```

The separation keeps the logic auditable and testable — healing specs can run in CI just like unit tests. When a novel patch works in production, it gets serialised into this format and submitted for review before becoming permanent.

## Pillar 3 - Patch Memory and HaaS

A patch that works gets stored. On the next encounter with the same error fingerprint, the module has a candidate without going through spec evaluation again.

The lookup goes through three layers:

```
┌──────────────────────────────────────────────┐
│           HaaS — Global Registry             │
│   Crowd-sourced, reviewed, versioned patches │
│   "Has anyone in the world seen this?"       │
└──────────────────┬───────────────────────────┘
                   │ escalate if org cache misses
┌──────────────────┴───────────────────────────┐
│           Org Healing Server                 │
│   Company-internal patch knowledge base      │
│   "Has our system seen this before?"         │
└──────────────────┬───────────────────────────┘
                   │ escalate if local misses
┌──────────────────┴───────────────────────────┐
│           Local Healer Module                │
│   In-memory + persisted cache per instance   │
│   "Have I seen this in this session?"        │
└──────────────────────────────────────────────┘
```

The request sent up the chain carries a structured fingerprint:

```json
{
  "errorFingerprint": "sha256(functionName + errorType + stackFrame)",
  "errorClass": "NETWORK_TIMEOUT",
  "category": "EXTERNAL",
  "context": {
    "function": "loadUserDashboard",
    "dependency": "UserService.getDashboard",
    "attemptsMade": 1
  },
  "appVersion": "3.1.0",
  "environment": "production"
}
```

The response comes back as a ranked list of patches with confidence scores. The local healer picks the highest-confidence one within its allowed scope, which is defined by the healing contract's criticality level:

| Criticality | Lookup Scope |
|---|---|
| `LOW` | Local cache only |
| `MEDIUM` | Local + Org server |
| `HIGH` | All three layers |
| `CRITICAL` | All three + human alert triggered |

This mirrors biological immune memory. First exposure to a pathogen — slow, costly response. Second exposure — the antibody is already prepared. The cost drops to near zero.

## Where Healing Ends and Robust Code Begins

There's a reasonable argument that says: just write better code. Handle the edge cases. Don't land in failure states to begin with. For predictable failures, that's the right answer. A missing null check, an unhandled promise rejection, unvalidated input — those need proper fixes.

The argument runs out at the boundary between the codebase and the world. No engineer writing code today can predict how their dependency graph behaves in three years. Libraries deprecate. APIs evolve. Infrastructure shifts. Regulatory changes make previously valid data invalid.

A concrete way to draw the line:

```
Known failure + Known solution    →  internal error handling
Known failure + Unknown solution  →  graceful degradation
Unknown failure + Runtime patch   →  healing module territory
Unknown failure + No solution     →  escalate, human in the loop
```

The healer occupies one specific quadrant. It's a runtime safety net for the failure space that robust code alone can't cover, because that failure space is genuinely open-ended.

## Scaling by System Complexity

Biological systems follow a pattern worth borrowing — the complexity of healing matches the criticality of the organism. Cells don't heal, lizards shed tails, mammals close wounds, whales have evolved mechanisms to suppress cancer at scale.

```
Tier 1 — Restart & Retry
  Serverless functions, stateless services
  Just restart. Kubernetes already handles this.

Tier 2 — Circuit Breaker + Degrade
  APIs, microservices with external dependencies
  Retry logic, fallback responses, shed non-critical load

Tier 3 — Classify + Spec + Memory
  Feature-rich applications, dashboards, consumer apps
  Full healing module: classification, specs, patch memory, healing UI

Tier 4 — Verified + Supervised
  Medical, aerospace, financial systems
  Everything above + formal verification, hardware redundancy,
  mandatory human approval on all patches
```

Each tier builds on the previous. The rover runs on Tier 4, but the foundation is the same Tier 1 and 2 principles every distributed system already uses.

## The Real Blocker: Security

A self-modifying system is an attractive attack surface. The patch memory store becomes a target. A malicious patch that silences the right error at the right time could do damage quietly for a long time.

Biological systems co-evolved their defences alongside healing — the immune system doesn't separate healing from defence, they're the same system. The software equivalent needs the same treatment:

| Biological Defence | Software Equivalent |
|---|---|
| Skin — first barrier | Sandbox the healing agent, restrict patch scope |
| Inflammation — isolates threat | Run patch in isolated context before promoting |
| Immune memory — recognises self | Code-sign all patches, reject unsigned candidates |
| Fever — hostile environment | Rate-limit patch attempts, kill switch on healing loops |
| Apoptosis — cell self-destructs | Module suicide: escalate to safe mode after N failed healing attempts |

This can't be bolted on after the fact. It needs to be part of the core design.

## Closing Thought

The infrastructure layer has had self-healing for years. Kubernetes restarts failed pods. Load balancers reroute around unhealthy nodes. Cloud providers offer automated failover. All of that works at the deployment level.

The logic layer — where the actual application behaviour lives — still crashes and waits for a human. That's the gap this idea is about.

The pieces all exist: observability tooling, LLM-assisted code generation, distributed caching, edge computing. The missing thing is a coherent module that ties them together with the right philosophy at the centre. The classification contract, the healing spec format, the patch memory schema — these are all solvable problems.

The assumption worth questioning is the one most software is still built on — that writing the code well enough means anticipating everything the world will do to it. The rovers answered that a long time ago. The architecture just hasn't made it into mainstream application development yet.
