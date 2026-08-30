"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";
import { site } from "@/lib/data";
import { RunTestsBanner } from "./run-tests-banner";

const marquee = [
  "Playwright",
  "TypeScript",
  "Selenium",
  "Postman",
  "Newman",
  "JMeter",
  "Jenkins",
  "GitHub Actions",
  "SQL",
  "Pytest",
  "LLM Testing",
  "MCP Servers",
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36"
    >
      {/* background grid + glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-light bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] dark:bg-grid-dark"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[120px] dark:bg-brand-600/20"
      />

      <div className="container-px">
        <div className="grid items-start gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-10">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="eyebrow">
                <Sparkles className="h-3.5 w-3.5 text-brand-500" />
                Quality Engineering, done right
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                <MapPin className="h-3.5 w-3.5" />
                {site.location}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-[3.4rem]"
            >
              Senior QA Engineer ·{" "}
              <span className="bg-gradient-to-r from-brand-600 to-glow bg-clip-text text-transparent dark:from-brand-400 dark:to-glow">
                Test Automation · AI Quality Engineering
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg"
            >
              {site.heroSubtext}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href="#proof" className="btn-primary">
                View My Work
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href={site.resumeUrl} download className="btn-secondary">
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </motion.div>

            {/* trust line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-slate-400"
            >
              7+ yrs · Healthcare · SaaS · E-commerce · Enterprise · AI
            </motion.p>
          </div>

          {/* Right: interactive "run my tests" banner */}
          <div className="lg:pl-4">
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-brand-500/10 blur-3xl dark:bg-brand-500/20"
              />
              <RunTestsBanner />
            </div>
          </div>
        </div>

        {/* Tech marquee */}
        <div className="relative mt-16 overflow-hidden py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent dark:from-ink-950" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent dark:from-ink-950" />
          <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-3">
            {[...marquee, ...marquee].map((tech, i) => (
              <span
                key={i}
                className="chip whitespace-nowrap font-mono !text-[13px]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
