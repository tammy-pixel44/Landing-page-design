# KaChing Landing — High-Authority Redesign Prompt

## Role

Act as a principal interactive art director, senior product designer, motion designer, and staff front-end engineer working on a premium Indian fintech product. You are not building a generic SaaS landing page. You are designing one continuous, cinematic, product-led experience that earns trust while demonstrating a real decision engine.

## Mission

Rebuild the KaChing landing page so it feels authored, expensive, intentional, and memorable while remaining fast, legible, accessible, and truthful.

KaChing's core promise is simple: before a user pays, tell them which card in their wallet creates the most value for this exact purchase, in rupees rather than vague percentages. The broader product story includes QR advisory, cashback tracking, devaluation detection, unclaimed-reward detection, wallet optimisation, live offers, and cross-source-verified card/offer data.

The visitor must not feel as though they are scrolling through a checklist of disconnected sections. The page must feel like one system transforming as the story advances.

## Non-negotiable creative thesis

**One object. One decision. One evolving story.**

The credit card is the recurring physical object. The exact rupee answer is the recurring information object. As the user scrolls, the card wheel must evolve into a selected card, that selected card must become the payment object, and the payment object must resolve into the trust/data story. Do not reset the visual language at every section.

## Experience standard

The work should feel closer to a high-end product film that happens to be interactive than to a normal marketing page.

The page must:

1. communicate the product job within five seconds;
2. give the visitor a meaningful interaction before asking for conversion;
3. use motion to explain ranking, selection, payment state, or verification;
4. use restrained gamification: tactile feedback, satisfying state changes, no casino language or dopamine spam;
5. build financial trust through explicit logic and data provenance;
6. remain usable with reduced motion, touch, keyboard, and without WebGL;
7. maintain one consistent visual grammar from hero through CTA;
8. never invent partnerships, user counts, savings totals, testimonials, awards, or live financial precision.

## Visual direction

Create an editorial-fintech visual system with:

- nearly-black forest green as the primary stage;
- warm mineral cream as the light stage;
- a controlled chartreuse value accent;
- muted metal / graphite / brass for physical card details;
- strong typography with a modern grotesk voice;
- large negative space;
- hairline rules used selectively, not as a grid around every block;
- soft atmospheric light, depth haze, subtle grain, and real material contrast;
- disciplined radius usage: do not make every container a rounded card;
- asymmetric compositions and strong focal hierarchy;
- no purple/blue AI gradients, generic glassmorphism, floating dashboard mockups, excessive pills, decorative blobs, or template-like bento grids.

## Typography rules

- Use one primary grotesk family and one mono/technical voice.
- Hero headlines must be concise and sculptural, not multi-paragraph slogans.
- Never use giant type simply because a section needs visual impact.
- Use scale contrast: one dominant statement, one supporting sentence, one technical annotation layer.
- Paragraphs should max out around 60–70 characters per line.
- Technical labels use mono styling, uppercase sparingly, and generous tracking.

## Motion architecture

Use three tools deliberately, with clear ownership:

### GSAP + ScrollTrigger

GSAP owns macro choreography and scroll state.

Use it for:

- hero intro sequencing;
- sticky/pinned hero progression;
- scroll-linked 3D scene progress;
- section transitions;
- card-selection choreography;
- pinned decision-anatomy storytelling;
- horizontal lifecycle narrative if used;
- page progress indicator;
- nav state changes;
- final CTA resolution.

Use `gsap.matchMedia()` for desktop/mobile/reduced-motion variants. Use ScrollTrigger scrub only when a user's scroll should map meaningfully to a state transition. Do not scrub ordinary text opacity for hundreds of pixels.

### Anime.js

Anime.js owns local, user-triggered micro-interactions.

Use it for:

- Decision Lab card result transitions;
- exact-rupee number changes;
- scenario-control feedback;
- POS terminal state animation;
- QR scan feedback;
- subtle button/indicator responses;
- micro stagger sequences inside an already-visible component.

Do not let Anime.js and GSAP animate the same property on the same element.

### Three.js / React Three Fiber

Three.js owns physical product objects and spatial continuity.

Use it for:

- a detailed but efficient procedural card system;
- card thickness, bevel, chip, micro-lines, contactless marks, edge highlights and material variation;
- slow controlled orbiting;
- depth sorting and perspective;
- scroll-driven transition from wallet orbit → evaluated stack → one selected card;
- restrained pointer parallax;
- lighting that feels photographic rather than game-like.

Do not use WebGL for content that is clearer as HTML. Do not use physics. Do not load heavy textures merely to signal quality.

## Hero choreography

The hero is a sticky cinematic stage, not a static masthead.

At load:

1. navigation resolves first;
2. the primary line appears with measured character/line choreography;
3. cards emerge from darkness around the message;
4. the exact-value / before-payment annotations settle into place;
5. the CTA becomes available without waiting for the 3D animation.

As the user scrolls through the hero:

- the card orbit slows;
- cards separate enough to become legible objects;
- one card moves forward and the others recede;
- a small exact-rupee recommendation state appears;
- the scene visually hands off into the next narrative section.

The scroll should feel like advancing a product story, not like moving a camera randomly.

## Page architecture

### Act 01 — The five-second decision

Hero. One statement. One animated wallet. One clear CTA.

Primary copy direction:

`Your cards disagree. KaChing decides.`

Support:

`Before you pay, KaChing compares the purchase against your wallet and shows the best value in rupees.`

