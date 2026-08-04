"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Play, RotateCcw, TerminalSquare } from "lucide-react";
import { candidateSpecs } from "@/lib/data";

type Status = "idle" | "running" | "done";
type Line = { type: "file"; text: string } | { type: "check"; text: string };

const LINES: Line[] = candidateSpecs.flatMap((s) => [
  { type: "file" as const, text: s.file },
  ...s.checks.map((c) => ({ type: "check" as const, text: c })),
]);
const TOTAL = candidateSpecs.reduce((n, s) => n + s.checks.length, 0);

export function RunTestsBanner() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [count, setCount] = useState(0);

  // Drive the stream once running (no auto-start, the user clicks Run)
  useEffect(() => {
    if (status !== "running") return;
    if (reduce) {
      setCount(LINES.length);
      setStatus("done");
      return;
    }
    if (count >= LINES.length) {
      const id = setTimeout(() => setStatus("done"), 250);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setCount((c) => c + 1), count === 0 ? 250 : 110);
    return () => clearTimeout(id);
  }, [status, count, reduce]);

  // Keep the newest line in view as output streams
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [count]);

  const run = () => {
    setCount(0);
    setStatus("running");
  };

  return (
    <div className="card overflow-hidden">
      {/* header */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-white/10">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 inline-flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
          <TerminalSquare className="h-3.5 w-3.5" />
          candidate · test-runner
        </span>
        {status === "done" && (
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-brand-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            All green
          </span>
        )}
      </div>

      {status === "idle" ? (
        <div className="px-4 py-10 text-center">
          <p className="mb-5 font-mono text-[12px] text-slate-400">
            $ npm run test:candidate
          </p>
          <button type="button" onClick={run} className="btn-primary">
            <Play className="h-4 w-4" />
            Run tests
          </button>
          <p className="mx-auto mt-4 max-w-[15rem] text-xs leading-relaxed text-slate-500">
            Run the suite to load my toolkit. Every passing check is a skill.
          </p>
        </div>
      ) : (
        <>
          <div
            ref={scrollRef}
            className="h-80 overflow-y-auto px-4 py-3 font-mono text-[12px] leading-relaxed"
          >
            <p className="text-slate-400">$ npm run test:candidate</p>
            {LINES.slice(0, count).map((line, i) =>
              line.type === "file" ? (
                <p key={i} className="mt-3 text-slate-500">
                  {line.text}
                </p>
              ) : (
                <motion.p
                  key={i}
                  initial={reduce ? false : { opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-2 pl-2 text-slate-700 dark:text-slate-200"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600 dark:text-brand-400" />
                  <span>{line.text}</span>
                </motion.p>
              ),
            )}
            {status === "running" && (
              <span className="mt-1 inline-block h-3.5 w-2 animate-pulse-dot bg-brand-500 align-middle" />
            )}
          </div>

          {status === "done" && (
            <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 dark:border-white/10">
              <span className="font-mono text-[11.5px] font-semibold text-brand-700 dark:text-brand-300">
                ✓ {TOTAL} passed · 0 failed
              </span>
              <button
                type="button"
                onClick={run}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 transition-colors hover:text-brand-600"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Run again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
