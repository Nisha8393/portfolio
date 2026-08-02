/**
 * Single source of truth for all portfolio content.
 * Update text, links, and metrics here — components read from this file.
 */

export const site = {
  name: "Nisha Shrestha",
  role: "Senior Software QA Analyst",
  titleLine:
    "Senior QA Analyst · Automation Engineer · AI Quality Engineer",
  tagline:
    "Building reliable software through automation, intelligent testing strategies, and AI-powered quality engineering.",
  heroSubtext:
    "ISTQB-certified QA analyst with 7+ years of experience building automation frameworks, API testing strategies, performance validation, and AI-driven quality practices across healthcare, SaaS, e-commerce, and enterprise platforms.",
  location: "Toronto, Canada",
  email: "nishashrestha5470@gmail.com",
  phone: "416-722-8393",
  phoneHref: "tel:+14167228393",
  resumeUrl: "/Nisha-Shrestha-Resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/nisha-shrestha-76a638266/",
    github: "https://github.com/Nisha7001",
    email: "mailto:nishashrestha5470@gmail.com",
  },
  url: "https://nisha-shrestha.dev",
} as const;

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Proof", href: "#proof" },
  { label: "Work", href: "#work" },
  { label: "Resume", href: site.resumeUrl },
  { label: "Contact", href: "#contact" },
] as const;

// "Run tests" banner in About — the full toolkit, streamed as a test run
export type CandidateSpec = { file: string; checks: string[] };
export const candidateSpecs: CandidateSpec[] = [
  {
    file: "automation.spec.ts",
    checks: [
      "Playwright — UI + API, TypeScript",
      "Selenium WebDriver — Python + Pytest",
      "Page objects, fixtures, data-driven runs",
      "Trace-based failure debugging",
    ],
  },
  {
    file: "api-performance.spec.ts",
    checks: [
      "Postman — collections, environments, test scripts",
      "Newman CLI — headless suite execution",
      "REST API testing",
      "JMeter — load, throughput, response time",
    ],
  },
  {
    file: "pipeline.spec.ts",
    checks: [
      "Jenkins — pipeline setup, credentials, thresholds",
      "GitHub Actions — regression on every commit",
      "Parallel execution + build-stability gating",
      "Git — branching, repo structure",
    ],
  },
  {
    file: "data.spec.ts",
    checks: [
      "SQL / MySQL — business-rule validation",
      "Verifies stored values, not just displayed ones",
      "EDI — claims file processing",
    ],
  },
  {
    file: "ai.spec.ts",
    checks: [
      "Claude Code, Copilot, MCP servers",
      "Test scaffolding + test data generation",
      "Evaluating non-deterministic output",
      "Knows what not to delegate",
    ],
  },
  {
    file: "coverage.spec.ts",
    checks: [
      "Functional · Regression · Smoke · Integration",
      "API · UAT · Performance · Cross-browser · E2E",
      "ISTQB Foundation Level (ASTQB)",
      "JIRA · TestRail · Confluence · Agile/Scrum",
    ],
  },
];

export const stats = [
  { value: "7+", label: "Years Experience", hint: "QA across 5 industries" },
  { value: "AI + LLM", label: "Quality Engineering", hint: "Recommendation & output testing" },
  { value: "Multiple", label: "Platforms Delivered", hint: "SaaS · AI · Healthcare" },
  { value: "ISTQB", label: "Certified Tester", hint: "Foundation Level" },
] as const;

export const aboutParagraphs = [
  "I'm an automation-focused QA analyst who treats quality as an engineering discipline — not a final checkpoint. I design scalable automation frameworks, build API and backend validation strategies, run performance testing, and evaluate the quality of AI and LLM-powered systems.",
  "I've built testing strategies, automation frameworks, release standards, and quality processes from the ground up — frequently establishing a team's testing foundation where none existed. I partner closely with engineering, product, and DevOps to raise release confidence and catch defects long before they reach production.",
];

export const aboutHighlights = [
  "Designing scalable automation frameworks",
  "Improving release confidence",
  "API and backend validation",
  "Performance & load testing",
  "AI / LLM system quality evaluation",
  "Building QA processes from zero",
];

