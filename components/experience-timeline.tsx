"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, ChevronDown, MapPin, Sparkle } from "lucide-react";
import { experiences } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./ui/section-heading";

export function ExperienceTimeline() {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);

  return (
    <section id="experience" className="section-pad bg-slate-100/80 dark:bg-white/[0.03]">
      <div className="container-px">
        <SectionHeading
          eyebrow="Experience"
          title="A track record of owning quality"
          description="From sole-QA startups to enterprise healthcare — building the testing systems that let teams ship with confidence."
        />

        {/* Desktop: tabbed timeline */}
        <div className="mt-12 hidden gap-8 lg:grid lg:grid-cols-[300px_1fr]">
          {/* Rail */}
          <div className="relative">
            <div className="absolute bottom-3 left-[15px] top-3 w-px bg-slate-200 dark:bg-white/10" />
            <ul className="space-y-1">
              {experiences.map((exp, i) => (
                <li key={exp.company} className="relative">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      "group flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors",
                      active === i
                        ? "bg-white shadow-card dark:bg-white/5"
                        : "hover:bg-white/60 dark:hover:bg-white/5"
                    )}
                  >
                    <span
                      className={cn(
                        "relative z-10 mt-0.5 flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full ring-4 transition-colors",
                        active === i
                          ? "bg-brand-500 ring-brand-500/15"
                          : "bg-slate-300 ring-slate-50 dark:bg-slate-600 dark:ring-transparent"
                      )}
                    >
                      {exp.current && (
                        <span className="absolute h-full w-full animate-ping rounded-full bg-brand-500/60" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block truncate text-sm font-semibold",
                          active === i
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-600 dark:text-slate-300"
                        )}
                      >
                        {exp.company}
                      </span>
                      <span className="mt-0.5 block font-mono text-[11px] text-slate-400">
                        {exp.period}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Detail */}
          <div className="min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <ExperienceDetail index={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: accordion */}
        <div className="mt-10 space-y-3 lg:hidden">
          {experiences.map((exp, i) => {
            const open = openMobile === i;
            return (
              <div key={exp.company} className="card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenMobile(open ? null : i)}
                  className="flex w-full items-center gap-3 p-4 text-left"
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                      exp.current
                        ? "bg-brand-500/12 text-brand-600 dark:text-brand-400"
                        : "bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400"
                    )}
                  >
                    <Briefcase className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-slate-900 dark:text-white">
                      {exp.company}
                    </span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      {exp.role} · {exp.period}
                    </span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-slate-400 transition-transform",
                      open && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-200 p-4 dark:border-white/10">
                        <ExperienceDetail index={i} compact />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ExperienceDetail({
  index,
  compact,
}: {
  index: number;
  compact?: boolean;
}) {
  const exp = experiences[index];
  return (
    <div className={compact ? "" : "card p-6 sm:p-8"}>
      {!compact && (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            {exp.logo && (
              <span className="mb-3 inline-flex h-10 items-center rounded-lg border border-slate-200 bg-[#ffffff] px-3 dark:border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={exp.logo}
                  alt={exp.company}
                  className="h-5 w-auto object-contain"
                />
              </span>
            )}
            <div className="flex items-center gap-2">
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                {exp.role}
              </h3>
              {exp.current && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-500" />
                  Current
                </span>
              )}
            </div>
            <p className="mt-1 text-sm font-semibold text-brand-600 dark:text-brand-400">
              {exp.company}
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
              {exp.period}
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <MapPin className="h-3.5 w-3.5" />
              {exp.location}
            </p>
          </div>
        </div>
      )}

      {/* Stack */}
      <div className={cn("flex flex-wrap gap-2", compact ? "" : "mt-5")}>
        {exp.stack.map((tech) => (
          <span key={tech} className="chip font-mono !text-[11.5px]">
            {tech}
          </span>
        ))}
      </div>

      {/* Achievements */}
      <ul className="mt-5 space-y-2.5">
        {exp.achievements.map((a) => (
          <li key={a} className="flex gap-3 text-sm leading-relaxed">
            <Sparkle className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
            <span className="text-slate-600 dark:text-slate-300">{a}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
