# Thrown In the Deep End

Three situations I didn't plan for, and what I had to learn to get through them.

---

## Two Months In, I Became the Entire QA Team

**Openscreen Inc.** · QR-based asset-tracking SaaS · Mar 2025 – Present
**Stack:** Playwright (TypeScript) · Postman / Newman · JMeter · Jenkins · GitHub Actions · SQL

### What happened

I joined as the second QA on a two-person team. Two months in, the other QA left, and I became the entire quality function for a platform with multiple products.

What I inherited was a Postman collection I hadn't written, no UI automation, no CI, and a regression cycle that was entirely manual. What I owned by default was release sign-off for everything.

### What I had to figure out

My first instinct was to start automating immediately. I'm glad I didn't, because the more pressing problem wasn't coverage — it was that I couldn't explain the coverage I already had.

I sat down with the inherited Postman collection and went through it request by request. Some of it was solid. A fair amount of it called an endpoint, checked for a 200, and asserted nothing else. From the outside those look identical: both are green, both count as a test. Only one of them would actually catch anything.

That was the first thing this role taught me. Inheriting a working test suite feels like a head start, and it isn't — not if nobody can tell you why each test exists. Green is not the same as covered, and I'd never had to interrogate that distinction before because there had always been someone to ask.

### How I approached it

**I rebuilt the API suite before extending it.** Environment-driven variables instead of hardcoded values, real assertions on the responses that mattered, parameterized requests so a schema change meant one edit instead of forty. Slower than adding new tests, but I needed a foundation I could defend.

**I built the Playwright framework deliberately rather than quickly.** No inherited framework meant no inherited technical debt, so I spent real time on the structure — page objects for the screens that change most, fixtures for auth and test data so no test depends on another test's leftovers, a clean separation between UI and service-level suites. I've maintained enough badly-structured suites to know that the cost of a rushed framework arrives later, quietly, as flakiness nobody can trace.

I prioritized by risk rather than by what was easiest to automate first, which meant starting with the flows that would hurt most if they broke rather than the ones that would go green fastest.

**I got CI in early.** Playwright and Newman runs wired into Jenkins and GitHub Actions on every build. Credentials into managed secrets. Build stability thresholds so a flaky test couldn't cry wolf and train people to ignore red.

This was the change that shifted things most. Before, quality signal arrived when I finished testing. After, it arrived minutes after a commit — which moved defect discovery from just-before-release to same-day.

**I added JMeter for load and response-time behavior**, so scalability questions had numbers behind them rather than opinions.

### The part I'm still learning from

I'm currently migrating the API suite out of Postman and into Playwright's API testing, so UI and service coverage share one framework, one set of fixtures, one report — instead of two runners and two places to update every time an endpoint changes.

I'm doing this alone, and I've leaned on AI heavily for it. Translating dozens of Postman requests into typed Playwright specs is mechanical work with a lot of surface area, which is exactly what LLMs handle well. What I've found it can't do is judge which assertions deserve to survive. Left to itself it ports faithfully — including the 200-and-nothing-else tests, which would have moved dead weight into the new framework and made it look better covered than it was.

So the migration has doubled as an audit. Every request gets a decision about what it should actually assert before it gets rewritten. Learning where AI genuinely accelerates me and where it quietly makes things worse has been one of the more useful things I've picked up this year, and I expect that line to keep moving.

### The constraint underneath all of it

None of this happened on a quiet quarter set aside for tooling. It happened inside two-week sprints that still had to ship, with me as the only person testing them. Framework building, the API migration, CI work — all of it competed directly with the regression cycle, and the regression cycle can't be deferred.

The honest answer for how that fits is that AI absorbed the mechanical share. Scaffolding specs, generating test data, first-pass triage on a failure, translating collections — work that used to consume the hours I didn't have. What it bought me wasn't shortcuts on quality; it was the time to do the thinking parts properly, which are the parts that were never going to be delegated: deciding what to test, deciding what a defect is, deciding which assertions were worth keeping.

I've come to see that as the actual skill rather than a footnote about tooling. A one-person QA function lives or dies on where its hours go, and being deliberate about which work is mechanical and which is judgment is what made a sprint cadence and a rebuild possible at the same time.

---

## How Do You Test Something That Has No Right Answer?

**Profound Impact Corp.** · AI grant-matching platform · Aug 2024 – Mar 2025
**Stack:** Selenium WebDriver (Python + Pytest) · Postman · MySQL · JIRA

### What happened

Profound Impact matched researchers and organizations to grant opportunities using an AI recommendation engine. There were two of us in QA, but no automation, no test repository, and no defect standards — the infrastructure had to be built alongside the testing.

The platform turned out to be two different testing problems wearing one product, and they needed opposite approaches. Recognizing that took me longer than I'd like.

### The part I knew how to do

Login, profiles, search, filtering, the application flow — deterministic, all of it, and all of it being tested by hand every release.

I built the Selenium framework from scratch in Python and Pytest and automated ~60% of regression. Page objects for stability, fixtures for setup and teardown, data-driven cases where one flow needed many inputs. I paired it with Postman API coverage and MySQL queries checking what the UI displayed against what the database actually stored.

That last piece taught me something I've used everywhere since. A value can render correctly and persist wrong, and if you only ever look at the screen you will never know. I found bugs there that no amount of UI testing would have surfaced.

I also built the QA foundation the team was missing — test repository, documentation, defect standards — and started raising testability during Agile ceremonies rather than discovering it at test time.

### The part I didn't

The matching engine had no expected result, and I had never tested anything like it.

