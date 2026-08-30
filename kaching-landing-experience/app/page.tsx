import CardOrbit from "@/components/CardOrbit";
import DecisionLab from "@/components/DecisionLab";
import MotionDirector from "@/components/MotionDirector";
import PosDemo from "@/components/PosDemo";
import { issuerExamples } from "@/lib/demo-data";

const anatomySteps = [
  ["Merchant + category", "The same card can win on dining and lose on travel."],
  ["Eligibility + network", "The headline rate does not matter if the purchase is excluded."],
  ["Monthly cap", "A great reward can disappear after the useful limit is exhausted."],
  ["Offer context", "A merchant offer can change the ranking for one payment moment."],
  ["Point value", "Points only matter after translating them into usable rupee value."],
  ["Change history", "A devalued card should not keep winning on stale assumptions."],
];

const trustNodes = [
  ["01", "Source records", "Issuer, network and offer inputs"],
  ["02", "Normalize", "One consistent reward contract"],
  ["03", "Verify", "Conflict + provenance awareness"],
  ["04", "Reward rules", "Deterministic transaction math"],
  ["05", "Exact ₹", "One answer before payment"],
];

const faqs = [
  ["What exactly does Cardeify do?", "Cardeify is a decision layer for a multi-card wallet. Before a purchase, it compares the payment context with the cards in the wallet and identifies the strongest value for that moment."],
  ["Does Cardeify make the payment?", "No. Cardeify is the advisory layer, not the bank or payment processor. You stay in control of the actual payment flow."],
  ["Why show rupees instead of only reward percentages?", "Because the headline percentage is not the transaction outcome. Caps, category rules, exclusions, offers and point value can change what a purchase is actually worth."],
  ["Are the figures on this page live recommendations?", "No. The interactive figures on this landing page are clearly labelled sample fixtures. A live recommendation must come from the user's wallet and current reward rules."],
  ["What happens when reward rules change?", "Cardeify's product direction includes reward-value history and devaluation detection so previously strong cards can be reassessed when their economics change."],
  ["Why should I trust the recommendation layer?", "The system is designed around normalization, source verification/provenance and deterministic reward calculations instead of asking a generative model to invent financial numbers."],
];

