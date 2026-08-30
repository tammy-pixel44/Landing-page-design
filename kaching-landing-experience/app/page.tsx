import CardOrbit from "@/components/CardOrbit";
import DecisionLab from "@/components/DecisionLab";
import PosDemo from "@/components/PosDemo";
import { issuerExamples } from "@/lib/demo-data";

const decisionVariables = ["merchant", "category", "monthly cap", "network", "minimum spend", "live offer", "point value", "devaluation"];

const faqs = [
  ["What exactly does KaChing do?", "KaChing is a decision layer for a multi-card wallet. Its core job is to compare the purchase against your cards and tell you which one creates the most value before you pay, expressed in rupees instead of only percentages."],
  ["Does KaChing make the payment?", "The landing experience should position KaChing as the advisor, not the bank or payment processor. The user stays in control and completes payment through their own payment flow."],
  ["Why show exact rupees instead of reward percentages?", "Because a headline rate is not the same thing as the value of one transaction. Caps, exclusions, category rules, point value and live offers can change what actually comes back."],
  ["How should live recommendations be calculated?", "The production experience should use KaChing's real reward engine and wallet data. The numbers in this standalone concept are deliberately labelled demo fixtures so the design never pretends to be a live financial recommendation."],
  ["What happens when a card gets devalued?", "KaChing's broader product story includes reward-value history and devaluation detection, so the recommendation layer can adapt when a card becomes less valuable instead of relying on stale headline rates."],
  ["Does KaChing need my full card number?", "The project architecture is designed around wallet/card metadata rather than storing full PAN details. The landing page should communicate this carefully and link to the final production privacy/security policy before launch."],
];

