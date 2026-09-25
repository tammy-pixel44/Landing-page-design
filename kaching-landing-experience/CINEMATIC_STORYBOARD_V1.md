# Cardeify — Cinematic 3D Storyboard V1

## Core direction

The website is one continuous transaction story, not a stack of unrelated feature sections.

One **gold Cardeify card** is the guide object. It starts inside the hero wallet, becomes the selected card, leaves the fan, travels through the product story, proves why it is the best move for the purchase, and returns to the wallet at the end.

The gold card is semantic: **selected value / winning move**. It is not decorative.

No splats. No voxel breakup. No random floating particles. No generic glassmorphism dashboard language.

---

## 00 — Loader

**Visual:** five thin card silhouettes are initially separated, compress into one wallet stack while a restrained progress line moves beneath the Cardeify wordmark.

**Exit:** the loader clears completely. Only then does the hero animation begin.

**Performance:** the loader waits for document load + fonts, with a short minimum hold to avoid a flash. It does not fake a numerical percentage.

---

## 01 — Hero / wallet opens

Reference frame: “Your cards. Their best move.”

1. All five cards begin perfectly stacked.
2. The stack moves upward a few pixels.
3. Cards fan outward from the same lower pivot.
4. The outer cards arrive first; the center cards settle a fraction later.
5. A small, weighted overshoot gives the motion a physical “pop,” never a springy toy effect.
6. The fan becomes still. Pointer movement only produces a very small lighting/parallax response.

The hero must remain readable with WebGL disabled.

### Card set

- Everyday — deep navy
- Dining — mid navy
- Travel — dark navy / steel
- Online — gold
- Flex — pale blue

Cards have real thickness, chip geometry, restrained clearcoat, soft edge highlights, and high-resolution procedural face textures.

---

## 02 — Wallet resolves to one card

As the hero scrolls away, the gold **Online** card becomes the guide card.

The hero copy exits upward while the guide card visually detaches from the fan. A persistent 3D card layer continues the same object through the rest of the page.

Narrative: “Many cards. One decision.”

3D object: the selected card only. Keep the scene quiet.

---

## 03 — Reward math / rules

Background becomes warm gold / cream.

The guide card crosses a large typographic “5%” field. Four rule gates appear around it:

- monthly cap
- merchant category
- point value
- live offer / CLO context

The card does not collide with floating UI boxes. Instead, each rule is treated as an editorial checkpoint that modifies the visible rupee value.

End state: a single exact rupee value.

---

## 04 — Decision Lab

The guide card moves to one side and becomes the physical result object while the purchase context changes.

The UI remains secondary. The card should feel like the answer, not one tile in a dashboard.

Interaction:
- user changes merchant / amount
- rankings update locally
- guide card material / label transitions to the new winner
- transition should cross-fade texture/material state rather than destroy/recreate the scene

---

## 05 — Checkout / 3D POS

This is the strongest 3D section after the hero.

A purpose-built low-poly but premium POS terminal appears as a real object:
- matte charcoal shell
- slightly inset glass screen
- physical card slot
- contactless mark
- small keypad
- subtle edge wear / roughness variation

The guide card approaches the terminal on a controlled arc, rotates into the same perspective as the slot/contactless plane, and pauses before payment.

The terminal screen resolves:
1. purchase context
2. eligible wallet
3. caps + reward rules
4. selected card
5. expected rupee return

No casino-style light chase. One soft confirmation pulse only.

---

## 06 — CLO / offer combination

The card exits the terminal into a merchant-offer scene.

3D direction:
- merchant receipt / placard as a thin physical plane
- issuer reward layer and merchant offer layer slide into alignment
- when compatible, they lock together into one combined value
- incompatible offers visibly pass behind instead of turning into error modals

Narrative: “The card rate is only one layer. Cardeify also checks what can stack.”

---

## 07 — QR / mobile handoff

The card travels past a phone/QR object, not into a second dashboard.

The phone is a supporting object. The guide card stays visually dominant.

Sequence:
scan context → resolve winner → hand control back to the user's payment app.

---

## 08 — Trust / evidence

The guide card rotates edge-on and becomes a visual divider beside a receipt-like evidence trail.

The evidence is deterministic:
source → normalized rule → cap state → point value → exact rupee result.

No AI-orb motif and no generic flowchart.

---

## 09 — After payment

The guide card passes through three short outcomes:
- cashback verified
- reward devaluation detected
- unclaimed value recovered

These should be three different visual moments, not three equal feature cards.

---

## 10 — Final CTA / return to wallet

The guide card returns to center.

The other four cards reappear from behind it and settle into a clean compact stack — the inverse of the opening fan.

Final line:
“Your wallet already has the answer. Cardeify finds it.”

---

## Motion rules

- Use GSAP ScrollTrigger for macro page choreography.
- Use React Three Fiber for card and physical 3D objects.
- Use Anime.js only for local UI state changes.
- Do not animate everything at once.
- One dominant motion per section.
- Prefer 0.7–1.2 s weighted transitions.
- Scroll-controlled movement uses scrubbed progress, not independent autoplay.
- Pointer response is tiny and never changes layout.

---

## Rendering / performance budget

Current production direction follows the official Three.js / React Three Fiber guidance:

- keep draw calls low; reuse geometry and materials
- procedural card textures are created once and disposed correctly
- hero rendering pauses when it is off-screen
- the persistent guide-card canvas uses demand rendering and invalidates only while scrolling / settling
- DPR is capped instead of blindly using full device pixel ratio
- avoid expensive post-processing until the base lighting/materials are already good
- reduced-motion remains a complete static experience
- mobile uses fewer visible hero cards if needed rather than lowering readability

Target: stable 60 fps on a modern laptop and graceful quality reduction on weaker devices.

---

## V1 implementation scope

This branch implements the foundation first:

1. custom loader
2. reference-aligned hero copy and layout
3. real 3D card stack → fan choreography
4. no star decoration
5. persistent selected gold card travelling through existing sections
6. section anchor system for future scene choreography
7. performance-aware render loops

Next visual pass should build the authored 3D POS object and then redesign each downstream section around the guide-card path rather than adding more effects.
