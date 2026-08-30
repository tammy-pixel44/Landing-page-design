# KaChing Landing — Experience + Asset Plan

## What the page should make a visitor feel

1. **Recognition:** "Yes, I have too many cards and I hesitate at checkout."
2. **Relief:** "This gives me one answer instead of more research."
3. **Proof:** "I can see the ranking change when the purchase changes."
4. **Trust:** "The number comes from explicit rules/data, not magic AI copy."
5. **Control:** "KaChing advises me; I still make the payment."
6. **Desire:** "I want this available the next time I pay."

## Section-by-section plan

| # | Section | Purpose | Primary interaction | Main asset |
|---|---|---|---|---|
| 01 | Hero | Explain the job instantly | Pointer/touch influences card orbit | Three.js card wheel |
| 02 | Wallet reality | Establish multi-card context | Hover/focus issuer/category chips | Wallet rail |
| 03 | Problem | Show why guessing fails | Decision variables converge | Rule-stream animation |
| 04 | Decision Lab | Prove exact-rupee value | Merchant + amount selection | Ranked card stack |
| 05 | POS flow | Explain checkout moment | Run-decision button | POS terminal + inserting card |
| 06 | QR advisor | Explain scan/recommend/handoff | Step scrubber | Phone/QR scene |
| 07 | Trust engine | Explain data quality | Hover pipeline nodes | Verification pipeline |
| 08 | Product breadth | Show value after payment | Select lifecycle moment | Tracking/devaluation/rewards tiles |
| 09 | FAQ | Remove objections | Accessible accordions | No decorative asset needed |
| 10 | CTA | Convert with clarity | Single CTA | Orbit callback / value pulse |

## Asset inventory

### A. Procedural 3D credit cards — required for v1

Create in Three.js, not as downloaded models.

Each card needs:

- ISO-card-like proportion.
- Rounded rectangle silhouette.
- Visible edge thickness.
- Slight bevel/extrusion.
- Metallic chip element.
- Small contactless glyph/detail.
- Generic abstract card identity, never a copied bank card design.
- Category label such as DINING, TRAVEL, UPI, EVERYDAY, PREMIUM.
- Distinct roughness/metalness treatment.
- Front/back variation when the wheel rotates.

States:

- ambient orbit,
- pointer parallax,
- selected card moves subtly forward,
- reduced-motion static fan.

### B. POS terminal — required for v1

Use HTML/CSS/SVG-like primitives so it remains crisp and cheap.

Parts:

- terminal shell,
- screen,
- status LED,
- keypad/grid texture,
- contactless mark,
- card slot,
- physical card object,
- recommendation receipt/result panel.

Animation timeline:

1. Idle: "Ready for a decision".
2. Trigger: card approaches.
3. Insert/tap state.
4. Screen: "Checking wallet".
5. Screen: "Applying caps + offers".
6. Result: exact ₹ back + winning card.
7. Card exits / scene rests.

### C. Decision Lab ranked card stack — required for v1

DOM asset, not WebGL.

Needs:

- merchant scenario selector,
- amount field/stepper,
- 3-card result stack,
- winner badge,
- exact reward number,
- concise reason,
- delta versus next-best card,
- demo-data disclosure.

Later production wiring:

- merchant/category input,
- wallet input,
- reward-engine response,
- cap progress,
- offer reliability/confidence.

### D. Rule stream / problem visual — v1

Animated labels feeding one output:

- merchant,
- category,
- reward rate,
- monthly cap,
- minimum spend,
- network,
- live offer,
- points value,
- devaluation.

The point is to visually explain why "5%" alone is not the answer.

### E. QR advisor scene — v1.5

Can start as CSS/DOM mock rather than camera/QR functionality.

Assets:

- generic QR tile,
- phone frame,
- scan beam,
- merchant + amount card,
- recommendation sheet,
- "continue in your payment app" handoff state.

### F. Verification/data pipeline — v1

Nodes:

`source A + source B + official source → normalize → verify/provenance → reward engine → exact ₹ recommendation`

Secondary outputs branching from the same truth layer:

- cashback tracking,
- devaluation alert,
- unclaimed rewards.

Avoid neural-network dots. Use a restrained technical schematic.

### G. Lifecycle feature assets — v1

Three compact tactile cards:

1. **Before payment** — exact recommendation.
2. **After payment** — promised vs received cashback.
3. **Over time** — devaluation + expiring/unclaimed value alerts.

### H. Optional production assets — later

- Real app screen captures rendered into device frames.
- Real supported issuer rail from backend catalogue.
- Real anonymised recommendation examples.
- Real user quotes/metrics only after verified marketing approval.
- Optional lightweight sound design only if user-controlled and muted by default.
- High-fidelity GLB terminal/card assets only if procedural/CSS versions are not visually sufficient.

## Demo scenarios for the prototype

These values are invented UX fixtures and must remain labelled demo data.

### Food delivery — ₹1,240

- Everyday Plus — ₹62
- Rewards Core — ₹31
- Travel Metal — ₹12

### Flights — ₹18,500

- Travel Metal — ₹925
- Rewards Core — ₹555
- Everyday Plus — ₹185

### Grocery — ₹3,200

- Rewards Core — ₹160
- Everyday Plus — ₹96
- Travel Metal — ₹32

### UPI merchant — ₹860

- UPI Edge — ₹43
- Everyday Plus — ₹17
- Rewards Core — ₹9

## Content hierarchy

### Hero

Eyebrow: `THE 5-SECOND CARD DECISION`

Headline: `Know the card before the tap.`

Support: `KaChing compares your wallet against the purchase and shows the value in rupees — before you pay.`

CTA: `Try a decision`

Secondary: `See how it works`

### Problem

Headline: `Your best card changes with the purchase.`

Support: `Merchant rules, category multipliers, caps, offers, point values and devaluations turn a simple wallet into a moving target.`

### Value proof

Headline: `Stop comparing percentages. Compare what comes back.`

### Trust

Headline: `A recommendation is only as good as the rules underneath it.`

### CTA

Headline: `Five seconds to stop guessing.`

## Implementation sequence

### Phase 1 — foundation

- Create isolated Next.js app folder.
- Create tokens, layout, semantic section structure.
- Add reduced-motion handling and responsive base.

### Phase 2 — hero system

- Procedural rounded credit-card geometry.
- Orbit composition and lighting.
- Pointer parallax and fallback.
- Overlay copy and CTAs.

### Phase 3 — value interaction

- Decision Lab state model.
- Demo scenarios + ranking.
- Animated result transitions.
- Disclosure for prototype data.

### Phase 4 — POS/how-it-works

- Terminal visual.
- Triggered state machine.
- Recommendation result.

### Phase 5 — product depth + trust

- Problem rule-stream.
- Verification pipeline.
- Lifecycle value cards.
- QR advisor explainer.

### Phase 6 — conversion + polish

- FAQ.
- Final CTA.
- Focus/keyboard checks.
- Responsive tuning.
- Performance pass.
- Replace any unsupported claims.

## Success criteria

The experience succeeds if a first-time visitor can answer these questions without scrolling back:

- What problem does KaChing solve?
- When would I use it?
- Why is exact ₹ value better than a reward percentage?
- Why should I trust the recommendation?
- Does KaChing execute the payment or advise me?
- What value remains after the purchase?

If the page is visually impressive but those answers are unclear, the design has failed.
