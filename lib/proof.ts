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
      "A Playwright suite against a live storefront: smoke, regression, an end-to-end purchase journey, WCAG accessibility scans, and unhappy-path tests that fake backend failures. Every spec is traceable to a manual test case, coverage is computed rather than claimed, and a pre-flight check fails a bot-blocked run in seconds instead of timing out.",
    url: "https://github.com/Nisha8393/Automation-Exercise",
    meta: ["a11y · unhappy-path · e2e", "Traceable to a test-case sheet", "Computed coverage · CI"],
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
    title: "Two fixture scopes on purpose",
    filename: "fixtures/base.js",
    language: "javascript",
    code: `export const test = base.extend({
  // ISOLATED (test-scoped): anything that mutates state.
  // Built on Playwright's own \`page\`, not a hand-rolled browser.newContext(),
  // so test.use({ storageState }), the project viewport and trace all apply.
  isolatedPage: async ({ page }, use) => {
    await blockAdsAndTrackers(page); // a live third-party site can't add flake
    await page.goto(BASE_URL);
    await use(page);
  },

  // Every Page Object injected: specs never new() anything.
  header: async ({ isolatedPage }, use) =>
    use(new HeaderSection(isolatedPage)),

  // SHARED (worker-scoped): read-only smoke checks reuse one page.
  sharedPage: [async ({ sharedContext }, use) => {
    /* ... */
  }, { scope: "worker" }],
});`,
    note: "An isolated context for state-mutating tests, and a worker-shared page for fast read-only smoke checks. The isolated one is built on Playwright's own `page` fixture rather than a hand-rolled newContext(): a hand-rolled context silently ignores storageState, the project viewport and trace settings, so this way they all just work.",
  },
  {
    title: "Log in once, reuse the session",
    filename: "auth.setup.js + authState.js",
    language: "javascript",
    code: `// Runs once per run as a project dependency: log in, then save the session.
setup("authenticate", async ({ page }) => {
  await loginPage.login(email, password);
  await expect(header.loggedInUserText(name)).toBeVisible(); // assert before saving
  await page.context().storageState({ path: STORAGE_STATE });
});

// Any spec that needs an account opts in, no re-login through the UI:
test.use({ storageState: STORAGE_STATE });`,
    note: "The setup project signs in once and saves the session; specs opt in with storageState instead of logging in through the UI each time. It asserts the login worked before saving, so a logged-out state can't silently break every dependent test later. The e2e journey still logs in through the UI on purpose, since testing that path is the point.",
  },
  {
    title: "Unhappy paths, not just the happy one",
    filename: "unhappyPath/networkFailure.spec.js",
    language: "javascript",
    code: `// Every other spec drives the happy path; these fake what a user hits on
// a bad connection by intercepting the site's own ajax. This one found a bug.
test(
  "Add to cart with a 500 - nothing is added and no modal appears",
  { tag: "@R-NET-01" },
  async ({ isolatedPage, home, header, viewCartPage }) => {
    await isolatedPage.route("**/add_to_cart/**", (route) =>
      route.fulfill({ status: 500, body: "" }),
    );

    await home.addProductToCart("Blue Top");

    // Finding: the site shows no modal, adds nothing, and gives the user
    // no error at all. The click silently fails. This test pins it down.
    await expect(home.cartModal).toBeHidden();
    await header.clickCart();
    expect(await viewCartPage.isCartEmpty()).toBe(true);
  },
);`,
    note: "These intercept the site's ajax to simulate a 500, an aborted request, and a slow response. Faking a failed add-to-cart surfaced a real defect: the site adds nothing and shows no error, so the click silently fails. The test locks that behaviour in, so a future change has to address it deliberately.",
  },
  {
    title: "A self-cleaning, chained API lifecycle",
    filename: "AutomationExercise (Postman)",
    language: "javascript",
    code: `// Pre-request: a unique user per run, so the suite is idempotent.
pm.environment.set("dynamic_email", "testuser_" + Date.now() + "@example.com");

// ...drives a full create -> read -> update -> delete lifecycle...

// A later request asserts the created user actually persisted:
pm.test("Returned email matches queried email", () => {
  pm.expect(pm.response.json().user.email)
    .to.eql(pm.environment.get("dynamic_email"));
});`,
    note: "A per-run unique email drives a create → read → update → delete chain, so every run is self-cleaning on a shared public API. Downstream requests assert against values captured upstream: real chained verification, not isolated 200-checks.",
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
      "The real, clickable test report: browse every suite, its timing, and its result, run against a live third-party site.",
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
