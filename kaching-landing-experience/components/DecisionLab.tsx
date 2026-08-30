"use client";

import { animate, stagger } from "animejs";
import { useEffect, useMemo, useRef, useState } from "react";
import { demoScenarios } from "@/lib/demo-data";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function DecisionLab() {
  const [scenarioId, setScenarioId] = useState(demoScenarios[0].id);
  const scenario = demoScenarios.find((item) => item.id === scenarioId) ?? demoScenarios[0];
  const [amount, setAmount] = useState(scenario.amount);
  const shellRef = useRef<HTMLDivElement>(null);
  const winnerRef = useRef<HTMLDivElement>(null);

  const ranked = useMemo(() => {
    const ratio = amount / scenario.amount;
    return scenario.cards
      .map((card) => ({ ...card, liveReward: Math.max(0, Math.round(card.reward * ratio)) }))
      .sort((a, b) => b.liveReward - a.liveReward);
  }, [amount, scenario]);

  const winnerDelta = ranked.length > 1 ? ranked[0].liveReward - ranked[1].liveReward : 0;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !shellRef.current) return;

    const rows = shellRef.current.querySelectorAll(".ranking-row");
    const reward = winnerRef.current;
    const rowsAnimation = animate(rows, {
      opacity: { from: 0.42 }, y: { from: 14 }, scale: { from: 0.988 },
      delay: stagger(55), duration: 520, ease: "outExpo",
    });
    const rewardAnimation = reward ? animate(reward, {
      opacity: { from: 0.45 }, y: { from: 10 }, scale: { from: 0.96 }, duration: 500, ease: "outExpo",
    }) : null;

    return () => { rowsAnimation.cancel(); rewardAnimation?.cancel(); };
  }, [scenarioId, amount]);

  const chooseScenario = (id: string) => {
    const next = demoScenarios.find((item) => item.id === id) ?? demoScenarios[0];
    setScenarioId(id);
    setAmount(next.amount);
  };

  return (
    <div className="decision-console" ref={shellRef}>
      <div className="decision-console__topline"><span>LIVE PRODUCT PROTOTYPE</span><span>DEMO FIXTURES · NOT FINANCIAL ADVICE</span></div>
      <div className="decision-console__grid">
        <div className="decision-inputs">
          <div className="decision-input-group">
            <span className="micro-label">01 / PAYMENT MOMENT</span>
            <div className="scenario-list" role="tablist" aria-label="Demo purchase scenarios">
              {demoScenarios.map((item, index) => (
                <button key={item.id} type="button" className={item.id === scenario.id ? "scenario-choice is-active" : "scenario-choice"} onClick={() => chooseScenario(item.id)} role="tab" aria-selected={item.id === scenario.id}>
                  <span>0{index + 1}</span><strong>{item.merchant}</strong><i>{item.category}</i>
                </button>
              ))}
            </div>
          </div>
          <label className="decision-amount">
            <span className="micro-label">02 / AMOUNT</span>
            <span className="amount-field"><small>₹</small><input aria-label="Purchase amount in rupees" type="number" inputMode="numeric" min={100} max={100000} step={50} value={amount} onChange={(event) => setAmount(Math.max(100, Number(event.target.value) || 100))} /></span>
            <span className="amount-caption">Change the purchase and watch the wallet rerank.</span>
          </label>
        </div>
        <div className="decision-result">
          <div className="decision-result__intro"><span className="micro-label">03 / CARDEIFY ANSWER</span><span className="decision-status"><i /> wallet evaluated</span></div>
          <div className="decision-winner">
            <div><span className="winner-overline">USE THIS CARD</span><h3>{ranked[0].name}</h3><p>{ranked[0].reason}</p></div>
            <div className="winner-number" ref={winnerRef}><small>EXPECTED DEMO VALUE</small><strong>{inr.format(ranked[0].liveReward)}</strong><span>{winnerDelta > 0 ? `+${inr.format(winnerDelta)} vs #2` : "best available fixture"}</span></div>
          </div>
          <div className="ranking-table" aria-live="polite">
            {ranked.map((card, index) => {
              const width = ranked[0].liveReward > 0 ? Math.max(8, (card.liveReward / ranked[0].liveReward) * 100) : 8;
              return <div className="ranking-row" key={card.name}><span className="ranking-index">0{index + 1}</span><div className="ranking-identity"><strong>{card.name}</strong><span>{scenario.category}</span></div><div className="ranking-meter" aria-hidden="true"><i style={{ width: `${width}%` }} /></div><strong className="ranking-value">{inr.format(card.liveReward)}</strong></div>;
            })}
          </div>
          <p className="decision-disclosure">The interaction demonstrates Cardeify&apos;s decision pattern. Card names and figures here are invented UX fixtures; production recommendations must come from the real wallet + reward engine.</p>
        </div>
      </div>
    </div>
  );
}
