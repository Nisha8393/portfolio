"use client";

import {
  CheckCheck,
  Cpu,
  Database,
  Gauge,
  GitBranch,
  Kanban,
  Sparkles,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import { skillGroups } from "@/lib/data";
import { SectionHeading } from "./ui/section-heading";

const iconMap: Record<string, LucideIcon> = {
  cpu: Cpu,
  webhook: Webhook,
  gauge: Gauge,
  gitBranch: GitBranch,
  database: Database,
  sparkles: Sparkles,
  checkCheck: CheckCheck,
  kanban: Kanban,
};

export function SkillCards() {
  return (
    <section id="skills" className="section-pad bg-slate-100/80 dark:bg-white/[0.03]">
      <div className="container-px">
        <SectionHeading
          eyebrow="Skills"
          title="A full-stack quality toolkit"
          description="From UI automation to API, performance, CI/CD, and AI evaluation, the tools I use to build confidence into every release."
        />

        {/* Auto-scrolling marquee: pauses on hover, falls back to scroll for reduced motion */}
        <div className="group relative mt-10 overflow-hidden motion-reduce:overflow-x-auto motion-reduce:pb-4 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] motion-reduce:[mask-image:none]">
          <div className="flex w-max animate-marquee will-change-transform group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[...skillGroups, ...skillGroups].map((group, i) => {
              const Icon = iconMap[group.icon] ?? Cpu;
              return (
                <div
                  key={`${group.category}-${i}`}
                  aria-hidden={i >= skillGroups.length}
                  className="card group/card mr-4 w-[210px] shrink-0 p-4 transition-colors hover:border-brand-500/30"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 transition-colors group-hover/card:bg-brand-500 group-hover/card:text-white dark:text-brand-400">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="font-display text-[13px] font-bold text-slate-900 dark:text-white">
                      {group.category}
                    </h3>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <span key={skill} className="chip !px-2 !py-0.5 !text-[11px]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
