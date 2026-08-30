"use client";

import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";

const screens = [
  { label: "READY", value: "Tap to evaluate this purchase", detail: "merchant context waiting" },
  { label: "01 / WALLET", value: "Checking eligible cards", detail: "network · category · eligibility" },
  { label: "02 / RULES", value: "Applying caps + live rules", detail: "monthly progress · offers · point value" },
  { label: "03 / ANSWER", value: "Everyday Plus", detail: "sample value · ₹62 back" },
];

export default function PosDemo() {
  const [step, setStep] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const running = step > 0 && step < screens.length - 1;

  useEffect(() => {
    if (step === 0 || step >= screens.length - 1) return;
    const timer = window.setTimeout(() => setStep((value) => value + 1), 760);
    return () => window.clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !screenRef.current) return;
    const screenAnimation = animate(screenRef.current, {
      opacity: { from: 0.45 },
      y: { from: 8 },
      duration: 360,
      ease: "outExpo",
    });
    const resultAnimation = step === screens.length - 1 && resultRef.current
      ? animate(resultRef.current, {
          opacity: { from: 0 },
          y: { from: 18 },
          scale: { from: 0.97 },
          duration: 560,
          ease: "outExpo",
        })
      : null;
    return () => {
      screenAnimation.cancel();
      resultAnimation?.cancel();
    };
  }, [step]);

  const run = () => {
    setStep(1);
    if (cardRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animate(cardRef.current, { x: -132, y: 170, rotate: -4, duration: 820, ease: "inOutExpo" });
    }
  };

  const reset = () => {
    setStep(0);
    if (cardRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animate(cardRef.current, { x: 0, y: 0, rotate: 8, duration: 620, ease: "outExpo" });
    }
  };

  return (
    <div className="checkout-demo" aria-label="Interactive Cardeify checkout demonstration">
      <div className="checkout-demo__ambient" aria-hidden="true" />
      <div className="checkout-demo__grid" aria-hidden="true" />

      <div className="purchase-chip">
        <span>PAYMENT CONTEXT</span>
        <strong>Food delivery · ₹1,240</strong>
        <small>sample purchase</small>
      </div>

      <div className="pos-card-physical" ref={cardRef} aria-hidden="true">
        <div className="pos-card-physical__brand"><span>CARDEIFY</span><em>everyday</em></div>
        <i className="pos-card-chip" />
        <div className="pos-card-number">••••&nbsp;&nbsp;4821</div>
        <div className="pos-card-foot"><small>VALID THRU&nbsp;&nbsp;09/31</small><b>VISA</b></div>
      </div>

      <div className="terminal-wrap">
        <div className="terminal-pro">
          <div className="terminal-pro__status" aria-hidden="true"><i /><span>ONLINE</span><b>•••</b></div>
          <div className="terminal-pro__screen">
            <div className="terminal-screen-brand"><span>CARDEIFY</span><small>payment advisor</small></div>
            <div ref={screenRef} className="terminal-screen-copy">
              <span>{screens[step].label}</span>
              <strong>{screens[step].value}</strong>
              <small>{screens[step].detail}</small>
            </div>
            <div className="terminal-progress" aria-hidden="true"><i style={{ width: `${(step / (screens.length - 1)) * 100}%` }} /></div>
          </div>
          <div className="terminal-contactless-mark" aria-hidden="true"><i /><i /><i /></div>
          <div className="terminal-pro__meta"><span><i /> SECURE ADVISORY</span><span>CONTACTLESS</span></div>
          <div className="terminal-pro__keys" aria-hidden="true">
            {Array.from({ length: 9 }).map((_, index) => <i key={index}>{index + 1}</i>)}
            <i className="key-cancel">×</i><i>0</i><i className="key-confirm">✓</i>
          </div>
          <div className="terminal-pro__slot" aria-hidden="true"><i /></div>
        </div>

        <div className="checkout-result" ref={resultRef} data-visible={step === screens.length - 1} aria-live="polite">
          <span>BEST SAMPLE CARD FOR THIS PURCHASE</span>
          <div><strong>Everyday Plus</strong><b>₹62</b></div>
          <small>Dining multiplier wins before the sample cap.</small>
          <div className="checkout-result__meta"><i /> verified rule path <b>+₹31 vs #2</b></div>
        </div>
      </div>

      <div className="checkout-controls">
        {step === 0 ? (
          <button type="button" className="primary-action primary-action--cream" onClick={run}><span>Run the payment decision</span><i>↗</i></button>
        ) : (
          <button type="button" className="secondary-action" onClick={reset} disabled={running}>{running ? "Evaluating the wallet…" : "Run it again"}</button>
        )}
      </div>
    </div>
  );
}