export type Experience = {
  company: string;
  logo?: string;
  role: string;
  location: string;
  period: string;
  current?: boolean;
  stack: string[];
  achievements: string[];
};

export const experiences: Experience[] = [
  {
    company: "OpenScreen Inc.",
    logo: "/logos/openscreen.svg",
    role: "Software QA Lead",
    location: "Toronto, Canada",
    period: "Mar 2025 — Present",
    current: true,
    stack: [
      "Playwright",
      "TypeScript",
      "Postman",
      "Newman",
      "JMeter",
      "Jenkins",
      "GitHub Actions",
      "REST APIs",
      "SQL",
      "Claude Code / MCP",
    ],
    achievements: [
      "Architected a hybrid Playwright Test (TypeScript) framework as the sole QA analyst — Page Object Model, custom fixtures, and parameterized tests — cutting regression on a QR-based asset-tracking SaaS platform from days to hours.",
      "Extended API coverage into Playwright with APIRequestContext, so UI and API assertions run from a single suite with shared authentication state.",
      "Own and continuously expand the Postman/Newman API regression suite — authentication, role-based permissions, workflow execution, asset lifecycle, and reporting across all three applications.",
      "Integrated every suite into Jenkins and GitHub Actions so each merge produces a quality signal, managing credentials, network access, and build-stability thresholds.",
      "Reduced post-release defect escapes and shortened resolution cycles by partnering with Product and Engineering on triage and fix validation, gating releases on defined quality criteria.",
      "Ran load and performance testing in Apache JMeter to validate scalability, throughput, and response times before enterprise onboarding.",
      "Applied GenAI tooling and MCP servers to generate test scripts, test data, and defect diagnostics, raising coverage output per sprint.",
      "Established the company's first QA documentation standards — test strategy, defect reporting, and release-validation checklists — giving stakeholders clear release readiness.",
    ],
  },
  {
    company: "Profound Impact Corp.",
    logo: "/logos/profound-impact.jpg",
    role: "QA Analyst",
    location: "Toronto, Canada",
    period: "Aug 2024 — Mar 2025",
    stack: [
      "Selenium",
      "Python",
      "Pytest",
      "Postman",
      "MySQL",
      "REST APIs",
      "JIRA",
      "Agile/Scrum",
    ],
    achievements: [
      "Built Selenium WebDriver (Python + Pytest) automation for an AI-driven grant-matching platform, covering ~60% of the regression suite and sharply cutting execution time.",
      "Reduced post-release defects by 25% through earlier, broader test coverage and a formalized defect lifecycle.",
      "Evaluated AI matching output against manager-defined metrics for relevance, correctness, and ranking — flagging false positives to improve recommendation reliability.",
      "Performed API testing with Postman, validating responses against MySQL to improve data accuracy across the matching pipeline.",
      "Stood up QA documentation, test repositories, and defect standards from the ground up, improving testability and risk coverage across Agile ceremonies.",
    ],
  },
  {
    company: "Cedar Gate Technologies",
    logo: "/logos/cedar-gate.svg",
    role: "QA Engineer",
    location: "Greenwich, CT, USA (Remote)",
    period: "Feb 2022 — May 2023",
    stack: [
      "SQL",
      "EDI 837/835",
      "XPath",
      "In-house Automation",
      "JIRA",
      "TestRail",
      "Agile/Scrum",
    ],
    achievements: [
      "Ensured regulatory compliance across insurance workflows and EDI (837/835) processing, validating claims-calculation and payment accuracy against complex business rules using SQL.",
      "Automated 65% of the smoke suite using an internal browser-based automation platform with XPath-based element location.",
      "Mentored junior QA engineers and led team test execution in the team lead's absence, keeping delivery and quality on track.",
      "Authored test requirements from business rules and system architecture, feeding risk assessment and release planning.",
    ],
  },
  {
    company: "Daraz Kaymu",
    logo: "/logos/daraz.png",
    role: "QA Analyst",
    location: "Nepal",
    period: "Jan 2020 — Feb 2022",
    stack: ["ERP", "E-commerce", "SQL", "UAT", "Regression", "E2E", "JIRA"],
    achievements: [
      "Performed UAT, regression, and end-to-end testing across 6+ ERP and e-commerce platforms in a high-transaction marketplace environment.",
      "Improved end-user acceptance through structured validation and defect resolution, partnering with cross-functional teams to refine requirements and improve user experience.",
    ],
  },
  {
    company: "Web Creation Nepal",
    logo: "/logos/web-creation.png",
    role: "Business Analyst / QA",
    location: "Nepal",
    period: "Jan 2018 — Dec 2019",
    stack: [
      "UAT",
      "Requirements",
      "Impact Analysis",
      "Test Documentation",
    ],
    achievements: [
      "Performed UAT, impact analysis, and scope validation — reducing scope creep and aligning delivery with stakeholder goals.",
    ],
  },
];

