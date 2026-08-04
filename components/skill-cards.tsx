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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => {
            const Icon = iconMap[group.icon] ?? Cpu;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
                className="card group p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-glow"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white dark:text-brand-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                    {group.category}
                  </h3>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="chip transition-colors group-hover:border-brand-500/20"
                    >
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
