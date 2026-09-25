import CardOrbit from "@/components/CardOrbit";
import MotionDirector from "@/components/MotionDirector";
import PosDemo from "@/components/PosDemo";
import SiteLoader from "@/components/SiteLoader";
import StoryCard from "@/components/StoryCard";

const faqs = [
  ["What is Cardeify?", "Cardeify is a decision layer for a multi-card wallet. It compares a purchase context with reward rules, limits and eligible offers so the user can see which card is expected to create the strongest value."],
  ["Does Cardeify make the payment?", "No. Cardeify is advisory. The user remains in control of the payment and can continue through their preferred payment method or app."],
  ["Why does the site show rupees instead of only percentages?", "A headline percentage is not the same as transaction value. Caps, merchant categories, point value and offer eligibility can all change the actual result."],
  ["Are the numbers on this page live recommendations?", "No. Every transaction and reward value shown here is an illustrative fixture used to explain the product direction."],
  ["How should a recommendation be verified?", "The intended product keeps a visible evidence path from source terms to normalized reward rule, cap state, offer eligibility and final rupee calculation."],
];

export default function Home() {
  return (
    <main id="main-content" className="cinematic-site">
      <SiteLoader />
      <StoryCard />
      <MotionDirector />

      <a className="skip-link" href="#choice">Skip to content</a>
      <div className="page-progress" aria-hidden="true"><i className="page-progress__bar" /></div>

      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Cardeify home">Cardeify</a>
        <div className="nav-center">
          <a href="#choice">How it works</a>
          <a href="#offers">Features</a>
          <a href="#trust">Trust</a>
        </div>
        <a className="nav-cta" href="#cta">Join the waitlist</a>
      </nav>

      <section className="hero-shell" id="top" aria-labelledby="hero-title">
        <div className="hero-sticky">
          <div className="hero-world" aria-hidden="true">
            <i className="hero-world__orb hero-world__orb--gold" />
            <i className="hero-world__orb hero-world__orb--blue" />
            <i className="hero-world__contour hero-world__contour--one" />
            <i className="hero-world__contour hero-world__contour--two" />
            <i className="hero-world__contour hero-world__contour--three" />
          </div>

          <div className="hero-copy">
            <div className="hero-kicker">In development for India</div>
            <h1 id="hero-title">
              <span className="hero-line"><span className="hero-word">Your cards.</span></span>
              <span className="hero-line"><span className="hero-word">Their best move.</span></span>
            </h1>
            <p className="hero-sub">Find which card to use, which offers combine, and what you could get back.</p>
            <div className="hero-actions">
              <a className="hero-primary" href="#cta">Join the waitlist</a>
              <a className="hero-secondary" href="#choice">See how it works <span>↓</span></a>
            </div>
          </div>

          <CardOrbit />

          <div className="hero-example">
            <i aria-hidden="true" />
            <span>Illustrative example · Online purchase ₹5,000</span>
            <i aria-hidden="true" />
          </div>
        </div>
      </section>

      <section
        className="story-stage choice-stage"
        id="choice"
        aria-labelledby="choice-title"
        data-story-stop
        data-card-x="0.73"
        data-card-y="0.57"
        data-card-rotation="-0.12"
        data-card-scale="0.62"
      >
        <div className="story-index">01</div>
        <div className="stage-copy stage-copy--left" data-reveal>
          <span className="stage-kicker">One purchase changes the winner</span>
          <h2 id="choice-title">The wallet stays the same.<br /><em>The answer doesn’t.</em></h2>
          <p>Cardeify starts with the moment that matters: what you are buying, where, and for how much.</p>
        </div>

        <div className="purchase-context" data-reveal aria-label="Illustrative purchase context">
          <div>
            <small>Purchase</small>
            <strong>Online</strong>
          </div>
          <span>₹5,000</span>
          <i>illustrative</i>
        </div>

        <div className="choice-ledger" aria-hidden="true">
          <span><i>01</i> category recognized</span>
          <span><i>02</i> wallet checked</span>
          <span><i>03</i> offers matched</span>
          <span className="is-selected"><i>04</i> best move selected</span>
        </div>
      </section>

      <section
        className="story-stage context-stage"
        id="context"
        aria-labelledby="context-title"
        data-story-stop
        data-card-x="0.26"
        data-card-y="0.60"
        data-card-rotation="0.10"
        data-card-scale="0.56"
      >
        <div className="story-index">02</div>
        <div className="stage-copy stage-copy--right stage-copy--ink" data-reveal>
          <span className="stage-kicker">Purchase context</span>
          <h2 id="context-title">The right card depends on <em>what the payment is.</em></h2>
          <p>Instead of asking you to remember reward tables, Cardeify treats the purchase itself as the starting point.</p>
        </div>

        <div className="context-shelf" aria-label="Illustrative purchase categories">
          <article className="context-object context-object--dining">
            <div className="context-prop receipt-prop" aria-hidden="true"><i /><i /><i /><i /></div>
            <span>Dining</span><small>merchant category</small>
          </article>
          <article className="context-object context-object--travel">
            <div className="context-prop tag-prop" aria-hidden="true"><b>DEL</b><i /></div>
            <span>Travel</span><small>airline / hotel</small>
          </article>
          <article className="context-object context-object--online is-active">
            <div className="context-prop parcel-prop" aria-hidden="true"><i /><b /></div>
            <span>Online</span><small>selected context</small>
          </article>
          <article className="context-object context-object--fuel">
            <div className="context-prop fuel-prop" aria-hidden="true"><i /><b /></div>
            <span>Fuel</span><small>fuel MCC</small>
          </article>
          <article className="context-object context-object--bills">
            <div className="context-prop bill-prop" aria-hidden="true"><i /><i /><b /></div>
            <span>Bills</span><small>utility payment</small>
          </article>
        </div>
      </section>

      <section
        className="story-stage reward-stage"
        id="reward"
        aria-labelledby="reward-title"
        data-story-stop
        data-card-x="0.72"
        data-card-y="0.62"
        data-card-rotation="-0.16"
        data-card-scale="0.57"
      >
        <div className="story-index story-index--ink">03</div>
        <div className="reward-head" data-reveal>
          <span className="stage-kicker stage-kicker--ink">Reward engine</span>
          <h2 id="reward-title"><strong>5%</strong> is not the answer.</h2>
        </div>

        <div className="reward-rules">
          <article data-rule-gate><span>01</span><strong>Cap</strong><p>Is useful reward capacity still available this month?</p></article>
          <article data-rule-gate><span>02</span><strong>Eligibility</strong><p>Does this merchant and transaction actually qualify?</p></article>
          <article data-rule-gate><span>03</span><strong>Point value</strong><p>What are those points worth when normalized to rupees?</p></article>
          <article data-rule-gate><span>04</span><strong>Merchant rule</strong><p>Does the category multiplier apply to this purchase?</p></article>
        </div>

        <div className="reward-answer" data-reveal>
          <small>Illustrative expected reward</small>
          <strong>₹250</strong>
          <span>after rule normalization</span>
        </div>
      </section>

      <section
        className="story-stage offers-stage"
        id="offers"
        aria-labelledby="offers-title"
        data-story-stop
        data-card-x="0.50"
        data-card-y="0.58"
        data-card-rotation="0.04"
        data-card-scale="0.60"
      >
        <div className="story-index">04</div>
        <div className="stage-copy stage-copy--left" data-reveal>
          <span className="stage-kicker">Offer stacking</span>
          <h2 id="offers-title">A card rate can be only <em>one layer of value.</em></h2>
          <p>Compatible issuer, merchant and card-linked offers can change which payment option actually wins.</p>
        </div>

        <div className="offer-stack" aria-label="Illustrative stacked offer calculation">
          <div className="offer-layer" data-offer-layer><span>Issuer reward</span><strong>₹250</strong><i>eligible</i></div>
          <div className="offer-layer" data-offer-layer><span>Merchant offer</span><strong>₹100</strong><i>stackable</i></div>
          <div className="offer-layer" data-offer-layer><span>CLO</span><strong>₹75</strong><i>matched</i></div>
          <div className="offer-layer offer-layer--muted" data-offer-layer><span>Another offer</span><strong>—</strong><i>not compatible</i></div>
        </div>

        <div className="offer-total" data-reveal>
          <span>Total expected value</span>
          <strong>₹425</strong>
          <small>illustrative</small>
        </div>
      </section>

      <section
        className="story-stage answer-stage"
        id="answer"
        aria-labelledby="answer-title"
        data-story-stop
        data-card-x="0.50"
        data-card-y="0.40"
        data-card-rotation="0"
        data-card-scale="0.70"
      >
        <div className="answer-copy" data-reveal>
          <span className="stage-kicker">The answer</span>
          <h2 id="answer-title">One clear move.</h2>
          <p>Once the rules are resolved, the interface should become quieter — not more complicated.</p>
        </div>

        <div className="answer-value" data-reveal>
          <small>Best illustrative card for this purchase</small>
          <strong>Online</strong>
          <b>₹425 <em>back</em></b>
          <span>Best combined value across eligible wallet + offers</span>
        </div>
      </section>

      <section
        className="story-stage checkout-stage-v2"
        id="checkout"
        aria-labelledby="checkout-title"
        data-story-stop
        data-card-x="0.22"
        data-card-y="0.60"
        data-card-rotation="0.12"
        data-card-scale="0.58"
      >
        <div className="checkout-copy-v2" data-reveal>
          <span className="stage-kicker stage-kicker--ink">At checkout</span>
          <h2 id="checkout-title">The research should end <em>before payment starts.</em></h2>
          <p>The recommendation is advisory. The user keeps control of the actual payment flow.</p>
        </div>
        <div className="checkout-object">
          <PosDemo />
        </div>
      </section>

      <section
        className="story-stage verify-stage"
        id="verify"
        aria-labelledby="verify-title"
        data-story-stop
        data-card-x="0.77"
        data-card-y="0.61"
        data-card-rotation="-0.10"
        data-card-scale="0.53"
      >
        <div className="story-index story-index--ink">06</div>
        <div className="stage-copy stage-copy--left stage-copy--ink" data-reveal>
          <span className="stage-kicker stage-kicker--ink">After payment</span>
          <h2 id="verify-title">Did the reward <em>actually arrive?</em></h2>
          <p>A recommendation becomes more useful when the product can compare expected and received value afterwards.</p>
        </div>

        <div className="verification-papers">
          <article className="verification-paper" data-reveal>
            <header><span>ONLINE PURCHASE</span><b>₹5,000</b></header>
            <p><span>Expected reward</span><strong>₹425</strong></p>
            <p><span>Received reward</span><strong>₹425</strong></p>
            <footer><i>✓</i> matched</footer>
          </article>
          <article className="verification-paper verification-paper--alert" data-reveal>
            <header><span>SECOND PURCHASE</span><b>₹3,200</b></header>
            <p><span>Expected reward</span><strong>₹280</strong></p>
            <p><span>Received reward</span><strong>₹175</strong></p>
            <footer><i>!</i> ₹105 difference</footer>
          </article>
        </div>
      </section>

      <section
        className="story-stage intelligence-stage"
        id="intelligence"
        aria-labelledby="intelligence-title"
        data-story-stop
        data-card-x="0.28"
        data-card-y="0.56"
        data-card-rotation="0.09"
        data-card-scale="0.51"
      >
        <div className="story-index">07</div>
        <div className="stage-copy stage-copy--right" data-reveal>
          <span className="stage-kicker">Wallet intelligence</span>
          <h2 id="intelligence-title">The best move can change <em>over time.</em></h2>
          <p>Reward programs devalue, caps reset and unclaimed value expires. A useful wallet layer keeps watching after checkout.</p>
        </div>

        <div className="value-timeline" aria-label="Illustrative accumulated reward value">
          <div className="timeline-bar"><i style={{ height: "36%" }} /><span>Jan</span><b>₹840</b></div>
          <div className="timeline-bar"><i style={{ height: "52%" }} /><span>Feb</span><b>₹1,260</b></div>
          <div className="timeline-bar"><i style={{ height: "72%" }} /><span>Mar</span><b>₹1,880</b></div>
          <div className="timeline-bar"><i style={{ height: "92%" }} /><span>Apr</span><b>₹2,430</b></div>
        </div>

        <div className="intelligence-notes">
          <span><i>−18%</i> Travel reward value changed</span>
          <span><i>₹1,200</i> unclaimed value found</span>
        </div>
      </section>

      <section
        className="story-stage trust-stage-v2"
        id="trust"
        aria-labelledby="trust-title"
        data-story-stop
        data-card-x="0.76"
        data-card-y="0.60"
        data-card-rotation="-0.08"
        data-card-scale="0.50"
      >
        <div className="story-index story-index--ink">08</div>
        <div className="trust-copy-v2" data-reveal>
          <span className="stage-kicker stage-kicker--ink">Trust the rupee</span>
          <h2 id="trust-title">Every answer should show <em>where it came from.</em></h2>
          <p>No mystery score. No invented number. The intended product keeps a visible path from source terms to final transaction value.</p>
        </div>

        <div className="evidence-sheet" data-reveal>
          <header><span>Recommendation evidence</span><b>ILLUSTRATIVE</b></header>
          <div><span>Source</span><strong>Issuer reward terms</strong><i>verified record</i></div>
          <div><span>Reward rule</span><strong>5% on online spend</strong><i>eligible</i></div>
          <div><span>Cap status</span><strong>₹750 remaining</strong><i>within limit</i></div>
          <div><span>Merchant offer</span><strong>₹100 cashback</strong><i>stackable</i></div>
          <div><span>CLO</span><strong>₹75 card-linked offer</strong><i>matched</i></div>
          <footer><span>Expected value</span><strong>₹425</strong></footer>
        </div>
      </section>

      <section
        className="story-stage final-stage"
        id="cta"
        aria-labelledby="final-title"
        data-story-stop
        data-card-x="0.50"
        data-card-y="0.61"
        data-card-rotation="0"
        data-card-scale="0.63"
      >
        <div className="final-stack" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="final-copy" data-reveal>
          <span className="stage-kicker stage-kicker--ink">The next payment</span>
          <h2 id="final-title">Your wallet already has the answer.<br /><em>Cardeify finds it.</em></h2>
          <p>Join the waitlist for the India launch.</p>
          <a className="final-button" href="mailto:hello@cardeify.app?subject=Cardeify%20waitlist">Join the waitlist <span>↗</span></a>
        </div>
      </section>

      <section className="faq-stage-v2" id="faq" aria-labelledby="faq-title">
        <div className="faq-intro" data-reveal>
          <span className="stage-kicker">Before you trust the answer</span>
          <h2 id="faq-title">The finance questions worth answering plainly.</h2>
        </div>
        <div className="faq-list-v2">
          {faqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary><span>0{index + 1}</span><strong>{question}</strong><i>+</i></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="site-footer-v2">
        <a className="brand" href="#top">Cardeify</a>
        <p>Illustrative product experience · sample values are not financial recommendations.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