My early attempts were bad. I tried to treat it like any other feature: input a profile, check the output, pass or fail. But a grant match isn't right or wrong — it's more or less relevant, and relevance is a judgment. You cannot write `assert match == expected` when "expected" is a professional opinion about whether a materials-science researcher should be shown a nanotech funding call.

For a while I assumed that meant the testing was weak because it wasn't automated. What I eventually understood is that automation needs a known answer, and when the output is a judgment call, structured human evaluation isn't a fallback — it's the correct method. The engineering problem isn't eliminating the human. It's making the human's assessment consistent enough to be trusted across releases.

### How I approached it once I understood that

**I worked from defined criteria rather than instinct.** Match relevance, correctness, and ranking quality were specified as evaluation metrics by my manager, which turned "does this look right?" into something two people could perform and agree on.

**I paid attention to order, not just membership.** A recommendation engine can return exactly the right set of results in the wrong sequence and still be broken in practice, because the top few are all anyone reads. Checking only whether a good match appeared *somewhere* would have missed that entirely.

**I focused on false positives.** An irrelevant match ranked highly is the failure that destroys trust fastest — someone who sees two bad suggestions stops believing the good ones. I flagged those systematically, with reproducible examples rather than impressions.

**I kept consistent input profiles.** Testing against whatever data happened to be in the environment made results incomparable between releases. Working from stable evaluation sets meant I could actually answer "did that model change help or hurt?" — which I couldn't before, and which turned out to be the question people most wanted answered.

**I learned to separate model failures from pipeline failures.** A lot of what looked like bad matching wasn't the model at all — fields not populating, records not indexing, filters silently dropping candidates. API testing and SQL validation let me tell those apart before escalating. I'd rather spend an hour checking than send engineers to tune a model over a data bug.

### What I took from it

Automating the deterministic 60% is what created the time to evaluate the AI properly — the two halves paid for each other. And I stopped assuming that "not automated" means "not rigorous." Some things are judgment calls, and the skill is in structuring the judgment, not in pretending it isn't one.

---

## Nobody Reports a Payment That's Off by $4.17

**Cedar Gate Technologies** · US healthcare claims processing & payment platform · Feb 2022 – May 2023
**Stack:** SQL · EDI · XPath · TestRail · JIRA · Agile / Scrum

### What happened

Cedar Gate processes healthcare claims: ingest EDI claim files, apply contract and benefit rules, calculate what's owed — including interest on delayed payments — and pay it. My work sat almost entirely on the calculation side.

I came in without a healthcare background, and it became clear quickly that I couldn't test any of it until I understood how the money was supposed to be calculated in the first place.

### Why it was hard

A broken feature announces itself. A wrong number does not.

If a claim pays $4,200 when it should have paid $4,204.17, nothing errors. Nothing fails. No user files a ticket. The transaction completes successfully and the wrong amount is, as far as the system is concerned, simply the amount. It replicates across every claim hitting that rule and surfaces weeks later in a reconciliation or an audit, thousands of transactions deep, carrying regulatory exposure alongside the financial cost.

Three things made it harder than typical functional testing:

**The logic is layered.** A claim's final amount comes from many rules applied in sequence — eligibility, contract terms, fee schedules, adjustments, coordination of benefits. Each can be individually correct while the composition is wrong. The happy path proves close to nothing.

**Interest is a precision problem.** Interest on delayed claims depends on dates, rates, and threshold rules. Rounding behavior, day-count conventions, and where in the sequence interest gets applied all move the result by amounts small enough to look like noise and consistent enough to matter at scale.

**EDI is unforgiving.** A structurally valid file can carry semantically wrong content, and the system will process it and calculate confidently from it.

**And "correct" is defined externally.** Not by a requirements doc — by contract terms and US healthcare regulation. Validating an output means being able to derive independently what it should have been.

### How I approached it

**I learned the domain before I trusted myself to test it.** This was the real work of the first stretch. I read contract terms and benefit rules until I could compute a claim by hand. Testing without that would have meant checking that the software agreed with itself, which is not the same as checking it's right.

**I calculated expected results independently, then compared.** SQL to pull the actual inputs to a calculation, the governing rules to work out what the answer should be, then a comparison against what the platform produced. Going to the data layer is the only way to catch a rule that's been applied uniformly and uniformly wrong — a category of bug the UI will happily show you all day.

**I tested where the money changes.** Calculation defects don't live in the middle of a range, they live at the edges: threshold crossings, rounding points, date boundaries on interest accrual, claims that qualify by a single day or a single dollar. Those cases I built deliberately rather than hoping to stumble into them.

**I treated EDI ingestion as a calculation input.** A valid file with wrong segment content produces a confidently wrong number downstream, so I checked that the values landing in the system matched what the file actually carried. Everything after that point inherits the error.

**I wrote test requirements from business rules.** Rather than testing to the tickets, I authored requirements from business rules, user feedback, and system architecture, and fed those into risk assessment and release planning. In a regulated domain, the analysis *is* most of the testing.

**I automated smoke coverage within the tooling I had.** ~65% of smoke tests, using the company's internal browser-based automation platform with XPath-based location. Not the stack I'd have chosen, but it was what existed, and the value was fast confirmation that core workflows were alive before spending a day on calculation testing.

**I stepped up when the lead was out.** I mentored QA engineers and ran team test execution in the team lead's absence, which was my first real exposure to being responsible for other people's work as well as my own.

### What I took from it

Domain understanding turned out to be a testing skill, not a prerequisite to one. I couldn't validate a claims calculation until I could produce the answer myself, by hand, before looking at the system's.

That habit — establishing what *should* happen independently before looking at what *did* — is the thing I've carried into everything since. It's the difference between confirming that software runs and verifying that it's right, and I only learned it because the domain refused to let me skip it.
