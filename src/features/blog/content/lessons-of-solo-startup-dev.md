---
title: Building Under Uncertainty - Lessons from a Solo Startup a Decade Ago
description: A reflection on building a startup solo under tight constraints, the decisions that shaped it, and the lessons that still guide how I build software today.
image: "/images/blog/solo-startup.png"
createdAt: 2026-01-03
updatedAt: 2026-01-03
---

![Taking Notes](/images/blog/solo-startup.png)


### The beginning

About a decade ago, fresh out of a startup stint, I teamed up with a business partner to try building something of our own. This was around the early boom of consumer 3D printing. Interest was growing fast, but accessible, high-quality online services were still rare. We saw an opportunity there.

The idea was straightforward: build an online portal where users could upload STL files, preview them in 3D, choose materials and finishes, get instant pricing, and place orders. We planned to start with individual makers and hobbyists - organic customers - deliver better quality than what was available, and grow from there.

I was the only developer. No team. No dedicated designer. Just me, a handful of paper sketches we loosely agreed on, and a ticking clock. I had walked away from a steady salary and was living off my savings, which were draining faster than I’d like to admit. Every delayed week had a real cost. I gave myself roughly six months of runway and settled into 12–14 hour days, trying to ship something usable before time ran out.

---

### Why I chose the stack I did

This was around 2014–2015. React had been open-sourced not long before and was starting to gain attention, mostly among larger teams and experimental projects. It wasn’t yet the default choice it later became. The ecosystem was immature, tooling was rough, and community guidance for edge cases was limited. Angular 1.x felt even heavier - highly opinionated, verbose, and demanding more setup than I could afford as a solo developer under pressure.

I needed speed and reliability, not theoretical elegance or long-term bets.

jQuery fit that reality. It was battle-tested, lightweight, and let me move fast without fighting frameworks, build pipelines, or rigid patterns. It wasn’t pretty, but I could prototype interactions in hours instead of days.

For the core differentiator - interactive 3D previews of uploaded models - Three.js stood out. It had already been around for a few years and wrapped WebGL in a way that made real progress possible without diving into shader code. Once integrated, rotating, zooming, scaling, and previewing models felt smooth and surprisingly powerful for the time.

The backend choice was straightforward: Node.js. Same language end to end, quick to spin up, and easy to pair with MongoDB’s flexible schema for early experimentation around orders and models.

The goal was simple: ship an end-to-end MVP before my savings hit zero.

![Salvaged screenshot of material selection screen during testing phase](/images/blog/realprint-material-test-screenshot.jpg)
*Salvaged screenshot of material selection screen during testing phase*

---

### What held up - and what broke

Some things worked remarkably well. The Three.js previews genuinely impressed early users. Seeing their models rendered and manipulable in the browser felt magical back then. Node handled uploads and basic processing without much friction. jQuery did its job gluing everything together quickly.

But cracks showed up fast.

I dove straight into coding from rough sketches. That meant constant redesigns mid-build. Navigation patterns changed. Menus were reworked multiple times. Layouts shifted as real interactions exposed gaps. It wasn’t a lack of skill - it was a lack of holistic thinking about the user journey before implementation.

Pixel perfection became my enemy. I obsessed over visual details - softening sharp corners on material selectors, tweaking spacing, adjusting shadows until things felt “just right.” Getting from 0 to 90% was fast. Going from 90 to 99% consumed weeks. Meanwhile, core functionality lagged behind.

The backend suffered because of that imbalance. Cost calculations lived on the client far too long. Quotes were computed in the browser, sent to MongoDB as-is, and trusted blindly. No server-side validation. Plenty of room for tampering and inconsistencies - things I wouldn’t accept today.

As the project grew, the codebase turned into a tangled mess. Without framework-enforced structure or clear separation of concerns, logic spread everywhere. Debugging became archaeological work: tracing where values originated, figuring out which DOM manipulation triggered what. Three.js scaling didn’t help either. Supporting wildly different model sizes and units led to endless tweaking. I tried to build a “handle everything” tool when I should have constrained the problem much earlier.

Then came the biggest surprise.

Organic traffic never really took off. Footfall was low. Eventually, we pivoted to a B2B approach - reaching out directly to businesses. Ironically, many of the most valuable orders came through simple email exchanges of model files. The portal became more of a marketing showcase than the core transaction engine we had envisioned.

That was a humbling lesson: sometimes the product you build isn’t the product that creates value.

---

### What I learned the hard way

Some lessons only sink in after you pay for them.

**Sharpen the axe before swinging.**  
Spend real time upfront defining constraints, MVP scope, and user scenarios. Even simple wireframes or flow diagrams save more time than they cost.

**Time is the scarcest resource.**  
Feature creep kills momentum. It’s easy - especially early in your career - to chase shiny ideas. Reassess ruthlessly: does this move the needle _now_?

**Iterate, don’t perfect.**  
Build quickly, ship, gather feedback, refine. Without a feedback loop, you’re just guessing.

**Tools are contextual, not moral choices.**  
jQuery wasn’t the wrong tool for rapid prototyping under pressure. The mistake was letting it scale without structure. Simple principles like separation of concerns would have reduced long-term pain.

**Build for reality, not happy paths.**  
Validate inputs. Perform critical calculations on the server. Enforce boundaries early. This prevents security issues and reduces future rework.

**Uncertainty shifts goalposts.**  
We aimed for consumers. Reality pushed us toward B2B. Adapt fast. Don’t cling to the original vision just because you invested in it.

**Architecture matters.**  
The UI is the face of the service. The backend is the brain. Business logic, pricing, and security belong on the server. APIs should expose only what’s necessary. Patterns like MVC exist for a reason - they prevent chaos.

---

### How I’d build it today

The core principles haven’t changed: ship fast, validate assumptions early, and prioritize real user value over polish.

But the tools - and the process - have evolved.

I’d start with documentation, written first from a product-owner perspective, then as an architect, before ever thinking like a developer. This forces clarity around the _why_ and surfaces missing scenarios early.

Design would live in Figma: flows, mood boards, interactive mockups, feedback loops before a single line of production code.

For a greenfield build today, I’d likely choose React or Vue with Vite and pnpm. Context and hooks would handle state at this scale - no Redux by default. OAuth and social logins would reduce friction for onboarding.

Three.js would still be the choice for 3D previews, but with stronger constraints: file size limits, unit normalization, and graceful fallbacks.

The backend would remain Node.js, but I’d lean on AWS more deliberately - EC2 or Lightsail, S3 for storage, and a relational database like Postgres or MySQL for structured data. API Gateway would handle throttling and security.

I’d also separate B2B flows from day one: manual uploads, quote requests, and internal dashboards built explicitly for how those customers actually behave.

And yes - AI tools would absolutely be part of the workflow. Not as a replacement for thinking, but as accelerators for boilerplate, tests, scaffolding, and even early component generation from specs.

---

### The real takeaway

Stacks change. jQuery gives way to React. Mongo gives way to Postgres. Manual deploys give way to managed platforms and AI-assisted workflows.

What compounds is judgment.

Knowing when to ship something imperfect. When to constrain scope. When to pivot. How to balance aesthetics with functionality. Building under uncertainty forces you to develop exactly those instincts.

That project didn’t succeed the way I originally imagined. But it shaped how I think, design, and decide today. And in hindsight, that may have been the most valuable outcome of all.

If you’re deep into your own project right now, remember this: **progress beats perfection**. Launch, learn, iterate. The lessons will last far longer than the code.
