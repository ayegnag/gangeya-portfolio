import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, FileText, Mail } from "lucide-react";

// Variant #3 — Bold Minimalist Portfolio
// Strong visual hierarchy, compact case-study cards with clear metrics, signature mark,
// and a 'quick facts' hero that recruiters can scan in 5 seconds.

export default function Portfolio() {
  const studies = [
    {
      title: "Reconciliation Engine",
      role: "Lead Engineer",
      metric: "10× throughput",
      blurb: "Rewrote streaming pipeline, added idempotent writes and observability to eliminate data-loss during spikes.",
      tags: ["Kotlin", "Kafka", "Postgres", "K8s"]
    },
    {
      title: "Consent SDK",
      role: "Full‑stack Engineer",
      metric: "+14% opt-ins",
      blurb: "Built a zero-dependency consent SDK and modular UI components adopted by 6 product teams.",
      tags: ["React", "TypeScript", "OpenID"]
    },
    {
      title: "Rollout Platform",
      role: "Senior Engineer",
      metric: "−60% failed rollouts",
      blurb: "Implemented progressive rollouts and automated canary analysis tied to metrics and automated rollback.",
      tags: ["Go", "Redis", "Feature flags"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Adjust for desired typing speed
      },
    },
  };

  const characterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const typingAnimate = function (text) {
    const characters = text.split("");

    return (
      <>
        {characters.map((char, i) => (
          <motion.span key={i} variants={characterVariants}>
            {char}
          </motion.span>
        ))}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 antialiased">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-md bg-black text-white flex items-center justify-center font-semibold">GU</div>
            <div>
              <div className="text-lg font-bold">Gangeya Upadhaya</div>
              <div className="text-xs text-slate-500">Senior Full‑Stack Engineer — Remote</div>
            </div>
          </div>

          <nav className="flex items-center gap-4 text-sm">
            <a href="#work" className="hover:underline">Work</a>
            <a href="#about" className="hover:underline">About</a>
            <a href="/resume.pdf" className="inline-flex items-center gap-2 px-3 py-2 rounded-md border">Resume</a>
          </nav>
        </header>

        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0, transition: { duration: 1 } }} className="text-4xl font-extrabold leading-tight">Design‑minded engineering. Measured results.</motion.h1>
            <motion.p className="mt-4 text-slate-700" initial="hidden" animate="visible" variants={containerVariants}>{typingAnimate("I ship frontends that feel polished and backends that run predictably — always with clear metrics and low operational toil.")}</motion.p>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 border rounded-lg">
                <div className="text-xs text-slate-400">Experience</div>
                <div className="font-semibold">12+ years</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="text-xs text-slate-400">Focus</div>
                <div className="font-semibold">Product, Reliability</div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a href="#work" className="px-4 py-2 rounded-md bg-black text-white text-sm">Case studies</a>
              <a href="#contact" className="px-4 py-2 rounded-md border text-sm">Contact</a>
            </div>
          </div>

          <aside className="order-first md:order-last p-6 rounded-2xl border bg-slate-50 dark:bg-slate-800">
            <div className="text-xs text-slate-500">Quick facts</div>
            <div className="mt-3 space-y-2">
              <div className="text-sm"><strong>Role:</strong> Senior / Lead engineer (remote)</div>
              <div className="text-sm"><strong>Available for:</strong> Full‑time, contract</div>
              <div className="text-sm"><strong>Hiring priorities:</strong> product ownership, measurable outcomes</div>
            </div>
          </aside>
        </section>

        <section id="work" className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Select work — impact first</h2>
          <div className="space-y-4">
            {studies.map((s, i) => (
              <article key={i} className="p-5 rounded-xl border hover:shadow transition-shadow">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <div className="text-sm text-slate-500">{s.role}</div>
                  </div>
                  <div className="text-indigo-600 font-bold">{s.metric}</div>
                </div>

                <p className="mt-3 text-sm text-slate-700">{s.blurb}</p>

                <div className="mt-4 flex gap-2 flex-wrap text-xs">
                  {s.tags.map((t, ix) => (<span key={ix} className="px-2 py-1 border rounded-full">{t}</span>))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">About</h2>
          <p className="text-slate-700">I prefer small, cross-functional teams that ship outcomes rather than checkboxes. I care deeply about UX, accessibility, and measurable reliability.</p>
        </section>

        <section id="contact" className="mb-12">
          <div className="p-6 border rounded-2xl flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="text-sm text-slate-400">Get in touch</div>
              <div className="mt-2 text-sm">If your role requires a product-minded engineer who ships end-to-end, email me.</div>
            </div>
            <div className="flex gap-3 items-center">
              <a href="mailto:you@example.com" className="inline-flex items-center gap-2"> <Mail size={16} /> you@example.com</a>
              <a href="https://github.com/yourhandle" className="inline-flex items-center gap-2"> <Github size={16} /> github.com/yourhandle</a>
            </div>
          </div>
        </section>

        <footer className="text-xs text-slate-500">© {new Date().getFullYear()} Gangeya U. — Minimal, focused, measurable.</footer>
      </main>
    </div>
  );
}
