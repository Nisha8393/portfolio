"use client";

import { ArrowUp, Github, Heart, Linkedin, Mail, ShieldCheck } from "lucide-react";
import { nav, site } from "@/lib/data";
import { openContactModal } from "./contact-modal";

export function Footer() {
  const year = 2026; // static build; update as needed

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-ink-950">
      <div className="container-px py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <span className="font-display text-sm font-bold text-slate-900 dark:text-white">
                {site.name}
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {site.tagline}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <FooterSocial href={site.socials.linkedin} label="LinkedIn">
                <Linkedin className="h-[18px] w-[18px]" />
              </FooterSocial>
              <FooterSocial href={site.socials.github} label="GitHub">
                <Github className="h-[18px] w-[18px]" />
              </FooterSocial>
              <FooterSocial href={site.socials.email} label="Email">
                <Mail className="h-[18px] w-[18px]" />
              </FooterSocial>
            </div>
          </div>

          {/* Nav */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-3">
            {nav.map((item) =>
              item.label === "Contact" ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => openContactModal()}
                  className="text-left text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  {item.label}
                </a>
              ),
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 dark:border-white/10 sm:flex-row">
          <p className="flex items-center gap-1.5 text-xs text-slate-400">
            © {year} {site.name}. Built with Next.js, Tailwind &amp; Framer
            Motion.
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterSocial({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:border-brand-500/30 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-brand-400"
    >
      {children}
    </a>
  );
}
