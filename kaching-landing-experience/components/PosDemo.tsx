"use client";

import { useEffect, useState } from "react";

const screens = [
  { label: "READY", value: "Run a card decision" },
  { label: "01 / WALLET", value: "Checking eligible cards…" },
  { label: "02 / RULES", value: "Applying caps + offers…" },
  { label: "03 / ANSWER", value: "Use Everyday Plus · ₹62 back" },
];

export default function PosDemo() {
  const [step, setStep] = useState(0);
  const running = step > 0 && step < screens.length - 1;

  useEffect(() => {
    if (step === 0 || step >= screens.length - 1) return;
    const timer = window.setTimeout(() => setStep((value) => value + 1), 900);
    return () => window.clearTimeout(timer);
  }, [step]);

  const run = () => setStep(1);
  const reset = () => setStep(0);

  return (
    <div className="pos-demo">
      <div className={`pos-card pos-card-step-${step}`} aria-hidden="true">
        <span>EVERYDAY</span>
        <i />
      </div>

      <div className="terminal" aria-label="Animated payment terminal demonstration">
        <div className="terminal-screen">
          <span>{screens[step].label}</span>
          <strong>{screens[step].value}</strong>
          <div className="terminal-progress" aria-hidden="true">
            <i style={{ width: `${(step / (screens.length - 1)) * 100}%` }} />
          </div>
        </div>
        <div className="terminal-contactless" aria-hidden="true">)))</div>
        <div className="terminal-keys" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, index) => <i key={index} />)}
        </div>
        <div className="terminal-slot" aria-hidden="true" />
      </div>

      <div className="pos-actions">
        {step === 0 ? (
          <button type="button" className="button button-light" onClick={run}>Run the decision</button>
        ) : (
          <button type="button" className="button button-ghost" onClick={reset} disabled={running}>
            {running ? "Working through the rules…" : "Run it again"}
          </button>
        )}
      </div>
    </div>
  );
}
