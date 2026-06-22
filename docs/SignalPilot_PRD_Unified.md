# SignalPilot — Product Requirements Document (PRD)

**Product Name:** SignalPilot  
**Tagline:** Turn messy feedback into roadmap-ready decisions.  
**Subheading:** Analyze competitor reviews, public complaints, and internal feedback to uncover user pain, market gaps, and evidence-backed product opportunities.

---

## 1. Product Discovery & Positioning

### Main Headline
*   **"Turn messy feedback into roadmap-ready decisions"**

### Subheadline
*   *Analyze competitor reviews, public complaints, and internal feedback to discover what users really need and what your product team should do next.*

### Key Differentiation
*   **"Most tools organize feedback. SignalPilot discovers what users really need."**
*   *From reviews and feedback to product opportunities.*

### Core Intent
SignalPilot is a **Product Discovery Intelligence Agent** for Product Managers. It shifts away from legacy feedback repositories (Productboard, Dovetail, Canny) which focus on simple tagging, manual lists, and vote accumulation. Instead, SignalPilot acts as an analytical synthesizer that reads public review channels and internal documents, clusters them into pain themes, checks for bias/representativeness, maps them to competitor gaps, and outputs ready-to-share **Roadmap Evidence Packs** to drive confident product decisions.

---

## 2. Navigation Architecture

The workspace implements a 13-tab sidebar:
1.  **Home:** Input choice selection.
2.  **URL Analyzer:** Competitor review and public site scanning.
3.  **Paste Feedback:** Manual entry for raw support/sales/interview documents.
4.  **Upload Reviews:** Bulk file imports (CSV, JSON, TXT).
5.  **Signal Monitor:** Scheduled recurring reports monitor creation and listings.
6.  **Review Dashboard:** High-level PM decision analytics.
7.  **Problem Themes:** Pain points clustered with severity and confidence scores.
8.  **Competitor Gap Matrix:** 7-column comparative table highlighting gaps.
9.  **Opportunities:** Actionable suggested MVPs with effort/impact calculations.
10. **Evidence Packs:** Document view for roadmap defense.
11. **Research Projects:** Historical project restoration.
12. **Integrations / MCP:** Coming soon extensions.
13. **Settings:** Phase roadmaps and configuration.

---

## 3. Ingestion & Input Methods

### Screen 1: Home / Input Choice Landing Page
Displays SignalPilot branding and 4 large action cards:
*   **Analyze by URL:** For competitor public reviews. (*Analyze URL*)
*   **Paste Feedback:** For manual notes and ticket logs. (*Paste Feedback*)
*   **Upload Reviews / CSV:** For bulk export files. (*Upload File*)
*   **Schedule Signal Monitor:** For weekly competitor watches. (*Create Monitor*)
*   **"Try Sample Project"** button to instantly load mock Productboard dataset.

### Screen 2: URL Analyzer
*   Fields: URL text input, Platform selector dropdown (Auto Detect, G2, Capterra, Reddit, App Store, Play Store, Product Hunt, TrustRadius, Quora, Website), Analyze Reviews button, and Try Sample Competitor button.

### Screen 3: Paste Feedback
*   Fields: Text area block, Source type dropdown, Analyze Feedback button, and Use Sample Feedback Dataset template button.

### Screen 4: Upload Reviews / CSV
*   Fields: Drag-and-drop file zone, Source type dropdown, Analyze Uploaded Reviews button, and Use Sample File button.

### Screen 5: Signal Monitor
*   Fields: Monitor Name, Product to Monitor, Competitors to track, Sources, Frequency (Daily, Weekly, Monthly), Delivery (Email, Slack, In-app), Report type.
*   Actions: Create Monitor, Preview Weekly Report (routes to Scheduled Report Preview), and Save Draft.
*   Listings: Displays cards showing monitor configurations, status (Active/Paused), and actions.

---

## 4. Simulated AI Loading Sequence

All input analysis triggers a step-by-step sequential progress checkmark loader representing:
1.  `Detecting feedback source…`
2.  `Extracting complaints and praise…`
3.  `Removing duplicates…`
4.  `Clustering user pain themes…`
5.  `Checking bias risk…`
6.  `Calculating confidence…`
7.  `Finding competitor gaps…`
8.  `Generating product opportunities…`
9.  `Creating evidence packs…`

---

## 5. PM Decision Dashboard

Rather than listing numbers, the dashboard focuses on directing PM attention:
*   **6 Summary Cards:** Reviews Analyzed, Sources Covered, Pain Themes Found, High-Severity Issues, Opportunities Found, Evidence Packs Generated.
*   **"What needs PM attention now?" section:** Displays 3 cards:
    1.  **Build:** Rationale for immediate features.
    2.  **Investigate:** Underspecified problems requiring validation.
    3.  **Ignore for now:** Noise or low-impact requests.
*   **Visualizations:** Platform distributions, sentiment breakdowns, recurring themes, and severity counts.

---

## 6. Thematic Problem Clustering & Deep-Dive

SignalPilot maps feedback to structured pain themes:
*   **Card Properties:** Title, User Pain Summary, Mention count, Platform origins, Severity badge, Confidence score (%), Bias risk badge (Low/Med/High), Opportunity score, and Recommended Action (Build, Investigate, Ignore, Attach to Roadmap).
*   **Deep detail panel:** Problem Statement, Root Cause, Why Users Care, Who Is Affected, Where This Appears, Supporting Quotes, Competitor Gap, Product Opportunity, Suggested MVP Feature, Severity, Confidence, Bias Risk, PM Action, What to ignore, and a *Generate Evidence Pack* button.

---

## 7. Competitor Gap Matrix

Lists 7 major competitor rows comparing what users like, complaints, missing capabilities, and product opportunities:
*   Productboard
*   Canny
*   Dovetail
*   Aha!
*   Jira Product Discovery
*   ProductPlan
*   Enterpret

---

## 8. Opportunities & Evidence Packs

*   **Opportunities:** Renders actionable MVP recommendations with Impact/Effort metrics.
*   **Evidence Packs:** Structured document containing Executive Summary, User Problem, Source Breakdown, Competitor Gaps, Quotes, Severity, Confidence, Bias, MVP features, Actions, and Next Steps. Buttons: *Copy to Clipboard*, *Export*, and *Share*.

---

## 9. Future Connectors & Settings

*   **Integrations / MCP:** Highlights the Model Context Protocol (MCP) framework as the connector layer for Jira, Slack, Linear, Zendesk, Intercom, Gong, Notion, Google Drive, Productboard, GitHub, and Supabase.
*   **Settings Page:** Outlines the Phase 1, Phase 2, and Phase 3 roadmaps, explicitly stating that Phase 1 utilizes mock analysis and LocalStorage.
