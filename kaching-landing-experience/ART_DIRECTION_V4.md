# CARDEIFY LANDING V4 — HIGH-AUTHORITY ART DIRECTION

## Role
Act simultaneously as a senior brand designer, interactive art director, product storyteller, motion director, and frontend engineer. The objective is not to make a technically impressive landing page. The objective is to make Cardeify feel like a distinct, authored financial brand whose website could sit beside top-tier design-led product companies without reading as an AI-generated template.

## Non-negotiable diagnosis
The previous Cardeify page is rejected visually. Do not preserve its composition merely because code already exists. Reuse only product logic, accessibility foundations, and useful interaction code. Rebuild the visual layer from first principles.

The rejected language includes:
- generic dark SaaS dashboards;
- repeated bordered cards and glass panels;
- grid backgrounds used as a substitute for art direction;
- random glowing gradients;
- every section using the same heading + paragraph + card grid pattern;
- Three.js primitives that look like developer placeholders;
- motion with no narrative purpose;
- tiny mono labels everywhere;
- excessive all-caps UI copy;
- fake bank-partnership logo walls;
- sections that feel visually unrelated.

## Reference principles
Use the supplied Tandym, Super Hello, and Harmonia references as PRINCIPLES, never as layouts to copy.

### Tandym principle
One hero object can bridge two visual worlds. Cards are the visual story, not decorative accessories. Use strong editorial serif typography, generous negative space, and a deliberate transition where the hero object visually connects into the following section.

### Super Hello principle
A website can be professional while still having personality. Sections may have strong background colors, unusual silhouettes, illustrated/product objects, and confident asymmetry. Avoid sterile SaaS sameness.

### Harmonia principle
The hero environment should feel composed, atmospheric, and memorable. The background is a designed scene with depth, not a flat fill behind text. The primary composition should feel calm and premium even when animated.

## Core brand idea
**One wallet. One decision.**

Cardeify exists because a wallet contains multiple reward systems that disagree with each other. The website should repeatedly show complexity resolving into one simple recommendation.

Recurring visual objects:
1. credit cards;
2. purchase / merchant context;
3. exact rupee value;
4. one selected winner.

Gold is semantic: it means value, reward, selected answer, or confirmed state. It is not generic decoration.

## Visual system
Primary dark: #171717
Deep navy: #173B64
Soft blue: #8DA5C2
Warm gold: #EAD485
Rich gold: #D4B33B
Warm white: #F6F4ED
Cool pale blue: #DDE9EA
Ink: #172333

Typography:
- Display/editorial: Playfair Display or equivalent high-contrast serif.
- Interface/body: Geist.
- Mono only for transaction data, never as the dominant design voice.

Corners:
- Large environmental panels can use 28–44 px radii.
- Small UI controls use 10–16 px.
- Do not make every element a pill.

## HERO — mandatory composition
The hero must be the strongest screen.

Structure:
- quiet transparent/dark navigation;
- centered editorial headline;
- short supporting line;
- purchase-context chip;
- a large Three.js spinning carousel/fan of detailed credit cards occupying the middle/lower hero;
- one front-most card becomes the visual winner;
- recommendation readout below/inside the carousel;
- custom atmospheric background with depth.

Headline direction:
**Every card promises rewards.**
**Cardeify finds the one that wins.**

The hero cards must continuously rotate smoothly and slowly, like a premium physical display. Avoid carnival spinning, slot-machine motion, or fast perpetual rotation.

Card construction requirements:
- landscape credit-card proportions;
- real thickness;
- rounded bevel;
- metal/contactless/chip details;
- high-resolution procedural face textures;
- restrained material variation;
- depth-aware scale and lighting;
- front card visually emphasized by depth, not a neon outline;
- each card has a plausible product role: Travel, Cashback, UPI, Dining, Everyday, Premium, Online, Fuel.

## Background direction
Never use a plain solid hero background.

Create an authored environment using:
- large blurred navy/gold atmospheric forms;
- curved contour bands that visually echo the card carousel;
- one large low-opacity illustrated/abstract financial motif;
- fine grain;
- subtle depth/parallax;
- no generic Cartesian grid.

The background should still leave enough visual quiet around the headline.

## Section choreography
### 01 — Hero / resolve the wallet
Spinning card carousel. A merchant context changes the meaning of the wallet. One card wins.

### 02 — Wallet bridge
The card object visually crosses from the dark hero into a pale-blue section, inspired by Tandym's object bridging two worlds. Explain: many cards, many rule systems, one Cardeify layer.

### 03 — Problem / 5% is not the answer
Use a giant editorial `5%` as the main graphic. As the user scrolls, caps, exclusions, point value, and merchant rules subtract certainty. Resolve visually to an exact `₹` result. This section should be warm gold/cream and primarily typographic, not a card grid.

### 04 — Interactive Decision Lab
Use the existing working decision logic, but present it as one composed product instrument rather than a dashboard. The selected card should be visually physical and rankings secondary.

### 05 — Checkout / POS
A highly composed physical checkout scene. The terminal is the object; surrounding text is minimal. Card insertion is user-triggered. The device screen visibly resolves the recommendation.

### 06 — QR / mobile advisory
A pale editorial section with a phone object and a strong diagonal/asymmetric composition. Show scan -> recommendation -> handoff.

### 07 — Trust / explain the rupee
Do not show a generic flowchart. Let the visitor inspect one recommendation: source, rule, calculation. Provenance should look like a financial receipt / evidence trail.

### 08 — Value after payment
Three different visual moments, not three identical cards: cashback receipt, devaluation chart, unclaimed-value recovery.

### 09 — FAQ
Quiet and editorial. Reduce visual noise here.

### 10 — Final CTA
Return to the hero's card motif. Cards settle from motion into a clean stack. Message: `Your wallet already has the answer. Cardeify finds it.`

## Motion ownership
GSAP + ScrollTrigger:
- macro scroll choreography;
- pinned narrative transitions;
- hero-to-wallet bridge;
- typography reveals;
- major object continuity.

Three.js / React Three Fiber:
- hero card carousel;
- physical card depth and material response;
- subtle camera/pointer response.

Anime.js:
- Decision Lab ranking/result transitions;
- POS screen state changes;
- small local feedback.

CSS:
- hover/focus only;
- no complex narrative animation.

## Motion personality
Use smooth, weighted motion: slow-in/slow-out, mechanical precision, small overshoots only for UI confirmation. No float-everything loops. No constant bobbing of every object. Continuous hero rotation is the one major ambient movement.

## Production constraints
- 60fps target on modern desktop.
- reduced-motion support must produce a fully understandable static composition.
- mobile hero must still show the carousel, reduced to fewer visible cards if necessary.
- no unsupported financial claims.
- all sample values labelled as illustrative/demo fixtures.
- issuer names never imply partnership.
- keyboard/focus semantics remain intact.
- no interaction may require WebGL to understand the product.

## Review test
Before considering a section finished, ask:
1. Would this section still be recognizable as Cardeify with the logo removed?
2. Does it have one dominant visual idea rather than five small UI boxes?
3. Does the motion explain a state change?
4. Is the composition asymmetric or editorial enough to avoid template sameness?
5. Does it visually connect to the section before or after it?
6. Is gold being used semantically?
7. Would a senior brand designer remove anything as decorative noise?

If the answer to any of these is no, redesign the section before adding more effects.
