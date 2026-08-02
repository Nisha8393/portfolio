"use client";

import { motion, useReducedMotion } from "framer-motion";
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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function SoftSkills() {
  const reduce = useReducedMotion();

  return (
    <section id="strengths" className="section-pad">
      <div className="container-px">
        <SectionHeading
          eyebrow="Strengths"
          title="The judgment behind the tooling"
          description="Automation runs the checks. These are the skills that decide whether a check catches anything."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {softSkills.map((skill, i) => {
            const Icon = iconMap[skill.icon] ?? SearchCheck;
            return (
              <motion.div
                key={skill.title}
                variants={item}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="card group relative overflow-hidden p-6 hover:shadow-glow"
              >
                {/* animated corner glow on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-500/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />

                <motion.span
                  animate={reduce ? undefined : { y: [0, -5, 0] }}
                  transition={
                    reduce
                      ? undefined
                      : {
                          duration: 3.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.3,
                        }
                  }
                  className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/12 text-brand-600 ring-1 ring-brand-500/20 transition-colors duration-300 group-hover:bg-brand-500/20 dark:text-brand-400"
                >
                  <Icon className="h-5 w-5" />
                </motion.span>

                <h3 className="mt-4 font-display text-lg font-semibold text-slate-900 dark:text-white">
                  {skill.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {skill.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
