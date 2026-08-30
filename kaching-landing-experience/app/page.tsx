import CardOrbit from "@/components/CardOrbit";
import DecisionLab from "@/components/DecisionLab";
import MotionDirector from "@/components/MotionDirector";
import PosDemo from "@/components/PosDemo";

const walletProfiles = ["Cashback", "Travel", "UPI", "Dining", "Fuel", "Online", "Premium", "Everyday"];

const problemRules = [
  ["01", "Monthly cap", "A headline rate can disappear after the useful limit is exhausted."],
  ["02", "Merchant rules", "The same card can win on dining and lose on travel."],
  ["03", "Point value", "Five points are meaningless until their rupee value is known."],
  ["04", "Offer context", "One live merchant offer can reorder the entire wallet."],
];

const faqs = [
  ["What exactly does Cardeify do?", "Cardeify is a decision layer for a multi-card wallet. Before a purchase, it compares the payment context with the reward rules of the cards in the wallet and surfaces the strongest option for that moment."],
  ["Does Cardeify make the payment?", "No. Cardeify is the advisory layer, not the bank or payment processor. You remain in control of the actual payment flow."],
  ["Why show rupees instead of only percentages?", "Because a headline percentage is not the transaction outcome. Caps, exclusions, point values, merchant categories and offers can all change what the purchase is actually worth."],
  ["Are the figures on this page live recommendations?", "No. Values on this landing page are clearly presented as illustrative fixtures. A live recommendation must come from the user's actual wallet and current reward rules."],
  ["What happens when reward rules change?", "The product direction includes reward-value history and devaluation detection so cards can be reassessed when their economics change."],
  ["Why should I trust the recommendation?", "The intended system is based on normalized reward rules, source provenance and deterministic calculations rather than asking a generative model to invent financial numbers."],
];

