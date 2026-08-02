"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { X } from "lucide-react";
import { caseStudies } from "@/lib/case-studies";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";

const markdownComponents = {
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="mt-7 mb-2.5 font-display text-base font-semibold text-slate-900 dark:text-white">
      {children}
    </h4>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mb-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
      {children}
    </p>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-slate-800 dark:text-slate-100">
      {children}
    </strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic text-slate-700 dark:text-slate-200">{children}</em>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className="rounded bg-brand-500/10 px-1.5 py-0.5 font-mono text-[13px] text-brand-700 dark:text-brand-300">
      {children}
    </code>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
      {children}
    </ul>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="pl-1">{children}</li>
  ),
};

export function CaseStudies() {
  const [active, setActive] = useState<string | null>(null);
  const study = caseStudies.find((s) => s.id === active) || null;

  // Lock scroll + Escape-to-close while the modal is open
  useEffect(() => {
    document.body.style.overflow = study ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [study]);

  return (
    <section id="work" className="section-pad">
      <div className="container-px">
        <SectionHeading
          eyebrow="Selected Work"
          title="Thrown In the Deep End"
          description="Three situations I didn't plan for — and what I had to learn to get through them."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {caseStudies.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.06}>
              <button
                type="button"
                onClick={() => setActive(s.id)}
                className="card group flex h-full w-full flex-col p-6 text-left transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <span className="inline-flex h-9 w-fit items-center rounded-lg border border-slate-200 bg-[#ffffff] px-2.5 dark:border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.logo}
                    alt={s.company}
                    className="h-4 w-auto object-contain"
                  />
                </span>
                <p className="mt-2 font-mono text-[11px] text-slate-400">
                  {s.period}
                </p>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug text-slate-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {s.hook}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.stack.slice(0, 3).map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                  {s.stack.length > 3 && (
                    <span className="chip">+{s.stack.length - 3}</span>
                  )}
                </div>
                <span className="mt-auto pt-5 text-sm font-semibold text-brand-600 transition-transform group-hover:translate-x-0.5 dark:text-brand-400">
                  Read the full story →
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Full-story modal */}
      <AnimatePresence>
        {study && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.article
              className="card relative my-4 w-full max-w-2xl p-6 sm:p-8"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:text-slate-900 dark:border-white/10 dark:text-slate-300"
              >
                <X className="h-4 w-4" />
              </button>

              <span className="inline-flex h-11 w-fit items-center rounded-lg border border-slate-200 bg-[#ffffff] px-3 dark:border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={study.logo}
                  alt={study.company}
                  className="h-6 w-auto object-contain"
                />
              </span>
              <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 pr-10 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {study.company}
                </span>
                <span aria-hidden>·</span>
                <span>{study.context}</span>
                <span aria-hidden>·</span>
                <span className="font-mono">{study.period}</span>
              </div>

              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {study.title}
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {study.stack.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 border-t border-slate-200 pt-6 dark:border-white/10">
                <ReactMarkdown components={markdownComponents}>
                  {study.body}
                </ReactMarkdown>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
