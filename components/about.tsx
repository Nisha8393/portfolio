"use client";

import { Sparkles } from "lucide-react";
import { aboutParagraphs } from "@/lib/data";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";

export function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container-px">
        <SectionHeading
          eyebrow="About"
          title="Quality as an engineering discipline"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr]">
          {/* Bio */}
          <div>
            <div className="space-y-5 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {aboutParagraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>

            {/* AI in my daily workflow — now in the main text column */}
            <Reveal delay={0.1}>
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.02]">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/12 text-brand-600 dark:text-brand-400">
                    <Sparkles className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">
                    AI in my daily workflow
                  </h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                  I use Claude and AI tools every day — turning manual cases into
                  Playwright suites, scaffolding API and UI checks, and generating
                  test data. But I treat AI output as a first draft, not the final
                  word: I supervise, review, and revise everything before it ships.
                  It keeps me current with the industry — while quality stays a
                  human call.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right column: portrait, top-aligned with the bio */}
          <div className="self-start lg:sticky lg:top-24">
            <Reveal delay={0.05}>
              <div className="card overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/meworking.png"
                  alt="Illustration of Nisha Shrestha at work"
                  className="block w-full"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