export default function Home() {
  return (
    <main>
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="KaChing home"><span>KA</span>CHING</a>
        <div className="nav-links">
          <a href="#why">Why</a>
          <a href="#lab">Try it</a>
          <a href="#how">How it works</a>
          <a href="#trust">Trust</a>
        </div>
        <a className="nav-cta" href="#cta">Get early access</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <CardOrbit />
        <div className="hero-copy">
          <span className="eyebrow">THE 5-SECOND CARD DECISION</span>
          <h1>Know the card<br />before the tap.</h1>
          <p>KaChing compares the purchase against your wallet and turns reward rules into one answer you can act on — in rupees, before you pay.</p>
          <div className="hero-actions">
            <a className="button button-light" href="#lab">Try a decision</a>
            <a className="button button-ghost" href="#how">See how it works</a>
          </div>
        </div>
        <div className="hero-proof" aria-label="Product principles">
          <div><span>01</span><strong>Exact ₹ value</strong></div>
          <div><span>02</span><strong>Before payment</strong></div>
          <div><span>03</span><strong>Wallet-aware</strong></div>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span>SCROLL TO TEST THE ENGINE</span><i /></div>
      </section>

      <section className="wallet-strip section-line" aria-labelledby="wallet-title">
        <div className="section-kicker">MULTI-CARD REALITY</div>
        <div className="wallet-copy">
          <h2 id="wallet-title">Built for the wallet you actually carry.</h2>
          <p>Not one perfect card. A mix of issuers, reward systems, categories and caps that changes the answer from purchase to purchase.</p>
        </div>
        <div className="issuer-rail" aria-label="Representative issuer names for design prototyping">
          {issuerExamples.map((issuer) => <span key={issuer}>{issuer}</span>)}
        </div>
        <p className="rail-note">Representative issuer rail for the concept. Populate supported issuers from the live KaChing catalogue before launch; this is not a partnership claim.</p>
      </section>

      <section className="problem section-pad" id="why">
        <div className="section-kicker">THE PROBLEM</div>
        <div className="problem-layout">
          <div>
            <h2>Your best card changes with the purchase.</h2>
            <p className="section-lede">The hard part is not owning a good card. It is choosing correctly while a cashier, checkout screen or QR code is waiting.</p>
          </div>
          <div className="rule-stream" aria-label="Variables that can affect a card recommendation">
            {decisionVariables.map((variable, index) => (
              <div className="rule-pill" key={variable} style={{ "--delay": `${index * 0.14}s` } as React.CSSProperties}>
                <span>{String(index + 1).padStart(2, "0")}</span>{variable}
              </div>
            ))}
            <div className="rule-output"><span>ONE OUTPUT</span><strong>₹ value now</strong></div>
          </div>
        </div>
      </section>

      <section className="lab-section section-pad" id="lab">
        <div className="section-heading">
          <div className="section-kicker">LIVE VALUE PROOF</div>
          <h2>Stop comparing percentages.<br />Compare what comes back.</h2>
          <p>Change the payment moment and watch the wallet ranking respond. This is demo data, but the interaction is the product idea in miniature.</p>
        </div>
        <DecisionLab />
      </section>

      <section className="how-section section-pad" id="how">
        <div className="how-copy">
          <div className="section-kicker">HOW IT WORKS</div>
          <h2>A decision engine at the point of payment.</h2>
          <p>Instead of sending you into another research loop, KaChing compresses the relevant rules into one recommendation while the purchase is still actionable.</p>
          <ol className="numbered-flow">
            <li><span>01</span><div><strong>Recognise the purchase</strong><p>Merchant, category, amount and payment context.</p></div></li>
            <li><span>02</span><div><strong>Check the wallet</strong><p>Eligibility, reward rules, caps and offer context.</p></div></li>
            <li><span>03</span><div><strong>Show the answer</strong><p>Best card, expected value and a reason you can understand.</p></div></li>
          </ol>
        </div>
        <PosDemo />
      </section>

      <section className="qr-section section-pad">
        <div className="section-heading compact">
          <div className="section-kicker">QR ADVISORY LOOP</div>
          <h2>Scan. Decide. Continue in your payment flow.</h2>
        </div>
        <div className="qr-flow">
          <div className="qr-step"><span>01 / SCAN</span><div className="fake-qr" aria-hidden="true">▦</div><strong>Read the payment context</strong></div>
          <div className="flow-arrow" aria-hidden="true">→</div>
          <div className="qr-step highlighted"><span>02 / RECOMMEND</span><div className="mini-card" aria-hidden="true" /><strong>Use UPI Edge · demo ₹43</strong></div>
          <div className="flow-arrow" aria-hidden="true">→</div>
          <div className="qr-step"><span>03 / HANDOFF</span><div className="phone-mark" aria-hidden="true">UPI</div><strong>You stay in control of payment</strong></div>
        </div>
      </section>

      <section className="trust-section section-pad" id="trust">
        <div className="section-heading">
          <div className="section-kicker">WHY TRUST THE NUMBER?</div>
          <h2>A recommendation is only as good as the rules underneath it.</h2>
          <p>KaChing's strongest story is not “AI”. It is the discipline around card data, reward math, verification and change detection.</p>
        </div>

        <div className="pipeline" aria-label="Conceptual KaChing data verification pipeline">
          <div className="pipe-node"><span>INPUT 01</span><strong>Source A</strong><small>Card / offer rule</small></div>
          <div className="pipe-plus">+</div>
          <div className="pipe-node"><span>INPUT 02</span><strong>Source B</strong><small>Cross-check</small></div>
          <div className="pipe-plus">+</div>
          <div className="pipe-node"><span>INPUT 03</span><strong>Official source</strong><small>When available</small></div>
          <div className="pipe-arrow">→</div>
          <div className="pipe-node strong"><span>TRUTH LAYER</span><strong>Normalize + verify</strong><small>Provenance retained</small></div>
          <div className="pipe-arrow">→</div>
          <div className="pipe-node output"><span>OUTPUT</span><strong>Exact ₹ recommendation</strong><small>Deterministic reward math</small></div>
        </div>

        <div className="trust-cards">
          <article><span>AFTER PAYMENT</span><h3>Promised vs received.</h3><p>Track whether the cashback you expected actually arrived instead of assuming the statement worked out.</p></article>
          <article><span>WHEN RULES CHANGE</span><h3>Catch the nerf.</h3><p>Reward-value history can surface devaluations so an old favourite does not keep winning on stale assumptions.</p></article>
          <article><span>VALUE LEFT BEHIND</span><h3>Find what is unclaimed.</h3><p>Milestones, fee waivers and expiring value become visible before they turn into forgotten money.</p></article>
        </div>
      </section>

      <section className="faq-section section-pad" id="faq">
        <div className="faq-title">
          <div className="section-kicker">FAQ</div>
          <h2>Questions worth answering before you trust a finance tool.</h2>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i>+</i></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta" id="cta">
        <div className="cta-orbit" aria-hidden="true"><i /><i /><i /></div>
        <div className="section-kicker">THE NEXT PAYMENT</div>
        <h2>Five seconds to<br />stop guessing.</h2>
        <p>Your wallet already has value in it. KaChing's job is to tell you where it is before the moment passes.</p>
        <a className="button button-dark" href="#top">Get early access</a>
      </section>

      <footer>
        <a className="brand" href="#top"><span>KA</span>CHING</a>
        <p>Interaction-first landing concept · Demo figures are not financial recommendations.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
