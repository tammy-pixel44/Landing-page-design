# KaChing Landing — Execution Brief

## Mission

Build a premium, interaction-first landing experience for KaChing that makes the visitor understand and trust the product before asking them to convert.

This is not a section checklist. Every major visual must either:

- demonstrate a real KaChing decision,
- make the product easier to understand,
- increase trust in the recommendation/data system, or
- reduce conversion uncertainty.

If an animation does none of those things, remove it.

## Product truth to preserve

KaChing is for Indian credit-card power users with multi-card wallets. The primary job is to tell the user which card to use before they pay, using exact rupee value rather than vague percentages. The broader product story includes cashback tracking, devaluation detection, unclaimed-reward detection, wallet/combo optimisation, live offers and a QR-based advisory flow.

The landing page must never imply that KaChing itself is the bank, card issuer, payment processor, or merchant. It recommends; the user remains in control of payment.

## Experience principles

1. **Proof before promise.** Let the visitor try a decision before asking for trust.
2. **Exact rupees are the visual language.** ₹ values are the recurring motif.
3. **Motion explains state.** Animation shows comparison, ranking, handoff, verification, or value movement.
4. **Professional gamification.** Interaction should feel tactile and rewarding, never casino-like.
5. **No fake social proof.** No invented user counts, testimonials, savings totals, partnerships, or issuer support claims.
6. **No fake precision.** Prototype calculations must be labelled demo data until wired to production APIs.
7. **Performance is part of quality.** 3D is progressive enhancement, not a reason to make the page sluggish.
8. **Mobile matters.** Every interaction must degrade elegantly to touch-first controls and lightweight motion.
9. **Reduced motion is respected.** Motion must not be required to understand the content.
10. **Accessibility is not a post-pass.** Keyboard states, semantic controls, readable contrast and sensible focus are required from the beginning.

## Reference principles, not cloning

- CRED: capability-specific visual worlds and cinematic pacing.
- Scapia: product mechanics made playful and tactile.
- Ramp: demonstrate the product itself instead of hiding it behind marketing copy.
- Stripe: use interface fragments as explanatory visual objects.

Do not reproduce their layouts, visual assets, copy, trademark treatments, or signature interactions 1:1.

## Section architecture

### 01 — Hero / Live decision engine

- Full-viewport editorial hero.
- Three.js orbital wheel of detailed generic credit cards.
- Cards have physical thickness, bevels, chip/contactless details and distinct material treatments.
- Pointer movement adds restrained parallax; orbit remains slow and stable.
- Center copy: "Know the card before the tap."
- Primary CTA opens/scrolls to the decision lab.
- Secondary CTA jumps to how it works.
- Small trust line clarifies: exact-rupee recommendations, before payment.

### 02 — Multi-bank wallet / proof rail

- Do not claim partnerships.
- Frame issuers as example catalog coverage placeholders until live catalog data is connected.
- Replace generic logo soup with a wallet-style rail explaining that KaChing exists because users carry cards across issuers and categories.
- If real supported issuer data is available later, populate this from the backend.

### 03 — Problem statement

- Headline: the hard part is not owning a good card; it is choosing correctly in the 5-second payment moment.
- Show the hidden variables that break simple percentage comparison: merchant, category, caps, exclusions, monthly progress, point value, offer stacking and devaluations.
- Use moving "decision variables" that converge into one exact ₹ output.

### 04 — Decision Lab / value proof

- Let visitors choose a merchant scenario and amount.
- Rank example cards live.
- Animate best-card position and rupee return.
- Explain *why* the card wins in one sentence.
- Label the dataset as prototype/demo data.
- Later integration target: production calculate/recommend endpoint.

### 05 — How it works / POS scene

- A physical-looking POS terminal sits in a controlled scene.
- A card inserts/taps into the terminal.
- Terminal state sequence: merchant detected → wallet checked → cap/offer evaluated → best card shown.
- The animation is triggered by the user; no endless attention-seeking loop.

### 06 — QR advisory flow

- Show three explicit states: scan → recommendation → continue payment in user's own app.
- Never imply KaChing holds money or executes a bank transfer itself.

### 07 — Trust/data moat

Explain why the recommendation can be trusted:

- multiple source inputs,
- normalisation,
- verification/provenance,
- deterministic reward math,
- cashback received vs promised tracking,
- devaluation detection,
- unclaimed reward detectors.

This section should visually resemble a clean data pipeline, not an AI-network cliché.

### 08 — FAQ

Answer trust/conversion blockers, not SEO filler:

- What exactly does KaChing do?
- Does KaChing make the payment?
- Why exact rupees instead of percentages?
- How are recommendations calculated?
- What happens when reward rules change?
- Does KaChing store full card numbers?
- How is demo data different from live recommendations?

### 09 — Final CTA

- Return visually to the orbit motif.
- Compress the story into one line: "Five seconds to stop guessing."
- CTA must be singular and clear.

## Motion system

- Default easing: cubic-bezier(0.2, 0.8, 0.2, 1).
- Long ambient motion: 8–20s cycles.
- UI transitions: 180–420ms.
- No spring overshoot on financial/trust-critical data.
- Scroll motion should reveal relationships, not just fade everything upward.
- Avoid parallax on text blocks longer than one line.

## 3D rules

- Keep geometric complexity modest; visual quality comes from silhouette, bevel, material, lighting and composition.
- No downloaded card models are required for v1.
- Use procedural generic cards to avoid issuer trademark/card-art dependence.
- Target dpr <= 1.5 by default.
- Disable/limit continuous rotation on prefers-reduced-motion.
- No physics engine for v1.

## Visual system

- Dark deep-green stage with warm cream text.
- Acid-lime/gold used as a state/value accent, not everywhere.
- Thin hairlines and controlled grain/noise are acceptable.
- Avoid generic glassmorphism cards, neon-purple gradients, floating dashboard screenshots and excessive rounded containers.
- Typography should feel editorial and confident, with large concise display text and compact technical labels.

## Performance acceptance

- Hero content remains readable before WebGL finishes.
- Canvas does not block initial CTA.
- No texture-heavy 3D in v1.
- Interactive components are dynamically isolated client components where useful.
- Mobile falls back to fewer cards and reduced effects if necessary.

## Completion gate

The page is not considered finished if it only looks polished. It must satisfy all of the following:

- Visitor can understand KaChing's core job in under 10 seconds.
- Visitor can perform at least one live value interaction.
- At least one animation demonstrates the payment decision process.
- Trust/data explanation is concrete.
- Prototype/demo values are clearly disclosed.
- No unsupported social proof or banking partnership claim exists.
- Mobile and reduced-motion states remain understandable.
