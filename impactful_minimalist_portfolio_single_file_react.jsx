import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, FileText, Mail, Briefcase } from "lucide-react";

// Impactful, minimalist single-file React portfolio — bolder visual language, sharper copy,
// focused case studies with measurable outcomes, quick-scan hero and compact deep-dive sections.
// Drop into a React app (Vite/CRA). Uses Tailwind utility classes.

export default function Portfolio() {
  const caseStudies = [
    {
      title: "Reconciliation at Scale",
      subtitle: "Payments pipeline for enterprise B2B",
      impact: "10x throughput · 95% fewer retries",
      role: "Lead Engineer",
      highlights: [
        "Re-architected streaming processors to handle peak bursts without data loss",
        "Introduced idempotent writers and a proven retry strategy",
        "Built dashboards and runbooks that cut incident MTTR to <30m",
      ],
      tech: ["Kotlin","Kafka","Postgres","K8s"],
    },
    {
      title: "Consent UX & Lightweight SDK",
      subtitle: "Cross-platform privacy flows used by 6 product teams",
      impact: "+14% opt-ins · SDK adopted org-wide",
      role: "Full‑stack Engineer",
      highlights: [
        "Designed a zero-dependency JS SDK with incremental rollouts",
        "Led UX workshops and A/B tests focused on clarity and friction removal",
        "Delivered accessible components and thorough docs for quick integration",
      ],
      tech: ["React","TS","OpenID"],
    },
    {
      title: "Experimentation & Rollouts",
      subtitle: "Feature flagging and safe launches",
      impact: "60% fewer failed rollouts",
      role: "Senior Engineer",
      highlights: [
        "Built progressive rollout orchestration and canary analysis jobs",
        "Connected flags to metrics to automate rollbacks on regressions",
      ],
      tech: ["Go","Redis","Postgres"],
    }
  ];

  const skills = [
    "Product-minded engineering",
    "Design-first frontends (React, TypeScript)",
    "Resilient backends (Kotlin, Go, SQL)",
    "Platform & infra (Kubernetes, Terraform, CI/CD)",
    "Observability & incident engineering",
    "Mentoring, hiring, and technical leadership",
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 antialiased">
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Top bar */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-semibold">GU</div>
            <div>
              <div className="text-sm font-semibold">Gangeya U.</div>
              <div className="text-xs text-slate-500">Senior Full‑Stack Engineer — Remote</div>
            </div>
          </div>

          <nav className="flex items-center gap-4 text-sm">
            <a href="#work" className="hover:underline">Work</a>
            <a href="#approach" className="hover:underline">Approach</a>
            <a href="#contact" className="hover:underline">Contact</a>
            <a href="/resume.pdf" className="ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-md border border-slate-200 text-sm">Resume <FileText size={14} /></a>
          </nav>
        </header>

        {/* Hero */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-16">
          <div>
            <motion.h1 initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.45 }} className="text-4xl md:text-5xl font-extrabold tracking-tight">
              I build dependable products — from pixel to production.
            </motion.h1>

            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Fast iterations, design-aware frontends, and systems that don’t break. I focus on measurable outcomes: reliability, speed, and clarity.</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#work" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-900 text-white text-sm">Explore case studies</a>
              <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 text-sm">Talk to me</a>
            </div>

            <div className="mt-6 text-sm text-slate-500">
              <strong>Available:</strong> Senior / Lead roles (remote preferred) · <strong>Open to</strong> short-term contracts.
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 border rounded-lg bg-slate-50 dark:bg-slate-800">
                <div className="text-xs text-slate-400">Years</div>
                <div className="font-semibold">12+</div>
              </div>
              <div className="p-3 border rounded-lg bg-slate-50 dark:bg-slate-800">
                <div className="text-xs text-slate-400">Primary</div>
                <div className="font-semibold">React · Kotlin · Infra</div>
              </div>
            </div>
          </div>

          {/* Visual hero: code + design snapshot */}
          <aside className="order-first md:order-last bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border rounded-2xl p-6 shadow-lg">
            <div className="text-xs text-slate-500 mb-3">Snapshot</div>
            <pre className="rounded-lg p-4 bg-black text-white text-xs overflow-auto"><code>// production-ready
const release = () =&gt; {
  ensureObservability();
  runCanary();
  measureResponseSLOs();
}</code></pre>
            <div className="mt-4 text-sm text-slate-400">Design + delivery: shipping features with clear metrics and low toil.</div>
          </aside>
        </section>

        {/* Work / Case studies */}
        <section id="work" className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Selected case studies</h2>

          <div className="grid gap-6">
            {caseStudies.map((c, idx) =&gt; (
              <article key={idx} className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{c.title}</h3>
                    <div className="text-sm text-slate-500">{c.subtitle} • <span className="italic">{c.role}</span></div>
                  </div>
                  <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{c.impact}</div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-700 dark:text-slate-300">
                  <ul className="md:col-span-2 list-disc pl-5 space-y-1">
                    {c.highlights.map((h, i) =&gt; <li key={i}>{h}</li>)}
                  </ul>
                  <div className="p-3 border rounded-lg">
                    <div className="text-xs text-slate-400 mb-2">Tech</div>
                    <div className="text-sm">{c.tech.join(' · ')}</div>
                  </div>
                </div>

                <div className="mt-4 flex gap-3 text-sm">
                  <a href="#" className="underline">Case study</a>
                  <a href="#contact" className="text-slate-500">Discuss similar work</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Approach */}
        <section id="approach" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">How I approach problems</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="text-xs text-slate-400">Outcome-first</div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">I translate business targets into measurable engineering goals — SLOs, metrics, and experiments instead of tasks.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-xs text-slate-400">Design fidelity</div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Product UX matters — I ship accessible, keyboard-first interfaces and reusable components.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-xs text-slate-400">Resilience</div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Autoscaling, retries, clear runbooks, and observability — minimal surprises in production.</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Core skills</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((s, i) =&gt; (
                <span key={i} className="px-3 py-2 rounded-full border text-sm text-slate-600 dark:text-slate-300">{s}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mb-12">
          <div className="p-6 border rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-sm text-slate-400">Let's talk</div>
              <h3 className="text-lg font-semibold">If your role is about shipping product, reducing customer friction, and creating reliable experience — let's chat.</h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <a href="mailto:you@example.com" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border"> <Mail size={16} /> you@example.com</a>
              <a href="https://github.com/yourhandle" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2"> <Github size={16} /> github.com/yourhandle</a>
            </div>
          </div>
        </section>

        <footer className="text-xs text-slate-500">© {new Date().getFullYear()} Gangeya U. — Remote preferred. Built for clarity and impact.</footer>
      </main>
    </div>
  );
}
