"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  Phone,
  Send,
  X,
} from "lucide-react";
import { site } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

// Public Web3Forms access key (safe to expose — it only routes to the inbox).
// Set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local, then rebuild.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

/** Fire from anywhere (nav, footer, CTA) to open the contact popup. */
export function openContactModal() {
  window.dispatchEvent(new Event("open-contact"));
}

export function ContactModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-contact", onOpen);
    return () => window.removeEventListener("open-contact", onOpen);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    setStatus("sending");

    // Preferred path: send straight to the inbox via Web3Forms (no mail client).
    if (WEB3FORMS_KEY) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            name,
            email,
            message,
            subject: `Portfolio enquiry from ${name}`,
            from_name: "Portfolio website",
            replyto: email,
          }),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json.success) throw new Error("Web3Forms failed");
        setUsedFallback(false);
        setStatus("sent");
        form.reset();
        return;
      } catch {
        // fall through to the mail-client fallback below
      }
    }

    // Fallback: open the visitor's mail client pre-filled.
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setUsedFallback(true);
    setStatus("sent");
    form.reset();
  }

  const close = () => {
    setOpen(false);
    window.setTimeout(() => setStatus("idle"), 250);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            className="card relative my-4 w-full max-w-lg p-6 sm:p-8"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:text-slate-900 dark:border-white/10 dark:text-slate-300"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="eyebrow">Contact</p>
            <h3 className="mt-3 pr-10 font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Let&apos;s build reliable software together
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Open to Senior QA Engineer, QA Lead, SDET, and AI Quality
              Engineering roles.
            </p>

            {/* Quick channels */}
            <div className="mt-5 grid grid-cols-2 gap-2">
              <ChannelLink
                href={site.socials.email}
                icon={<Mail className="h-4 w-4" />}
                label="Email"
              />
              <ChannelLink
                href={site.phoneHref}
                icon={<Phone className="h-4 w-4" />}
                label="Phone"
              />
              <ChannelLink
                href={site.socials.linkedin}
                icon={<Linkedin className="h-4 w-4" />}
                label="LinkedIn"
                external
              />
              <ChannelLink
                href={site.socials.github}
                icon={<Github className="h-4 w-4" />}
                label="GitHub"
                external
              />
            </div>

            {status === "sent" ? (
              <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-slate-200 p-8 text-center dark:border-white/10">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/12 text-brand-600 dark:text-brand-400">
                  <CheckCircle2 className="h-6 w-6" />
                </span>
                <h4 className="mt-3 font-display text-base font-bold text-slate-900 dark:text-white">
                  {usedFallback
                    ? "Thanks — your message is on its way!"
                    : "Thanks — your message landed in my inbox!"}
                </h4>
                <p className="mt-1.5 max-w-xs text-sm text-slate-500 dark:text-slate-400">
                  {usedFallback
                    ? "If your email client opened, just hit send."
                    : "I'll get back to you as soon as I can."}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="btn-secondary mt-5"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" name="name" placeholder="Your Name" />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Your Email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cm-message"
                    className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="cm-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about the role or challenge…"
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary w-full"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-slate-400">
                  Or email me directly at{" "}
                  <a
                    href={site.socials.email}
                    className="font-medium text-brand-600 hover:underline dark:text-brand-400"
                  >
                    {site.email}
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ChannelLink({
  href,
  icon,
  label,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-brand-500/30 hover:text-brand-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
    >
      <span className="text-brand-600 dark:text-brand-400">{icon}</span>
      {label}
    </a>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={`cm-${name}`}
        className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {label}
      </label>
      <input
        id={`cm-${name}`}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
      />
    </div>
  );
}
