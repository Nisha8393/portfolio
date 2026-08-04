"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Circle, Loader2, Terminal } from "lucide-react";
import { pipelineStages } from "@/lib/data";
import { cn } from "@/lib/utils";

const coverageBars = [
  { label: "Playwright E2E", value: 92, color: "bg-brand-500" },
  { label: "API / Newman", value: 100, color: "bg-cyan-400" },
  { label: "Performance", value: 78, color: "bg-teal-400" },
];

const logLines = [
  { t: "$", c: "npx playwright test --project=chromium", muted: false },
  { t: ">", c: "Running 142 tests across 3 browsers", muted: true },
  { t: "✓", c: "auth · checkout · dashboard  … 142 passed", muted: false },
  { t: "$", c: "newman run api-regression.json", muted: false },
  { t: "✓", c: "58 requests · 0 failures · 812ms avg", muted: false },
];

/**
 * Sophisticated QA engineering "console" used as the hero visual.
 * Pure code, no photo, no cartoon avatar.
 */
export function QaConsole() {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-brand-500/10 blur-3xl dark:bg-brand-500/20"
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="card overflow-hidden"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
          <span className="h-3 w-3 rounded-full bg-rose-400/90" />
          <span className="h-3 w-3 rounded-full bg-amber-400/90" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
          <div className="ml-3 inline-flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400">
            <Terminal className="h-3.5 w-3.5" />
            quality-pipeline · main
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-500" />
            All checks green
          </span>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-2">
          {/* Coverage */}
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-slate-400">
              Automation Coverage
            </p>
            <div className="space-y-3.5">
              {coverageBars.map((bar, i) => (
                <div key={bar.label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-300">
                      {bar.label}
                    </span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-100">
                      {bar.value}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                    <motion.div
                      className={cn("h-full rounded-full", bar.color)}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.value}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.1,
                        delay: 0.2 + i * 0.15,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline */}
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-slate-400">
              CI/CD Pipeline
            </p>
            <ul className="space-y-2">
              {pipelineStages.map((stage) => (
                <li
                  key={stage.name}
                  className="flex items-center gap-2.5 text-xs"
                >
                  <StageIcon status={stage.status} />
                  <span
                    className={cn(
                      "truncate",
                      stage.status === "queued"
                        ? "text-slate-400 dark:text-slate-500"
                        : "text-slate-700 dark:text-slate-200"
                    )}
                  >
                    {stage.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Terminal log */}
        <div className="border-t border-slate-200 bg-slate-950 p-4 font-mono text-[11.5px] leading-relaxed dark:border-white/10">
          {logLines.map((line, i) => (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.35 }}
              className="flex gap-2"
            >
              <span
                className={cn(
                  line.t === "✓"
                    ? "text-emerald-400"
                    : line.t === "$"
                    ? "text-brand-400"
                    : "text-slate-500"
                )}
              >
                {line.t}
              </span>
              <span className={line.muted ? "text-slate-500" : "text-slate-300"}>
                {line.c}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function StageIcon({ status }: { status: string }) {
  if (status === "passed")
    return <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />;
  if (status === "running")
    return <Loader2 className="h-4 w-4 shrink-0 animate-spin text-brand-500" />;
  return <Circle className="h-4 w-4 shrink-0 text-slate-300 dark:text-slate-600" />;
}