Keep "Know the card before the tap" available as a secondary campaign line, not necessarily the only hero headline.

### Act 02 — Why the answer changes

Create a pinned decision-anatomy sequence.

Show hidden variables entering the calculation one at a time:

- merchant/category;
- eligibility/network;
- monthly cap/progress;
- offer context;
- point value;
- devaluation/change history.

These should converge into one output: exact rupees now.

The visual must demonstrate causality rather than animate labels for decoration.

### Act 03 — Prove it

Decision Lab.

The user changes merchant context and amount. Rankings change. The winner moves decisively. The exact rupee value updates with a compact numerical animation. Show why it wins and the delta to #2.

This section must feel like a real product fragment, not a marketing calculator skin.

### Act 04 — At the payment moment

Use one composed checkout scene rather than several disconnected boxes.

Show:

- merchant context;
- wallet check;
- card selection;
- POS/card action;
- optional QR advisory handoff.

The selected card from the previous story should visually reappear here. POS animation must be user-triggered.

### Act 05 — Why the number deserves trust

Build a clean provenance / reward-engine schematic.

`multiple sources → normalize → verify/provenance → reward rules → exact ₹`

Then branch into:

- promised vs received cashback;
- devaluation detection;
- unclaimed rewards.

Do not turn this into a neural-network graphic.

### Act 06 — Value after the swipe

Show that KaChing remains useful after payment through one fluid lifecycle strip or horizontal narrative, not three generic feature cards.

Before payment → after payment → over time.

### Act 07 — Objections + conversion

FAQ should answer trust blockers. Final CTA returns to the original card/orbit motif so the page closes where it began.

## Composition rules

- Avoid repeating identical section headers and two-column layouts.
- No more than two consecutive sections may use the same background tone.
- Use full-bleed stages when motion needs space.
- Use narrow editorial text columns when trust/explanation matters.
- Give interactive elements visual priority over prose.
- Do not put borders around everything.
- Keep the page rhythm varied: cinematic stage → editorial explanation → live product interaction → composed scene → technical proof → restrained close.

## Interaction rules

- Every clickable element must have hover, focus, active, and touch states.
- Interactive motion must feel immediate: 120–260 ms for local response, longer only for deliberate sequences.
- Never disable navigation while animations run.
- Amount inputs must remain accessible and editable.
- No cursor-hijacking.
- No scroll-jacking.
- No mandatory sound.
- No animation may hide the only copy explaining a financial concept.

## 3D quality bar

Cards must not look like low-poly rectangles.

Each procedural card should include:

- 85.60:53.98-ish visual proportion;
- rounded silhouette;
- actual thickness;
- believable bevel/edge highlight;
- layered chip detail;
- subtle embossed/debossed rails;
- contactless glyph or equivalent abstract signal;
- different roughness/metalness values;
- controlled front-face graphic details;
- coherent rear/edge treatment;
- shadow/depth separation;
- no copied real issuer card art.

Render at sensible DPR, cap complexity, and gracefully reduce the number of cards/effects on smaller devices.

## Performance and implementation discipline

- Next.js App Router, React 19, TypeScript strict.
- Keep the page server-rendered where possible; isolate animation/3D into client components.
- Register ScrollTrigger only client-side.
- Clean up every GSAP context / ScrollTrigger and Anime.js animation.
- Do not create a per-section animation framework if simple selectors and scoped refs are enough.
- Avoid layout thrash. Prefer transforms and opacity.
- Use `will-change` only on genuinely animated elements.
- WebGL hero must not block semantic hero content or CTA.
- Respect `prefers-reduced-motion` with static composition and immediate state changes.
- Target smooth interaction on typical laptop integrated graphics and modern midrange phones.

## Truth and compliance rules

- Demo card names and figures must be labelled demo fixtures.
- Issuer names may be used only as representative catalogue context, never partnership proof.
- Do not imply KaChing executes payments unless production architecture explicitly supports that claim.
- Do not claim full live accuracy unless connected to the production reward engine.
- Never expose or store full PAN data in the landing experience.

## Quality rejection criteria

Reject and redo the work if any of the following are true:

- it looks like a Framer/Webflow template;
- every section is a headline plus cards;
- motion consists mostly of fades and upward translates;
- the Three.js scene could be removed without changing the product story;
- animation is impressive but does not explain KaChing;
- the page uses excessive rounded rectangles;
- user attention is split across several equal focal points;
- the hero takes more than a few seconds to explain what KaChing does;
- mobile becomes a shrunken desktop composition;
- scroll effects create nausea or hide information;
- typography feels oversized without hierarchy;
- product trust is replaced with "AI" marketing language;
- unverified marketing claims appear anywhere.

## Acceptance gate

The redesign is complete only when:

- the hero, scroll story, Decision Lab, checkout scene, trust engine and CTA feel visually related;
- the visitor can state what KaChing does after the hero;
- at least one scroll-driven animation demonstrates real decision logic;
- at least one user-triggered Anime.js interaction demonstrates product response;
- Three.js cards materially support the explanation;
- the exact-rupee answer is the visual motif throughout;
- the page passes TypeScript and production build checks;
- reduced-motion and mobile versions remain coherent;
- no fake social proof or unsupported financial claim exists.

When forced to choose between more effects and stronger hierarchy, choose stronger hierarchy. When forced to choose between novelty and product clarity, choose product clarity. When forced to choose between a generic polished layout and a distinctive coherent interaction, choose the coherent interaction.