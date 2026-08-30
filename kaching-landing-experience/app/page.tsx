import CardOrbit from "@/components/CardOrbit";
import DecisionLab from "@/components/DecisionLab";
import MotionDirector from "@/components/MotionDirector";
import PosDemo from "@/components/PosDemo";
import { issuerExamples } from "@/lib/demo-data";

const anatomySteps = [
  ["Merchant + category", "The same card can win on dining and lose on travel."],
  ["Eligibility + network", "The headline rate does not matter if this purchase is excluded."],
  ["Monthly cap", "A great reward can disappear after the useful limit is exhausted."],
  ["Offer context", "A live merchant offer can change the ranking for one payment moment."],
  ["Point value", "Points only matter after translating them into usable value."],
  ["Change history", "A devalued card should not keep winning on stale assumptions."],
];

const trustNodes = [
  ["01", "Multiple sources", "Official and independent inputs"],
  ["02", "Normalize", "One consistent reward contract"],
  ["03", "Verify", "Conflict + provenance awareness"],
  ["04", "Reward rules", "Deterministic transaction math"],
  ["05", "Exact ₹", "One answer before payment"],
];

const faqs = [
  ["What exactly does KaChing do?", "KaChing is a decision layer for a multi-card wallet. Before a purchase, it compares the payment context against the cards in your wallet and identifies the strongest value for that moment."],
  ["Does KaChing make the payment?", "The product story here positions KaChing as the advisor, not the bank or payment processor. You stay in control of the actual payment flow."],
  ["Why show rupees instead of only reward percentages?", "Because the headline percentage is not the transaction outcome. Caps, category rules, exclusions, offers and point value can change what a purchase is actually worth."],
  ["Are the figures on this page live recommendations?", "No. The interactive figures in this standalone landing concept are deliberately labelled demo fixtures. Production recommendations should come from KaChing's real wallet and reward engine."],
  ["What happens when reward rules change?", "The broader KaChing product includes reward-value history and devaluation detection so the recommendation system can react when a previously strong card becomes less valuable."],
  ["Why should I trust the recommendation layer?", "The project architecture is built around normalization, source verification/provenance and deterministic reward calculations rather than asking an AI model to invent financial numbers."],
];