export type Project = {
  title: string;
  tagline: string;
  problem: string;
  approach: string[];
  tech: string[];
  impact: string[];
  accent: string; // tailwind gradient stops
};

export const projects: Project[] = [
  {
    title: "Playwright Automation Framework From Zero",
    tagline: "Framework architecture · UI + API · CI/CD",
    problem:
      "No scalable automation framework existed. Regression was manual, slow, and inconsistent — limiting release velocity and confidence.",
    approach: [
      "Designed the Playwright framework architecture from the ground up.",
      "Implemented UI automation with reusable page objects and fixtures.",
      "Added an API testing layer alongside UI coverage.",
      "Built maintainable regression suites and integrated them into CI/CD.",
    ],
    tech: ["Playwright", "TypeScript", "GitHub Actions", "Jenkins", "Postman"],
    impact: [
      "Increased automated regression coverage toward ~50%.",
      "Reduced manual regression effort significantly.",
      "Improved release confidence and shortened feedback loops.",
    ],
    accent: "from-brand-500/20 to-glow/10",
  },
  {
    title: "AI Recommendation Quality Testing",
    tagline: "LLM / AI output validation · accuracy & relevance",
    problem:
      "AI-generated recommendations shipped without a systematic way to validate their accuracy, relevance, or ranking quality.",
    approach: [
      "Created a quality-validation approach for AI outputs.",
      "Defined checks for accuracy, relevance, and ranking correctness.",
      "Added false-positive detection to catch misleading results.",
      "Combined SQL data checks with API-level verification.",
    ],
    tech: ["AI Evaluation", "Manual Validation", "SQL", "API Testing"],
    impact: [
      "Improved the reliability of AI-powered recommendations.",
      "Gave the team a repeatable way to measure model output quality.",
    ],
    accent: "from-cyan-500/20 to-brand-500/10",
  },
  {
    title: "API & Performance Testing Platform",
    tagline: "Continuous API quality · load & response-time analysis",
    problem:
      "The team needed confidence in backend scalability and a way to continuously verify API quality as the platform grew.",
    approach: [
      "Built structured Postman collections covering critical endpoints.",
      "Automated API regression runs with Newman in CI.",
      "Designed JMeter performance and load-testing scenarios.",
      "Tracked response times and error rates under load.",
    ],
    tech: ["Postman", "Newman", "JMeter", "CI/CD"],
    impact: [
      "Created continuous API quality monitoring.",
      "Surfaced backend scalability limits before they hit production.",
    ],
    accent: "from-emerald-500/20 to-brand-500/10",
  },
];

export type SkillGroup = {
  category: string;
  icon: string; // lucide icon name key mapped in component
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Automation",
    icon: "cpu",
    skills: [
      "Playwright",
      "Selenium",
      "TypeScript",
      "JavaScript",
      "Python",
      "Pytest",
      "Page Object Model",
      "Hybrid Frameworks",
    ],
  },
  {
    category: "API Testing",
    icon: "webhook",
    skills: ["Postman", "Newman CLI", "REST API Testing", "APIRequestContext"],
  },
  {
    category: "Performance",
    icon: "gauge",
    skills: ["Apache JMeter", "Load Testing", "Throughput", "Response Time Analysis"],
  },
  {
    category: "CI/CD",
    icon: "gitBranch",
    skills: ["Jenkins", "GitHub Actions", "Git", "Parallel Execution", "Build Gating"],
  },
  {
    category: "Database",
    icon: "database",
    skills: ["SQL", "MySQL", "Business-Rule Validation", "EDI 837/835"],
  },
  {
    category: "AI Quality",
    icon: "sparkles",
    skills: [
      "LLM Testing",
      "AI Output Validation",
      "Recommendation Systems",
      "Claude Code",
      "GitHub Copilot",
      "MCP Servers",
    ],
  },
  {
    category: "Testing",
    icon: "checkCheck",
    skills: [
      "Functional",
      "Regression",
      "Smoke",
      "Integration",
      "API",
      "E2E",
      "UAT",
      "Performance",
      "Cross-Browser",
    ],
  },
  {
    category: "Tools & Process",
    icon: "kanban",
    skills: [
      "JIRA",
      "TestRail",
      "Confluence",
      "Agile/Scrum",
      "Test Strategy",
      "Defect Triage",
      "QA Mentoring",
    ],
  },
];

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  image?: string; // full certificate image, shown in a lightbox on click
};

