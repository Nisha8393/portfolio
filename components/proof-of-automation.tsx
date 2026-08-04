"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import {
  ArrowUpRight,
  ExternalLink,
  FileCode2,
  FileSpreadsheet,
  Github,
  Layers,
  Boxes,
  FileBarChart,
  GitBranch,
} from "lucide-react";
import { artifacts, repos, snippets } from "@/lib/proof";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";
import { cn } from "@/lib/utils";

function CodeBlock({ code, language }: { code: string; language: string }) {
  return (
    <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className="overflow-x-auto p-5 text-[12.5px] leading-relaxed"
          style={{ ...style, background: "transparent", margin: 0 }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-6 mt-16 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">
      {children}
    </p>
  );
}

export function ProofOfAutomation() {
  const [tab, setTab] = useState(0);
  const active = snippets[tab];

  return (
    <section id="proof" className="section-pad">
      <div className="container-px">
        <SectionHeading
          eyebrow="Proof of Automation"
          title="Don't take my word for it, it's running"
          description="The employer work above can't be linked, so here's the proof from my own projects: real code, a live test report, a trace, and CI you can click into right now."
        />

        {/* ---- Live repos ---- */}
        <SubLabel>Live on GitHub</SubLabel>
        <div className="grid gap-5 sm:grid-cols-2">
          {repos.map((repo, i) => (
            <Reveal key={repo.name} delay={i * 0.06}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="flex items-center gap-2">
                  <Github className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                  <span className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                    {repo.name}
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
                </div>

                {repo.badge && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={repo.badge}
                    alt="CI status"
                    className="mt-3 h-5 w-fit"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}

                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {repo.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {repo.meta.map((m) => (
                    <span key={m} className="chip">
                      {m}
                    </span>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* ---- Code with commentary (tabbed / horizontal) ---- */}
        <SubLabel>The code, with the reasoning</SubLabel>
        <div className="mb-5 flex flex-wrap gap-2">
          {snippets.map((s, i) => (
            <button
              key={s.filename}
              type="button"
              onClick={() => setTab(i)}
              className={cn(
                "rounded-lg px-3.5 py-2 font-mono text-xs transition-colors",
                tab === i
                  ? "bg-brand-600 text-white shadow-glow"
                  : "border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:text-slate-300",
              )}
            >
              {s.filename}
            </button>
          ))}
        </div>
        <div className="card overflow-hidden">
          <div className="grid lg:grid-cols-[1.5fr_1fr]">
            {/* Code */}
            <div className="min-w-0 bg-[#011627]">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                <FileCode2 className="h-3.5 w-3.5 text-slate-400" />
                <span className="font-mono text-[11.5px] text-slate-400">
                  {active.filename}
                </span>
              </div>
              <CodeBlock code={active.code} language={active.language} />
            </div>
            {/* Commentary */}
            <div className="border-t border-slate-200 p-6 dark:border-white/10 lg:border-l lg:border-t-0">
              <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">
                {active.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {active.note}
              </p>
            </div>
          </div>
        </div>

        {/* ---- See it running ---- */}
        <SubLabel>See it running</SubLabel>
        <div className="grid gap-6 lg:grid-cols-2">
          {artifacts.map((a) => (
            <Reveal key={a.title}>
              <figure className="card overflow-hidden">
                {a.kind === "report" ? (
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={a.src}
                      alt={a.title}
                      className="w-full border-b border-slate-200 dark:border-white/10"
                    />
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-lg bg-slate-900/85 px-3 py-1.5 text-xs font-semibold text-white opacity-90 backdrop-blur transition-opacity group-hover:opacity-100">
                      Open the report <ExternalLink className="h-3.5 w-3.5" />
                    </span>
                  </a>
                ) : (
                  <video
                    src={a.src}
                    autoPlay
                    controls
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full border-b border-slate-200 bg-black dark:border-white/10"
                  />
                )}
                <figcaption className="p-5">
                  <p className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                    {a.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {a.caption}
                  </p>
                  {a.kind === "report" && (
                    <a
                      href="/proof/custom-playwright-report.xlsx"
                      download
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 hover:underline dark:text-brand-400"
                    >
                      <FileSpreadsheet className="h-4 w-4" />
                      Open my custom Excel report
                    </a>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* ---- Architecture ---- */}
        <SubLabel>How the framework fits together</SubLabel>
        <Reveal>
          <div className="card p-6 sm:p-10">
            <ArchitectureDiagram />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DiagramBox({
  icon,
  title,
  sub,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-brand-500/20 bg-brand-500/[0.06] p-4 text-center dark:bg-brand-500/10 ${className}`}
    >
      <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/15 text-brand-600 dark:text-brand-400">
        {icon}
      </div>
      <p className="font-display text-sm font-semibold text-slate-900 dark:text-white">
        {title}
      </p>
      <p className="mt-1 text-xs leading-snug text-slate-500 dark:text-slate-400">
        {sub}
      </p>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex justify-center py-2" aria-hidden>
      <div className="h-6 w-px bg-gradient-to-b from-brand-500/50 to-brand-500/10" />
    </div>
  );
}

function ArchitectureDiagram() {
  return (
    <div className="mx-auto max-w-3xl">
      {/* Shared core */}
      <DiagramBox
        icon={<Layers className="h-5 w-5" />}
        title="Shared fixtures · test data · generators"
        sub="Auth, unique data per run, and Page Objects / API clients injected as fixtures, no test depends on another test's leftovers"
      />

      <Connector />

      {/* Two suites */}
      <div className="grid gap-4 sm:grid-cols-2">
        <DiagramBox
          icon={<Boxes className="h-5 w-5" />}
          title="UI suite"
          sub="Page Objects · smoke · regression · e2e"
        />
        <DiagramBox
          icon={<Boxes className="h-5 w-5" />}
          title="API suite"
          sub="Thin clients · chained lifecycle · schema checks"
        />
      </div>

      <Connector />

      {/* Reports */}
      <DiagramBox
        icon={<FileBarChart className="h-5 w-5" />}
        title="One report: HTML + custom Excel"
        sub="Traces & screenshots retained on failure; a stakeholder-friendly Excel summary with a pass/fail chart"
      />

      <Connector />

      {/* CI */}
      <DiagramBox
        icon={<GitBranch className="h-5 w-5" />}
        title="GitHub Actions: push · PR · nightly"
        sub="Browser caching, concurrency cancellation, secrets from the vault, artifacts uploaded every run"
        className="border-brand-500/40 bg-brand-500/[0.12] dark:bg-brand-500/15"
      />
    </div>
  );
}
