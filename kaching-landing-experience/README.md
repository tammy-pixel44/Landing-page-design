# Cardeify Landing Experience

A production-oriented, interaction-first landing page for Cardeify: a multi-card wallet decision layer that helps users understand which card creates the strongest value for a purchase before payment.

## Experience

The page is built as one continuous product story rather than a checklist of disconnected sections:

1. A Three.js fan of detailed generic credit cards inspired by the supplied hero reference.
2. A scroll-driven decision anatomy that explains why a headline reward percentage is not the final transaction value.
3. An interactive decision console with clearly labelled sample card/reward fixtures.
4. A physical POS-style checkout demonstration driven by Anime.js.
5. A Cardeify QR advisory phone preview that explicitly hands payment control back to the user.
6. A trust/provenance module showing source records, normalization, verification, deterministic reward rules and the final rupee output.
7. Product-quality lifecycle previews for recommendation, cashback verification and reward devaluation.
8. Trust-first FAQ and final conversion CTA.

## Visual system

The landing page uses the Cardeify app palette derived from the supplied billing UI:

- charcoal: `#1A1A1A`, `#262626`
- navy: `#173B64`, `#0C1F35`
- warm gold: `#EAD485`, `#F4DE8D`, `#D4B33B`
- blue-grey: `#8DA5C2`
- off-white: `#F6FAFF`

## Production safeguards

- Sample/demo financial values are never presented as live recommendations.
- Representative issuer names do not imply partnerships.
- Reduced-motion and responsive layouts are supported.
- A skip link, semantic section labelling and visible focus states are included.
- The WebGL hero is decorative; the product message and CTA do not depend on it.
- Below-the-fold sections use CSS rendering containment for improved initial rendering cost.
- Security-oriented response headers are configured in `next.config.ts`.
- Production metadata and an app icon are included.
- GitHub Actions runs dependency installation, TypeScript validation and a production Next build on pushes to `main`.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production check:

```bash
npm run typecheck
npm run build
npm start
```

## Stack

- Next.js 16
- React 19
- TypeScript
- Three.js + React Three Fiber / Drei
- GSAP + ScrollTrigger
- Anime.js
- Plain CSS design system

The interactive figures are sample fixtures. A live Cardeify deployment should replace them with data from the product's real wallet/reward services when those endpoints are available.
