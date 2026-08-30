"use client";

import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";

const screens = [
  { label: "READY", value: "Tap to evaluate this purchase", detail: "merchant context waiting" },
  { label: "01 / WALLET", value: "Checking eligible cards", detail: "network · category · eligibility" },
  { label: "02 / RULES", value: "Applying caps + live rules", detail: "monthly progress · offers · point value" },
  { label: "03 / ANSWER", value: "Everyday Plus", detail: "demo value · ₹62 back" },
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
    const screenAnimation = animate(screenRef.current, { opacity: { from: 0.45 }, y: { from: 8 }, duration: 360, ease: "outExpo" });
    const resultAnimation = step === screens.length - 1 && resultRef.current
      ? animate(resultRef.current, { opacity: { from: 0 }, y: { from: 18 }, scale: { from: 0.97 }, duration: 560, ease: "outExpo" })
      : null;
    return () => { screenAnimation.cancel(); resultAnimation?.cancel(); };
  }, [step]);

  const run = () => {
    setStep(1);
    if (cardRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animate(cardRef.current, { x: -126, y: 154, rotate: -5, duration: 760, ease: "inOutExpo" });
    }
  };

  const reset = () => {
    setStep(0);
    if (cardRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animate(cardRef.current, { x: 0, y: 0, rotate: 8, duration: 620, ease: "outExpo" });
    }
  };

  return (
    <div className="checkout-demo">
      <div className="checkout-demo__ambient" aria-hidden="true" />
      <div className="purchase-chip"><span>PAYMENT CONTEXT</span><strong>Food delivery · ₹1,240</strong><small>demo purchase</small></div>
      <div className="pos-card-physical" ref={cardRef} aria-hidden="true"><span>CARDEIFY</span><i /><b>EVERYDAY</b></div>
      <div className="terminal-wrap">
        <div className="terminal-pro">
          <div className="terminal-pro__screen">
            <div ref={screenRef} className="terminal-screen-copy"><span>{screens[step].label}</span><strong>{screens[step].value}</strong><small>{screens[step].detail}</small></div>
            <div className="terminal-progress" aria-hidden="true"><i style={{ width: `${(step / (screens.length - 1)) * 100}%` }} /></div>
          </div>
          <div className="terminal-pro__meta"><span><i /> CARDEIFY ADVISORY</span><span>CONTACTLESS</span></div>
          <div className="terminal-pro__keys" aria-hidden="true">{Array.from({ length: 12 }).map((_, index) => <i key={index} />)}</div>
          <div className="terminal-pro__slot" aria-hidden="true" />
        </div>
        <div className="checkout-result" ref={resultRef} data-visible={step === screens.length - 1}><span>BEST CARD FOR THIS DEMO PURCHASE</span><div><strong>Everyday Plus</strong><b>₹62</b></div><small>Dining multiplier wins before the demo cap.</small></div>
      </div>
      <div className="checkout-controls">
        {step === 0 ? <button type="button" className="primary-action primary-action--cream" onClick={run}><span>Run the payment decision</span><i>↗</i></button> : <button type="button" className="secondary-action" onClick={reset} disabled={running}>{running ? "Evaluating the wallet…" : "Run it again"}</button>}
      </div>
    </div>
  );
}
