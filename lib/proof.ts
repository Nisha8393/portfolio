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
    badge:
      "https://github.com/Nisha8393/Automation-Exercise/actions/workflows/playwright.yml/badge.svg",
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
    title: "Every test traces to a written case",
    filename: "@CASE-ID tags",
    language: "javascript",
    code: `// Each spec carries the manual case ID it covers, verbatim from the
// test-case workbook, so coverage is computed from the suite, not claimed.
test("Login with valid credentials", { tag: "@R-AUTH-07" }, async () => {
  /* ... */
});

test("Home has no new WCAG 2.1 A/AA violations", { tag: "@A11Y-SCAN-01" }, /* ... */);

// One test can cover several cases at once:
test("Filter by Polo brand", { tag: ["@R-PROD-17", "@R-PROD-22"] }, /* ... */);

// The rule: a spec is tagged ONLY when its assertions actually establish
// that case's Expected Result. Partial coverage stays untagged, because
// an inflated number is worse than no number.`,
    note: "The traceability layer of the framework. Every automated test maps back to a written case, and a coverage step reconciles the tags against the workbook in both directions, warning on any drift, so the coverage number is always earned rather than asserted.",
  },
  {
    title: "Accessibility with a baseline, not zero-tolerance",
    filename: "a11y/accessibility.spec.js",
    language: "javascript",
    code: `// A live third-party site with real a11y debt: asserting "zero violations"
// would just paint the suite red. Each page carries a baseline of known
// rule IDs, so only a NEW critical or serious violation fails.
const PAGES = [
  { name: "Home", path: "/", baseline: ["button-name", "color-contrast", "link-name"] },
  { name: "Contact Us", path: "/contact_us", baseline: ["button-name", "color-contrast", "label"] },
];

const { violations } = await new AxeBuilder({ page: isolatedPage })
  .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
  .analyze();

// Attach the full scan every run so the baseline can be reviewed and trimmed.
await testInfo.attach("axe-" + name + ".json", {
  body: JSON.stringify(violations, null, 2),
  contentType: "application/json",
});

const regressions = violations
  .filter((v) => ["critical", "serious"].includes(v.impact))
  .filter((v) => !baseline.includes(v.id));

expect(regressions, "New accessibility violations found").toEqual([]);`,
    note: "The site has pre-existing accessibility debt, so a hard zero would be pure noise. A per-page baseline of known rule IDs means only a new critical or serious violation fails the build, and the full axe report is attached every run so the baseline can be trimmed over time.",
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