export default function Home() {
  return (
    <main id="main-content">
      <a className="skip-link" href="#wallet">Skip to content</a>
      <MotionDirector />
      <div className="page-progress" aria-hidden="true"><i className="page-progress__bar" /></div>

      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Cardeify home"><span>C</span>ardeify</a>
        <div className="nav-center">
          <a href="#wallet">Why Cardeify</a>
          <a href="#lab">Try it</a>
          <a href="#checkout">How it works</a>
          <a href="#trust">Trust</a>
          <a href="#faq">FAQ</a>
        </div>
        <a className="nav-cta" href="#lab">Try the demo <span>↗</span></a>
      </nav>

      <section className="hero-shell" id="top" aria-labelledby="hero-title">
        <div className="hero-sticky">
          <div className="hero-world" aria-hidden="true">
            <i className="hero-world__orb hero-world__orb--gold" />
            <i className="hero-world__orb hero-world__orb--blue" />
            <i className="hero-world__contour hero-world__contour--one" />
            <i className="hero-world__contour hero-world__contour--two" />
            <i className="hero-world__contour hero-world__contour--three" />
            <i className="hero-world__star hero-world__star--one" />
            <i className="hero-world__star hero-world__star--two" />
          </div>

          <div className="hero-copy">
            <div className="hero-kicker"><span /> The wallet decision layer</div>
            <h1 id="hero-title">
              <span className="hero-line"><span className="hero-word">Every card promises rewards.</span></span>
              <span className="hero-line"><span className="hero-word hero-word--accent">Cardeify finds the one that wins.</span></span>
            </h1>
            <p className="hero-sub">One purchase. One wallet. One clear answer in rupees — before the moment to choose is gone.</p>
            <div className="hero-purchase" aria-label="Illustrative purchase context">
              <span className="hero-purchase__merchant"><i>FD</i><b>Food delivery</b></span>
              <span>₹1,240</span>
              <small>illustrative purchase</small>
            </div>
          </div>

          <CardOrbit />

          <div className="hero-bottomline">
            <span>Scroll to open the wallet</span>
            <i />
            <a href="#lab">Skip to interactive demo ↘</a>
          </div>
        </div>
      </section>

      <section className="wallet-bridge" id="wallet" aria-labelledby="wallet-title">
        <div className="wallet-bridge__threads" aria-hidden="true">
          {walletProfiles.map((profile, index) => <i key={profile} style={{ "--thread": index } as React.CSSProperties} />)}
          <b>C</b>
        </div>
        <div className="wallet-bridge__copy" data-reveal>
          <span className="eyebrow">One wallet layer</span>
          <h2 id="wallet-title">Eight cards should not mean eight decisions.</h2>
          <p>Cardeify sits above the wallet and resolves category rules, limits, offers and point value into one recommendation you can actually use.</p>
          <div className="wallet-metrics">
            <span><strong>8</strong><small>card profiles</small></span>
            <span><strong>many</strong><small>reward rules</small></span>
            <span><strong>1</strong><small>answer</small></span>
          </div>
        </div>
        <div className="wallet-ribbon" aria-label="Illustrative wallet profiles">
          {walletProfiles.map((profile, index) => (
            <span key={profile} className={`wallet-ribbon__card wallet-ribbon__card--${(index % 4) + 1}`}><i>{profile}</i><b>•••• {2841 + index * 37}</b></span>
          ))}
        </div>
      </section>

      <section className="problem-stage" id="logic" aria-labelledby="problem-title">
        <div className="problem-stage__intro" data-reveal>
          <span className="eyebrow eyebrow--ink">The problem with headline rewards</span>
          <h2 id="problem-title"><span>5%</span> is rarely the answer.</h2>
          <p>A reward rate looks simple until a real purchase introduces limits, merchant rules, exclusions and points with changing value.</p>
        </div>

        <div className="problem-equation" aria-label="Illustrative reward calculation">
          <div className="problem-equation__rate">5%</div>
          <div className="problem-equation__rules">
            {problemRules.map(([index, title, detail]) => (
              <article key={title} className="problem-rule" data-problem-rule>
                <span>{index}</span><div><strong>{title}</strong><p>{detail}</p></div><i>−</i>
              </article>
            ))}
          </div>
          <div className="problem-equation__answer"><small>WHAT THIS PURCHASE IS WORTH</small><strong>₹62</strong><span>illustrative expected value</span></div>
        </div>
      </section>

      <section className="lab-stage" id="lab" aria-labelledby="lab-title">
        <div className="section-mast section-mast--dark" data-reveal>
          <span className="eyebrow">Try the idea</span>
          <h2 id="lab-title">Change the purchase.<br /><em>Watch the wallet change its mind.</em></h2>
          <p>The interactive preview makes the product idea tangible. Different purchase moments should produce different winners.</p>
        </div>
        <DecisionLab />
      </section>

      <section className="checkout-stage" id="checkout" aria-labelledby="checkout-title">
        <div className="checkout-mast" data-reveal>
          <span className="eyebrow eyebrow--ink">At checkout</span>
          <h2 id="checkout-title">The research loop should end <em>before</em> the payment starts.</h2>
          <p>Recognise the purchase, evaluate the wallet, surface one answer. Run the illustrative sequence below.</p>
        </div>
        <PosDemo />
      </section>

      <section className="qr-story" aria-labelledby="qr-title">
        <div className="qr-story__copy" data-reveal>
          <span className="eyebrow eyebrow--ink">QR advisory</span>
          <h2 id="qr-title">Scan the moment.<br />Not another dashboard.</h2>
          <p>Cardeify can use the payment context to recommend the wallet choice, then hand control back to the user's preferred payment flow.</p>
          <div className="qr-story__steps"><span><b>01</b> recognise</span><span><b>02</b> resolve</span><span><b>03</b> hand off</span></div>
        </div>
        <div className="qr-phone" aria-label="Illustration of Cardeify QR recommendation">
          <div className="qr-phone__bar"><span>9:41</span><i /><b>•••</b></div>
          <header><i>C</i><div><small>CARDEIFY</small><strong>Scan to decide</strong></div></header>
          <div className="qr-phone__camera"><div className="fake-qr-grid" /><i className="qr-scanline" /><span>FOOD DELIVERY · ₹860</span></div>
          <div className="qr-phone__sheet"><small>BEST ILLUSTRATIVE CARD</small><div><span className="qr-mini-card"><i /></span><strong>UPI Edge</strong><b>₹43</b></div><p>UPI rule wins for this purchase.</p><button type="button" tabIndex={-1}>Continue to payment <span>→</span></button></div>
        </div>
        <div className="qr-story__halo" aria-hidden="true" />
      </section>

      <section className="trust-stage" id="trust" aria-labelledby="trust-title">
        <div className="section-mast section-mast--trust" data-reveal>
          <span className="eyebrow eyebrow--ink">Trust the rupee</span>
          <h2 id="trust-title">A financial answer should come with its evidence.</h2>
          <p>Instead of hiding the number behind “AI,” Cardeify's intended model is a visible path from source record to rule to deterministic value.</p>
        </div>

        <div className="evidence-receipt" data-reveal>
          <header><span>CARDEIFY / RECOMMENDATION RECEIPT</span><b>ILLUSTRATIVE</b></header>
          <div className="evidence-receipt__purchase"><span>Food delivery</span><strong>₹1,240</strong></div>
          <div className="evidence-receipt__row"><span>Source</span><strong>Issuer reward terms</strong><i>verified record</i></div>
          <div className="evidence-receipt__row"><span>Rule</span><strong>Dining multiplier</strong><i>eligible</i></div>
          <div className="evidence-receipt__row"><span>Cap state</span><strong>₹738 remaining</strong><i>within limit</i></div>
          <div className="evidence-receipt__row"><span>Point value</span><strong>Normalized to ₹</strong><i>deterministic</i></div>
          <footer><span>Recommended card <strong>Everyday Plus</strong></span><b>₹62</b></footer>
        </div>

        <div className="after-swipe" aria-labelledby="after-title">
          <div className="after-swipe__intro" data-reveal><span className="eyebrow">After the swipe</span><h3 id="after-title">The recommendation is only the first moment of value.</h3></div>
          <article className="after-swipe__receipt" data-reveal><span>01 / VERIFY</span><div className="mini-receipt"><header><b>FOOD DELIVERY</b><strong>₹1,240</strong></header><p><span>Expected</span><b>₹62</b></p><p><span>Received</span><b>₹62</b></p><footer>✓ MATCHED</footer></div><h4>Promised vs received.</h4></article>
          <article className="after-swipe__chart" data-reveal><span>02 / WATCH</span><div className="mini-chart"><header><b>REWARD VALUE</b><strong>-18%</strong></header><div><i /><i /><i /><i /><i /><em /></div><footer>Travel Metal · value changed</footer></div><h4>Catch the nerf before habit wins.</h4></article>
          <article className="after-swipe__recovery" data-reveal><span>03 / RECOVER</span><div className="recovery-value"><small>UNCLAIMED VALUE</small><strong>₹3,840</strong><i>cashback · points · milestone · voucher</i></div><h4>Surface value that would otherwise disappear.</h4></article>
        </div>
      </section>

      <section className="faq-stage" id="faq" aria-labelledby="faq-title">
        <div className="faq-heading" data-reveal><span className="eyebrow">Questions before trust</span><h2 id="faq-title">The things a finance product should answer clearly.</h2></div>
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
        <div className="cta-stack" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="cta-copy" data-reveal><span className="eyebrow eyebrow--ink">The next payment</span><h2>Your wallet already has the answer.<br /><em>Cardeify finds it.</em></h2><p>Try the interactive preview and see how one purchase can change which card deserves the tap.</p><a className="cta-button" href="#lab">Try Cardeify <span>↗</span></a></div>
      </section>

      <footer>
        <a className="brand" href="#top"><span>C</span>ardeify</a>
        <p>Illustrative landing experience · sample values are not financial recommendations.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
