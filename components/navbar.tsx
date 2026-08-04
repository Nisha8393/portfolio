"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import { nav, site } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ContactModal, openContactModal } from "./contact-modal";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/70"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="container-px flex h-16 items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          className="group flex items-center gap-2.5"
          aria-label="Nisha Shrestha, home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              {site.name}
            </span>
            <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              QA · Automation · AI
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            item.label === "Contact" ? (
              <button
                key={item.label}
                type="button"
                onClick={() => openContactModal()}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                {item.label}
              </button>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                {item.label}
              </a>
            ),
          )}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 md:flex">
            <IconLink href={site.socials.linkedin} label="LinkedIn">
              <Linkedin className="h-[18px] w-[18px]" />
            </IconLink>
            <IconLink href={site.socials.github} label="GitHub">
              <Github className="h-[18px] w-[18px]" />
            </IconLink>
            <IconLink href={site.socials.email} label="Email">
              <Mail className="h-[18px] w-[18px]" />
            </IconLink>
          </div>
          <a
            href={site.resumeUrl}
            download
            className="btn-primary hidden h-10 !px-4 !py-0 sm:inline-flex"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/95 lg:hidden"
          >
            <div className="container-px flex flex-col gap-1 py-4">
              {nav.map((item) =>
                item.label === "Contact" ? (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      openContactModal();
                    }}
                    className="rounded-lg px-3 py-3 text-left text-base font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5"
                  >
                    {item.label}
                  </a>
                ),
              )}
              <div className="mt-2 flex items-center gap-2">
                <a
                  href={site.resumeUrl}
                  download
                  className="btn-primary flex-1"
                  onClick={() => setOpen(false)}
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <IconLink href={site.socials.linkedin} label="LinkedIn" boxed>
                  <Linkedin className="h-[18px] w-[18px]" />
                </IconLink>
                <IconLink href={site.socials.github} label="GitHub" boxed>
                  <Github className="h-[18px] w-[18px]" />
                </IconLink>
                <IconLink href={site.socials.email} label="Email" boxed>
                  <Mail className="h-[18px] w-[18px]" />
                </IconLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </header>
      <ContactModal />
    </>
  );
}

function IconLink({
  href,
  label,
  children,
  boxed,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  boxed?: boolean;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
        boxed
          ? "border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5"
          : "hover:bg-slate-100 dark:hover:bg-white/10"
      )}
    >
      {children}
    </a>
  );
}