export const certifications: Certification[] = [
  {
    name: "ISTQB Foundation Level Certified Tester",
    issuer: "ASTQB",
    year: "2025",
    image: "/certs/istqb.jpeg",
  },
  {
    name: "Postman REST API Testing",
    issuer: "Udemy",
    year: "2024",
    image: "/certs/postman.jpeg",
  },
  {
    name: "Selenium WebDriver 4 with Python",
    issuer: "Udemy",
    year: "2024",
    image: "/certs/selenium.jpeg",
  },
  {
    name: "Scrum Fundamentals Certified",
    issuer: "SCRUMstudy",
    year: "2024",
    image: "/certs/scrum.jpeg",
  },
];

export const education = {
  degree: "B.Sc. Computer Science & Information Technology",
  institution: "Tribhuvan University, Nepal",
  period: "2013 – 2017",
  detail: "Graduated with Distinction · GPA 3.8 / 4 (82%)",
};

export type SoftSkill = {
  icon: string; // lucide icon name key mapped in component
  title: string;
  body: string;
};

// Soft skills that make QA effective — the judgment automation can't replace.
export const softSkills: SoftSkill[] = [
  {
    icon: "searchCheck",
    title: "Critical Thinking",
    body: "Green isn't the same as covered. I interrogate what a passing test actually proves before I trust it.",
  },
  {
    icon: "scanEye",
    title: "Attention to Detail",
    body: "A payment off by $4.17 throws no error. I hunt the defects that don't announce themselves.",
  },
  {
    icon: "target",
    title: "Risk-Based Judgment",
    body: "I test what hurts most if it breaks — not what's easiest to turn into a fast green check.",
  },
  {
    icon: "messagesSquare",
    title: "Clear Communication",
    body: 'Turning "does this look right?" into criteria a whole team can perform and agree on.',
  },
  {
    icon: "compass",
    title: "Curiosity & Fast Learning",
    body: "I learn a domain until I can derive the right answer by hand, before I check the system's.",
  },
  {
    icon: "flag",
    title: "Ownership & Advocacy",
    body: "Comfortable owning release sign-off as the sole quality voice, and raising the bar around me.",
  },
];

export const pipelineStages = [
  { name: "Lint & Typecheck", status: "passed" },
  { name: "Unit + Component", status: "passed" },
  { name: "Playwright E2E", status: "passed" },
  { name: "API / Newman Suite", status: "passed" },
  { name: "JMeter Perf Smoke", status: "running" },
  { name: "Deploy to Staging", status: "queued" },
] as const;

export const philosophy = {
  quote:
    "Quality is not a final checkpoint. It is an engineering practice built into every stage of software delivery.",
  points: [
    {
      title: "Shift-left by default",
      body: "Testing starts at design, not after code freeze. Catching issues early is faster, cheaper, and calmer.",
    },
    {
      title: "Automate the repeatable",
      body: "Humans should focus on exploratory and risk-based testing. Everything predictable belongs in a pipeline.",
    },
    {
      title: "Measure what matters",
      body: "Coverage, defect escape rate, and release confidence — real signals over vanity metrics.",
    },
    {
      title: "Quality is a team sport",
      body: "The best QA raises the whole team's bar, partnering with engineering, product, and DevOps.",
    },
  ],
};
