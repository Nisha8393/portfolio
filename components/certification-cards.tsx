"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, BadgeCheck, GraduationCap, Maximize2, X } from "lucide-react";
import { certifications, education, type Certification } from "@/lib/data";
import { SectionHeading } from "./ui/section-heading";

export function CertificationCards() {
  const [active, setActive] = useState<Certification | null>(null);

  // Lock scroll + Escape-to-close while the lightbox is open
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="certifications" className="section-pad">
      <div className="container-px">
        <SectionHeading
          eyebrow="Education & Certifications"
          title="Credentials & continuous learning"
          description="A computer-science degree and formal certifications behind the hands-on experience across testing, automation, and process."
        />

        {/* Education */}
        <div className="mt-12 card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <GraduationCap className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold leading-snug text-slate-900 dark:text-white">
                {education.degree}
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {education.institution}
              </p>
              <p className="mt-1 text-xs font-semibold text-brand-700 dark:text-brand-400">
                {education.detail}
              </p>
            </div>
          </div>
          <span className="shrink-0 font-mono text-sm font-semibold text-slate-400 sm:text-right">
            {education.period}
          </span>
        </div>

        {/* Certifications */}
        <p className="mb-6 mt-12 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">
          Certifications
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, i) => {
            const clickable = Boolean(cert.image);
            return (
              <motion.button
                key={cert.name}
                type="button"
                onClick={() => cert.image && setActive(cert)}
                disabled={!clickable}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="card group relative flex flex-col p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-glow disabled:cursor-default disabled:hover:translate-y-0 disabled:hover:shadow-none"
                aria-label={
                  clickable ? `View ${cert.name} certificate` : cert.name
                }
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                    <Award className="h-5.5 w-5.5" />
                  </span>
                  <span className="font-mono text-xs font-semibold text-slate-400">
                    {cert.year}
                  </span>
                </div>

                <h3 className="mt-5 flex-1 font-display text-[15px] font-bold leading-snug text-slate-900 dark:text-white">
                  {cert.name}
                </h3>

                <div className="mt-4 flex items-center gap-1.5 border-t border-slate-100 pt-4 text-xs font-medium text-slate-500 dark:border-white/10 dark:text-slate-400">
                  <BadgeCheck className="h-4 w-4 text-brand-500" />
                  {cert.issuer}
                </div>

                {clickable && (
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 opacity-70 transition-opacity group-hover:opacity-100 dark:text-brand-400">
                    <Maximize2 className="h-3.5 w-3.5" />
                    View certificate
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Certificate lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.figure
              className="relative my-auto w-full max-w-3xl"
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
                className="absolute -top-3 -right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-card transition-colors hover:text-slate-900"
              >
                <X className="h-4 w-4" />
              </button>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.image}
                alt={`${active.name} certificate`}
                className="w-full rounded-xl border border-white/10 bg-white shadow-2xl"
              />

              <figcaption className="mt-3 text-center text-sm font-medium text-white">
                {active.name} · {active.issuer} · {active.year}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