export default function Home() {
  return (
    <main>
      <MotionDirector />
      <div className="page-progress" aria-hidden="true"><i className="page-progress__bar" /></div>

      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="KaChing home"><span>KA</span>CHING</a>
        <div className="nav-center">
          <a href="#logic">Logic</a>
          <a href="#lab">Demo</a>
          <a href="#checkout">Checkout</a>
          <a href="#trust">Trust</a>
        </div>
        <a className="nav-cta" href="#cta"><span>Get early access</span><i>↗</i></a>
      </nav>

      <section className="hero-shell" id="top">
        <div className="hero-sticky">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-ambient hero-ambient--a" aria-hidden="true" />
          <div className="hero-ambient hero-ambient--b" aria-hidden="true" />
          <CardOrbit />

          <div className="hero-copy">
            <div className="hero-kicker"><i /> THE FIVE-SECOND CARD DECISION</div>
            <h1 aria-label="Your cards disagree. KaChing decides.">
              <span className="hero-line"><span className="hero-word">Your cards disagree.</span></span>
              <span className="hero-line"><span className="hero-word hero-word--accent">KaChing decides.</span></span>
            </h1>
            <p className="hero-sub">Before you pay, KaChing compares the purchase against your wallet and shows the best value in rupees—not just a reward percentage.</p>
            <div className="hero-actions">
              <a className="primary-action" href="#lab"><span>Try a live decision</span><i>↘</i></a>
              <a className="secondary-action" href="#logic">See the logic</a>
            </div>
          </div>

          <div className="hero-side-note hero-side-note--left">
            <span>PAYMENT MOMENT</span>
            <strong>Food delivery</strong>
            <small>₹1,240 · demo context</small>
          </div>

          <div className="hero-scroll-result">
            <span>SELECTED FROM WALLET</span>
            <div><strong>Everyday Plus</strong><b>₹62</b></div>
            <small>demo expected value</small>
          </div>

          <div className="hero-proofline hero-proofline--a"><span>01</span> exact ₹ value</div>
          <div className="hero-proofline hero-proofline--b"><span>02</span> before payment</div>
          <div className="hero-proofline hero-proofline--c"><span>03</span> wallet-aware</div>

          <div className="hero-scroll-cue" aria-hidden="true"><span>SCROLL TO RESOLVE THE WALLET</span><i /></div>
        </div>
      </section>

      <section className="catalogue-rail" aria-label="Representative issuer context">
        <div className="catalogue-rail__label">A MULTI-ISSUER WALLET IS THE PROBLEM SPACE</div>
        <div className="catalogue-rail__names">
          {issuerExamples.map((issuer) => <span key={issuer}>{issuer}</span>)}
        </div>
        <p>Representative issuer context for the concept—not a partnership claim. Production coverage should come from the live KaChing catalogue.</p>
      </section>

      <section className="anatomy-stage" id="logic">
        <div className="anatomy-pin">
          <div className="anatomy-copy">
            <div className="section-index">01 / WHY THE ANSWER CHANGES</div>
            <h2>A “5% card” is not a 5% answer.</h2>
            <p>The useful number only appears after the purchase meets the wallet. Scroll through the variables KaChing has to resolve before a recommendation deserves confidence.</p>

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
            <div className="anatomy-chip anatomy-chip--3"><span>MONTHLY CAP</span><strong>₹738 remaining</strong><small>before cap</small></div>
            <div className="anatomy-chip anatomy-chip--4"><span>OFFER CONTEXT</span><strong>Category boost</strong><small>demo fixture</small></div>
            <div className="anatomy-chip anatomy-chip--5"><span>POINT VALUE</span><strong>₹ equivalent</strong><small>normalized</small></div>
            <div className="anatomy-chip anatomy-chip--6"><span>CHANGE HISTORY</span><strong>No recent nerf</strong><small>reward value stable</small></div>
            <div className="anatomy-output">
              <span>ONE ACTIONABLE OUTPUT</span>
              <strong>₹62</strong>
              <small>expected demo value · before payment</small>
            </div>
          </div>
        </div>
      </section>

      <section className="lab-stage" id="lab">
        <div className="lab-heading" data-reveal>
          <div className="section-index">02 / PROVE THE IDEA</div>
          <div className="lab-heading__grid">
            <h2>Change the purchase.<br />Watch the wallet change its mind.</h2>
            <p>This is the product idea in miniature: the recommendation should respond to the payment moment, not stay fixed because one card has the loudest headline rate.</p>
          </div>
        </div>
        <DecisionLab />
      </section>

      <section className="checkout-stage" id="checkout">
        <div className="checkout-copy" data-reveal>
          <div className="section-index section-index--dark">03 / AT CHECKOUT</div>
          <h2>The research loop should end before the payment starts.</h2>
          <p>KaChing compresses wallet rules into one recommendation while the decision is still useful. Run the demo sequence to see the physical payment moment resolve.</p>
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
            <p>The recommendation layer should clarify the choice without pretending KaChing is the bank or payment processor.</p>
          </div>
          <div className="qr-device" aria-hidden="true">
            <div className="qr-device__top"><span>9:41</span><i /></div>
            <div className="qr-viewfinder">
              <div className="fake-qr-grid" />
              <i className="qr-scanline" />
            </div>
            <div className="qr-sheet">
              <span>BEST DEMO CARD</span>
              <div><strong>UPI Edge</strong><b>₹43</b></div>
              <small>Continue in your payment app →</small>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-stage" id="trust">
        <div className="trust-heading" data-reveal>
          <div className="section-index">04 / WHY TRUST THE NUMBER</div>
          <h2>The moat is not “AI.”<br />It is disciplined financial data.</h2>
          <p>A recommendation becomes credible when the source, rule and value path can be explained. The interface should make that discipline visible.</p>
        </div>

        <div className="trust-pipeline" data-reveal>
          {trustNodes.map(([index, title, detail], nodeIndex) => (
            <div className={`trust-node ${nodeIndex === trustNodes.length - 1 ? "trust-node--answer" : ""}`} key={title}>
              <span>{index}</span>
              <strong>{title}</strong>
              <small>{detail}</small>
              {nodeIndex < trustNodes.length - 1 ? <i aria-hidden="true">→</i> : null}
            </div>
          ))}
        </div>

        <div className="lifecycle-intro" data-reveal>
          <span className="section-index">05 / VALUE AFTER THE SWIPE</span>
          <h3>The recommendation is the beginning, not the whole product.</h3>
        </div>

        <div className="lifecycle-track">
          <article data-reveal>
            <span>BEFORE PAYMENT</span>
            <div className="lifecycle-number">₹62</div>
            <h4>Pick the strongest card now.</h4>
            <p>Resolve the payment moment while the choice can still change.</p>
          </article>
          <article data-reveal>
            <span>AFTER PAYMENT</span>
            <div className="cashback-ledger" aria-hidden="true"><i /><i /><i /><b /></div>
            <h4>Promised vs received.</h4>
            <p>Track whether the expected cashback actually arrives instead of assuming it did.</p>
          </article>
          <article data-reveal>
            <span>OVER TIME</span>
            <div className="nerf-signal" aria-hidden="true"><i /><i /><i /><i /><b /></div>
            <h4>Catch the nerf before habit wins.</h4>
            <p>Reward-value history and unclaimed-value signals keep an old favourite from quietly becoming expensive.</p>
          </article>
        </div>
      </section>

      <section className="faq-stage" id="faq">
        <div className="faq-heading" data-reveal>
          <div className="section-index section-index--dark">06 / QUESTIONS BEFORE TRUST</div>
          <h2>Finance products should answer the uncomfortable questions.</h2>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary><span>0{index + 1}</span><strong>{question}</strong><i>+</i></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta-stage" id="cta">
        <div className="cta-rings" aria-hidden="true">
          <i className="cta-ring cta-ring--a" />
          <i className="cta-ring cta-ring--b" />
          <div className="cta-card-silhouette" />
        </div>
        <div className="cta-copy" data-reveal>
          <div className="section-index section-index--dark">THE NEXT PAYMENT</div>
          <h2>Stop carrying<br />the decision in your head.</h2>
          <p>Your wallet already contains the value. KaChing&apos;s job is to surface it before the moment passes.</p>
          <a className="primary-action primary-action--dark" href="#top"><span>Get early access</span><i>↗</i></a>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top"><span>KA</span>CHING</a>
        <p>Interaction concept · demo figures are not financial recommendations.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
