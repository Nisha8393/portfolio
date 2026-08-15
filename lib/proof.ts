/**
 * "A working demo": real, showable artifacts from Nisha's personal
 * projects (github.com/Nisha8393). Code excerpts are lightly trimmed for
 * display; commentary explains the design decision behind each.
 */

export type Repo = {
  name: string;
  description: string;
  url: string;
  badge?: string; // GitHub Actions badge SVG url
  meta: string[];
};

export const repos: Repo[] = [
  {
    name: "Automation-Exercise",
    description:
      "Playwright UI suite covering smoke, regression, and e2e against a live demo storefront. Accessibility-first Page Objects, dual-scope fixtures, tag-driven suites, a custom Excel reporter, and a GitHub Actions pipeline that runs nightly.",
    url: "https://github.com/Nisha8393/Automation-Exercise",
    badge:
      "https://github.com/Nisha8393/Automation-Exercise/actions/workflows/playwright.yml/badge.svg",
    meta: ["smoke · regression · e2e", "Playwright · JavaScript", "Nightly CI + report"],
  },
  {
    name: "Automation-ExerciseAPI",
    description:
      "Postman / Newman API regression covering all 14 documented endpoints with positive, negative and edge cases (400 / 404 / 405), a self-cleaning create→read→update→delete lifecycle, and secrets kept out of git via environment templating.",
    url: "https://github.com/Nisha8393/Automation-ExerciseAPI",
    meta: ["Full CRUD lifecycle", "Postman · Newman", "14 endpoints covered"],
  },
];

export type Snippet = {
  title: string;
  filename: string;
  language: string;
  code: string;
  note: string;
};

export const snippets: Snippet[] = [
  {
    title: "Accessibility-first Page Object",
    filename: "pages/header.page.js",
    language: "javascript",
    code: `export default class HeaderSection {
  constructor(page) {
    this.page = page;
    this.header = this.page.getByRole("banner");

    // Logo alt text changes when logged in, so scope by class
    this.navMenu = this.header.getByRole("list");

    // Parameterized factory: any nav link by its visible text
    this.navLink = (text) =>
      this.navMenu.getByRole("link", { name: text });

    this.loggedInUserText = (user) =>
      this.navMenu.getByText(new RegExp(\`Logged in as.*\${user}\`, "i"));
  }

  async clickHome() {
    await expect(this.header).toBeVisible();
    await this.homeLink.click();
  }
}`,
    note: "Role/label locators scoped to a container, with parameterized factories for repeated patterns. CSS is a fallback used only where the DOM offers no accessible handle, and each fallback carries a comment saying why.",
  },
  {
    title: "Two fixture scopes on purpose",
    filename: "fixtures/base.js",
    language: "javascript",
    code: `export const test = base.extend({
  // ISOLATED (test-scoped): for anything that mutates state
  isolatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Block ads/trackers so the live site stays deterministic
    await page.route(
      /googleads|doubleclick|analytics|ads\\./,
      (route) => route.abort(),
    );

    await page.goto(BASE_URL);
    await use(page);
    await context.close();
  },

  // Every Page Object injected: specs never new() anything
  header: async ({ isolatedPage }, use) => {
    await use(new HeaderSection(isolatedPage));
  },

  // SHARED (worker-scoped): read-only smoke checks reuse one page
  sharedPage: [async ({ sharedContext }, use) => {
    /* ... */
  }, { scope: "worker" }],
});`,
    note: "An isolated context for state-mutating tests; a worker-shared page for fast read-only smoke checks. Ad and tracker requests are aborted so a live third-party site can't make the suite flaky.",
  },
  {
    title: "A self-cleaning, chained API lifecycle",
    filename: "AutomationExercise (Postman)",
    language: "javascript",
    code: `// Pre-request: a unique user per run, so the suite is idempotent
var ts = new Date().getTime();
pm.environment.set("dynamic_email", "testuser_" + ts + "@example.com");

// ...drives a full create -> read -> update -> delete lifecycle...

// A later request asserts the created user actually persisted:
pm.test("Returned email matches queried email", function () {
  var body = pm.response.json();
  pm.expect(body.user.email)
    .to.eql(pm.environment.get("dynamic_email"));
});`,
    note: "A per-run unique email drives a create→read→update→delete chain, so every run is self-cleaning on a shared public API. Downstream requests assert against values captured upstream, real chained verification, not isolated 200-checks.",
  },
];

export type ProofArtifact = {
  kind: "report" | "video" | "image";
  title: string;
  caption: string;
  href?: string;
  src?: string;
};

export const artifacts: ProofArtifact[] = [
  {
    kind: "report",
    title: "Live Playwright HTML report",
    caption:
      "The real, clickable test report: browse every suite, timing, and result. Green wall with one honest red.",
    href: "/proof/playwright-report.html",
    src: "/proof/report-one-red.png",
  },
  {
    kind: "video",
    title: "The e2e purchase flow, running headed",
    caption:
      "The full end-to-end journey: login → add to cart → checkout → order → downloadable invoice, driving a real browser.",
    src: "/proof/trace-demo.mov",
  },
];
