"use client";

import {
  SearchCheck,
  ScanEye,
  Target,
  MessagesSquare,
  Compass,
  Flag,
  type LucideIcon,
} from "lucide-react";
import { softSkills } from "@/lib/data";
import { SectionHeading } from "./ui/section-heading";

const iconMap: Record<string, LucideIcon> = {
  searchCheck: SearchCheck,
  scanEye: ScanEye,
  target: Target,
  messagesSquare: MessagesSquare,
  compass: Compass,
  flag: Flag,
};

export function SoftSkills() {
  return (
    <section id="strengths" className="section-pad">
      <div className="container-px">
        <SectionHeading
          eyebrow="Strengths"
          title="The judgment behind the tooling"
          description="Automation runs the checks. These are the skills that decide whether a check catches anything."
        />

        {/* Auto-scrolling marquee (reverse), pauses on hover, scroll fallback for reduced motion */}
        <div className="group relative mt-10 overflow-hidden motion-reduce:overflow-x-auto motion-reduce:pb-4 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] motion-reduce:[mask-image:none]">
          <div className="flex w-max animate-marquee [animation-direction:reverse] [animation-duration:31s] will-change-transform group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[...softSkills, ...softSkills].map((skill, i) => {
              const Icon = iconMap[skill.icon] ?? SearchCheck;
              return (
                <div
                  key={`${skill.title}-${i}`}
                  aria-hidden={i >= softSkills.length}
                  className="card group/card mr-4 w-[250px] shrink-0 p-5 transition-colors hover:border-brand-500/30"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/12 text-brand-600 ring-1 ring-brand-500/20 transition-colors group-hover/card:bg-brand-500/20 dark:text-brand-400">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-3 font-display text-sm font-bold text-slate-900 dark:text-white">
                    {skill.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
                    {skill.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
