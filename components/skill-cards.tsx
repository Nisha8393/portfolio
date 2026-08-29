"use client";

import { motion } from "framer-motion";
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

        <div className="mt-10 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
          {skillGroups.map((group, i) => {
            const Icon = iconMap[group.icon] ?? Cpu;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                className="card group w-[210px] shrink-0 p-4 transition-colors hover:border-brand-500/30"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white dark:text-brand-400">
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
