# KaChing Landing Experience

A standalone, interaction-first marketing concept for KaChing.

This folder is intentionally isolated from any existing application code. The experience is designed to explain KaChing by letting visitors *feel* the product decision loop instead of reading a stack of generic feature sections.

## Core story

KaChing answers one urgent question: **which card should I use right now?**

The landing page turns that into a sequence of interactive proofs:

1. A smooth Three.js card orbit in the hero.
2. A live decision lab that ranks example cards in exact rupees.
3. A POS-style recommendation scene that animates a card into the terminal.
4. A QR/advisor flow that explains that KaChing recommends; the user completes payment in their own payment app.
5. A trust/data section explaining verified inputs, deterministic reward math, cashback tracking, devaluation alerts, and unclaimed rewards.
6. FAQ and final CTA.

## Important prototype rule

All reward figures in this concept are clearly marked as demo data. Production recommendations must be wired to KaChing's real reward engine and live card catalogue before launch.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Stack

- Next.js 16
- React 19
- TypeScript
- Three.js + React Three Fiber
- Motion
- Plain CSS design system (keeps the prototype self-contained)

See `EXECUTION_BRIEF.md` and `EXPERIENCE_PLAN.md` for the product/interaction rationale and asset plan.