export default function Home() {
  return (
    <main id="main-content">
      <a className="skip-link" href="#logic">Skip to content</a>
      <MotionDirector />
      <div className="page-progress" aria-hidden="true"><i className="page-progress__bar" /></div>

      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Cardeify home"><span>CARD</span>EIFY</a>
        <div className="nav-center">
          <a href="#logic">Features</a>
          <a href="#lab">Try it</a>
          <a href="#checkout">How it works</a>
          <a href="#trust">Trust</a>
          <a href="#faq">FAQ</a>
        </div>
        <a className="nav-cta" href="#lab"><span>TRY DEMO</span><i>↘</i></a>
      </nav>

      <section className="hero-shell" id="top" aria-labelledby="hero-title">
        <div className="hero-sticky">
          <div className="hero-ambient hero-ambient--a" aria-hidden="true" />
          <div className="hero-ambient hero-ambient--b" aria-hidden="true" />

          <div className="hero-copy">
            <div className="hero-kicker"><i /> THE FIVE-SECOND CARD DECISION</div>
            <h1 id="hero-title">
              <span className="hero-line"><span className="hero-word">Know Which Card to Use</span></span>
              <span className="hero-line"><span className="hero-word hero-word--accent">Before You Pay.</span></span>
            </h1>
            <p className="hero-sub">Cardeify compares the purchase against your wallet and turns reward rules into one answer you can act on — in exact rupees, before the tap.</p>
          </div>

          <div className="hero-fan-rings" aria-hidden="true" />
          <CardOrbit />

          <div className="hero-fan-cta hero-actions">
            <a className="primary-action" href="#lab"><span>Try Cardeify</span><i>↘</i></a>
            <small>Interactive preview · sample values are clearly labelled</small>
          </div>

          <div className="hero-proofline hero-proofline--a"><span>01</span> exact ₹ value</div>
          <div className="hero-proofline hero-proofline--b"><span>02</span> before payment</div>
          <div className="hero-proofline hero-proofline--c"><span>03</span> wallet-aware</div>
          <div className="hero-scroll-cue" aria-hidden="true"><span>SCROLL TO SEE THE LOGIC</span><i /></div>
        </div>
      </section>

      <section className="catalogue-rail" aria-label="Representative issuer context">
        <div className="catalogue-rail__label">BUILT FOR THE REALITY OF A MULTI-ISSUER WALLET</div>
        <div className="catalogue-rail__names">
          {issuerExamples.map((issuer) => <span key={issuer}>{issuer}</span>)}
        </div>
        <p>Representative issuer names are shown only to explain the multi-card use case; they do not imply a partnership. Live coverage should come from the Cardeify card catalogue.</p>
      </section>

      <section className="anatomy-stage" id="logic" aria-labelledby="logic-title">
        <div className="anatomy-pin">
          <div className="anatomy-copy">
            <div className="section-index">01 / WHY THE ANSWER CHANGES</div>
            <h2 id="logic-title">A “5% card” is not a 5% answer.</h2>
            <p>The useful number only appears after the purchase meets the wallet. Cardeify resolves the variables that decide what the transaction is actually worth.</p>
            <div className="anatomy-steps" aria-label="Decision variables">
              {anatomySteps.map(([title, detail], index) => (
                <div className="anatomy-step" key={title}>
                  <span>0{index + 1}</span>
                  <div><strong>{title}</strong><p>{detail}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="anatomy-visual" aria-hidden="true">
            <div className="anatomy-rail"><i className="anatomy-rail__fill" /></div>
            <div className="anatomy-chip anatomy-chip--1"><span>MERCHANT</span><strong>Food delivery</strong><small>Dining</small></div>
            <div className="anatomy-chip anatomy-chip--2"><span>ELIGIBILITY</span><strong>Card eligible</strong><small>online · network valid</small></div>
            <div className="anatomy-chip anatomy-chip--3"><span>MONTHLY CAP</span><strong>₹738 remaining</strong><small>sample cap state</small></div>
            <div className="anatomy-chip anatomy-chip--4"><span>OFFER CONTEXT</span><strong>Category boost</strong><small>sample fixture</small></div>
            <div className="anatomy-chip anatomy-chip--5"><span>POINT VALUE</span><strong>₹ equivalent</strong><small>normalized value</small></div>
            <div className="anatomy-chip anatomy-chip--6"><span>CHANGE HISTORY</span><strong>No recent nerf</strong><small>sample status</small></div>
            <div className="anatomy-output"><span>ONE ACTIONABLE OUTPUT</span><strong>₹62</strong><small>expected sample value · before payment</small></div>
          </div>
        </div>
      </section>

      <section className="lab-stage" id="lab" aria-labelledby="lab-title">
        <div className="lab-heading" data-reveal>
          <div className="section-index">02 / TRY THE DECISION</div>
          <div className="lab-heading__grid">
            <h2 id="lab-title">Change the purchase.<br />Watch the wallet change its mind.</h2>
            <p>This interactive preview shows the product behavior directly: the recommendation responds to the payment moment rather than staying fixed because one card has the loudest headline rate.</p>
          </div>
        </div>
        <DecisionLab />
      </section>

      <section className="checkout-stage" id="checkout" aria-labelledby="checkout-title">
        <div className="checkout-copy" data-reveal>
          <div className="section-index section-index--dark">03 / AT CHECKOUT</div>
          <h2 id="checkout-title">The research loop should end before the payment starts.</h2>
          <p>Cardeify compresses wallet rules into one recommendation while the decision is still useful. Run the sample sequence to see the payment moment resolve.</p>
          <div className="checkout-principles">
            <div><span>01</span><strong>Recognise</strong><p>Merchant, amount, category and payment context.</p></div>
            <div><span>02</span><strong>Evaluate</strong><p>Eligibility, caps, offers and wallet-specific value.</p></div>
            <div><span>03</span><strong>Recommend</strong><p>One card, one rupee result, one reason.</p></div>
          </div>
        </div>
        <PosDemo />

        <div className="qr-handoff" data-reveal>
          <div className="qr-handoff__copy">
            <span className="micro-label">QR ADVISORY LOOP</span>
            <h3>Scan for context. Decide. Continue in your own payment flow.</h3>
            <p>The recommendation layer clarifies the choice without pretending Cardeify is the bank or payment processor.</p>
            <div className="qr-flow-list">
              <div><span>01</span><strong>Read payment context</strong></div>
              <div><span>02</span><strong>Resolve the wallet</strong></div>
              <div><span>03</span><strong>Hand control back to you</strong></div>
            </div>
          </div>
          <div className="qr-device" aria-label="Illustration of the Cardeify QR advisory flow">
            <div className="qr-device__top"><span>9:41</span><i /><b>•••</b></div>
            <div className="qr-app-head"><span className="qr-app-logo">C</span><div><small>CARDEIFY</small><strong>Scan merchant QR</strong></div></div>
            <div className="qr-viewfinder">
              <i className="qr-corner qr-corner--a" /><i className="qr-corner qr-corner--b" /><i className="qr-corner qr-corner--c" /><i className="qr-corner qr-corner--d" />
              <div className="fake-qr-grid" />
              <i className="qr-scanline" />
              <span className="qr-merchant-tag">FOOD DELIVERY · ₹860</span>
            </div>
            <div className="qr-sheet">
              <div className="qr-sheet__eyebrow"><span>BEST SAMPLE CARD</span><i>READY</i></div>
              <div className="qr-recommendation"><span className="qr-mini-card"><i /></span><div><strong>UPI Edge</strong><small>UPI reward rule wins</small></div><b>₹43</b></div>
              <button type="button" tabIndex={-1}>Continue in payment app <span>→</span></button>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-stage" id="trust" aria-labelledby="trust-title">
        <div className="trust-heading" data-reveal>
          <div className="section-index">04 / WHY TRUST THE NUMBER</div>
          <h2 id="trust-title">The moat is not “AI.”<br />It is disciplined financial data.</h2>
          <p>A recommendation becomes credible when the source, rule and value path can be explained. Cardeify keeps that path visible rather than hiding the number behind a black box.</p>
        </div>

        <div className="trust-proof-panel" data-reveal aria-label="Illustration of data provenance and verification">
          <div className="trust-source-stack">
            <article><span>OFFICIAL</span><strong>Issuer reward terms</strong><small>source record · timestamped</small><i>✓</i></article>
            <article><span>NETWORK</span><strong>Eligibility + rails</strong><small>normalized rule input</small><i>✓</i></article>
            <article><span>OFFER</span><strong>Merchant context</strong><small>sample live-offer record</small><i>✓</i></article>
          </div>
          <div className="trust-proof-core">
            <span>NORMALIZED RULE CONTRACT</span>
            <div className="trust-proof-code"><i>category</i><b>DINING</b><i>cap_remaining</i><b>₹738</b><i>confidence</i><b>VERIFIED</b></div>
          </div>
          <div className="trust-proof-answer"><span>DETERMINISTIC OUTPUT</span><strong>₹62</strong><small>sample transaction value</small><i>rule path available</i></div>
        </div>

        <div className="trust-pipeline" data-reveal>
          {trustNodes.map(([index, title, detail], nodeIndex) => (
            <div className={`trust-node ${nodeIndex === trustNodes.length - 1 ? "trust-node--answer" : ""}`} key={title}>
              <span>{index}</span><strong>{title}</strong><small>{detail}</small>{nodeIndex < trustNodes.length - 1 ? <i aria-hidden="true">→</i> : null}
            </div>
          ))}
        </div>

        <div className="lifecycle-intro" data-reveal><span className="section-index">05 / VALUE AFTER THE SWIPE</span><h3>The recommendation is the beginning, not the whole product.</h3></div>
        <div className="lifecycle-track">
          <article data-reveal>
            <span>BEFORE PAYMENT</span>
            <div className="lifecycle-wallet" aria-hidden="true"><i /><i /><i className="active" /><b>₹62</b></div>
            <h4>Pick the strongest card now.</h4>
            <p>Resolve the payment moment while the choice can still change.</p>
          </article>
          <article data-reveal>
            <span>AFTER PAYMENT</span>
            <div className="cashback-receipt" aria-hidden="true"><header><i>FOOD DELIVERY</i><b>₹1,240</b></header><div><span>Promised</span><strong>₹62</strong></div><div><span>Received</span><strong>₹62</strong></div><footer><i /> MATCHED</footer></div>
            <h4>Promised vs received.</h4>
            <p>Track whether expected cashback actually arrives instead of assuming it did.</p>
          </article>
          <article data-reveal>
            <span>OVER TIME</span>
            <div className="devaluation-preview" aria-hidden="true"><header><span>REWARD VALUE</span><b>-18%</b></header><div className="devaluation-chart"><i /><i /><i /><i /><i /><em /></div><footer><strong>Travel Metal</strong><span>review card strategy →</span></footer></div>
            <h4>Catch the nerf before habit wins.</h4>
            <p>Reward-value history and unclaimed-value signals help prevent an old favourite from quietly becoming expensive.</p>
          </article>
        </div>
      </section>

      <section className="faq-stage" id="faq" aria-labelledby="faq-title">
        <div className="faq-heading" data-reveal><div className="section-index section-index--dark">06 / QUESTIONS BEFORE TRUST</div><h2 id="faq-title">Finance products should answer the uncomfortable questions.</h2></div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary><span>0{index + 1}</span><strong>{question}</strong><i>+</i></summary><p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta-stage" id="cta" aria-labelledby="cta-title">
        <div className="cta-rings" aria-hidden="true"><i className="cta-ring cta-ring--a" /><i className="cta-ring cta-ring--b" /><div className="cta-card-silhouette"><i /><b>CARDEIFY</b></div></div>
        <div className="cta-copy" data-reveal>
          <div className="section-index section-index--dark">YOUR NEXT PAYMENT</div>
          <h2 id="cta-title">Stop carrying<br />the decision in your head.</h2>
          <p>Your wallet already contains the value. Cardeify&apos;s job is to surface it before the payment moment passes.</p>
          <a className="primary-action primary-action--dark" href="#lab"><span>Try the decision preview</span><i>↗</i></a>
          <small className="cta-disclosure">No sign-up required for the sample interaction.</small>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top"><span>CARD</span>EIFY</a>
        <p>Sample figures on this page are illustrative and are not financial recommendations.</p>
        <div className="footer-links"><a href="#trust">Trust</a><a href="#faq">FAQ</a><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
