# Cardeify — Cinematic Storyboard V2

## Design rule

The site is one continuous product story. The same physical card is the protagonist.

No splats. No voxels. No particle explosions. No glassmorphism dashboards. No random light trails. No generic sci-fi HUD. No feature-card grids masquerading as art direction.

The supplied hero frame is the visual master:
- charcoal/near-black environment
- restrained navy / soft blue / warm gold palette
- centered typography
- physical credit cards with real thickness
- calm studio lighting
- clean negative space
- high contrast
- minimal ornament

Gold is semantic: selected value / winning move.

The site should feel like a premium product film translated into a scroll experience.

---

## 00 — Loader / Assemble the wallet

Five thin card silhouettes appear as separated layers and compress into one compact wallet stack.

The loader should not show a fake numerical percentage.

Exit transition:
loader stack -> hero stack -> fan opens.

No visible cut between loader and hero.

---

## 01 — Hero / Your cards. Their best move.

Reference state: the supplied Cardeify frame.

Sequence:
1. five cards begin stacked
2. stack lifts slightly
3. cards fan outward evenly from one lower pivot
4. outer cards arrive first
5. center cards settle fractionally later
6. very small weighted overshoot
7. final fan becomes still

No card should already be dramatically pulled out.

Hero copy:
Your cards.
Their best move.

Support:
Find which card to use, which offers combine, and what you could get back.

CTA:
Join the waitlist
See how it works

---

## 02 — The choice / One purchase changes the winner

A small purchase context enters:
Online purchase · ₹5,000

The fan subtly evaluates:
- cards shift only slightly in depth
- no dashboard appears
- no floating labels around every card

The gold Online card is selected.

Sequence:
fan -> slight separation -> gold card rises -> other cards settle backward -> gold card becomes the guide object

This is the first major continuation frame after the hero.

---

## 03 — Purchase context / What are you paying for?

The selected card leaves the hero and enters a quieter environmental composition.

Use restrained real-world purchase cues, not icon tiles:
- dining: receipt / menu slip
- travel: luggage tag / boarding fragment
- online: parcel label
- fuel: receipt / pump cue
- bills: statement strip

The card moves through these categories while the active purchase context becomes dominant.

Message:
The best card depends on what you are buying.

---

## 04 — Reward engine / 5% is not the answer

Background transitions to a controlled warm cream / gold editorial environment.

Large typography:
5%

The guide card passes through four checkpoints:
- cap
- eligibility
- point value
- merchant rules

Each checkpoint changes the visible value.

No floating UI boxes.

End state:
exact rupee value, clearly labelled illustrative.

---

## 05 — Offer stacking / Rewards can combine

The selected card arrives center-frame.

Thin physical layers approach it:
- issuer reward
- merchant offer
- CLO
- platform offer

Compatible layers snap into alignment behind the card.
Incompatible layers pass away.

The value resolves as stacked components into one total expected value.

Visual language:
precision industrial/product animation.

---

## 06 — The answer / This is your best move

Everything becomes quiet.

One selected physical card.
One clear result.

Best card for this purchase
Online
₹___ back
short deterministic reason

This is an intentional pause.

---

## 07 — Checkout / Physical POS

Second major 3D set-piece after the hero.

Build a premium POS terminal:
- matte graphite shell
- soft bevels
- inset glass screen
- physical keypad
- contactless mark
- card slot
- subtle material variation

The guide card approaches on a controlled arc and pauses in front of the terminal.

Terminal resolves:
1. purchase context
2. wallet eligibility
3. caps + rules
4. selected card
5. expected rupee value

Card taps / inserts.
One subtle confirmation pulse only.

---

## 08 — After payment / Did you receive it?

The checkout environment transitions into a physical receipt / statement composition.

Show:
Expected reward
Received reward
Matched / mismatch

Then optionally show a second transaction where the reward differs and Cardeify flags the discrepancy.

No giant success icon.

---

## 09 — Wallet intelligence / Long-term value

Camera pulls back.

The card travels over a restrained physical timeline:
Jan -> Feb -> Mar -> Apr

Show accumulated value.

Introduce two long-term intelligence concepts:
- reward devaluation detected
- unclaimed value found

Avoid a conventional analytics dashboard.

---

## 10 — Trust / Why should I believe the number?

Quietest section.

The card rests on one side.

Beside it is a premium receipt/document evidence trail:
issuer terms
reward rule
cap status
offer source
calculation
last updated

Resolve:
source -> rule -> calculation -> rupee result

No AI-orb motif.
No generic flowchart.

---

## 11 — Final CTA / Return to wallet

Mirror the opening.

The gold guide card returns.
The other four cards appear behind it.
The fan closes into one clean compact wallet stack.

Final line:
Your wallet already has the answer.
Cardeify finds it.

Join the waitlist

---

## FAQ + Footer

Static and readable.

No forced 3D.

---

## Key concept frames to approve before deep implementation

1. Hero resting state
2. Winner-selection state
3. Purchase-context environment
4. Reward-engine environment
5. Offer-stacking state
6. Final recommendation state
7. POS state
8. Reward verification state
9. Trust state
10. Return-to-wallet CTA state

Only after these key states are approved should we spend time on the interpolation / scroll choreography between them.

---

## Visual quality checklist

Before accepting any generated concept:
- Does it still look like the supplied Cardeify hero?
- Is there one dominant visual idea?
- Is the card still physically believable?
- Is the composition calm rather than busy?
- Is gold semantic rather than decorative?
- Are there fewer than three competing visual focal points?
- Could the scene plausibly be implemented in Three.js without cheating?
- Does it avoid generic AI visual language?
- Does it leave intentional negative space for typography?
- Would removing one decorative element make it stronger? If yes, remove it.

