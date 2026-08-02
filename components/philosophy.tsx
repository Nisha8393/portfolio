"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { philosophy } from "@/lib/data";

export function Philosophy() {
  return (
    <section className="section-pad">
      <div className="container-px">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-amber-900/30 bg-gradient-to-br from-orange-800 via-amber-900 to-amber-950 px-6 py-10 text-center sm:px-12 sm:py-12"
        >
          {/* decorative */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grid-dark bg-[size:40px_40px] opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000,transparent)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-56 w-[600px] -translate-x-1/2 rounded-full bg-orange-500/25 blur-[100px]"
          />

          <div className="relative mx-auto max-w-3xl">
            <span className="eyebrow border-white/15 bg-white/10 text-amber-50">
              <Quote className="h-3.5 w-3.5 text-amber-300" />
              Engineering Philosophy
            </span>

            <blockquote className="mt-5 font-display text-xl font-bold leading-snug text-white sm:text-2xl md:text-[1.8rem]">
              &ldquo;{philosophy.quote}&rdquo;
            </blockquote>

            <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
              {philosophy.points.map((point, i) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-left backdrop-blur"
                >
                  <h3 className="text-sm font-bold text-white">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-amber-100/70">
                    {point.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
