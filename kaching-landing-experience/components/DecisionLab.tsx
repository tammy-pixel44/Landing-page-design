"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { demoScenarios } from "@/lib/demo-data";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export default function DecisionLab() {
  const [scenarioId, setScenarioId] = useState(demoScenarios[0].id);
  const scenario = demoScenarios.find((item) => item.id === scenarioId) ?? demoScenarios[0];
  const [amount, setAmount] = useState(scenario.amount);

  const ranked = useMemo(() => {
    const ratio = amount / scenario.amount;
    return scenario.cards
      .map((card) => ({ ...card, liveReward: Math.max(0, Math.round(card.reward * ratio)) }))
      .sort((a, b) => b.liveReward - a.liveReward);
  }, [amount, scenario]);

  const chooseScenario = (id: string) => {
    const next = demoScenarios.find((item) => item.id === id) ?? demoScenarios[0];
    setScenarioId(id);
    setAmount(next.amount);
  };

  const winnerDelta = ranked.length > 1 ? ranked[0].liveReward - ranked[1].liveReward : 0;

  return (
    <div className="decision-shell">
      <div className="decision-controls">
        <div>
          <span className="micro-label">CHOOSE A PAYMENT MOMENT</span>
          <div className="scenario-tabs" role="tablist" aria-label="Demo purchase scenarios">
            {demoScenarios.map((item) => (
              <button
                key={item.id}
                type="button"
                className={item.id === scenario.id ? "scenario-tab active" : "scenario-tab"}
                onClick={() => chooseScenario(item.id)}
                role="tab"
                aria-selected={item.id === scenario.id}
              >
                {item.merchant}
              </button>
            ))}
          </div>
        </div>

        <label className="amount-control">
          <span className="micro-label">PURCHASE AMOUNT</span>
          <span className="amount-input-wrap">
            <span>₹</span>
            <input
              aria-label="Purchase amount in rupees"
              type="number"
              inputMode="numeric"
              min={100}
              max={100000}
              step={50}
              value={amount}
              onChange={(event) => setAmount(Math.max(100, Number(event.target.value) || 100))}
            />
          </span>
        </label>
      </div>

      <div className="decision-summary">
        <div>
          <span className="micro-label">KACHING WOULD PICK</span>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${scenario.id}-${ranked[0].name}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24 }}
            >
              <h3>{ranked[0].name}</h3>
              <p>{ranked[0].reason}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="winner-value">
          <span className="micro-label">DEMO VALUE BACK</span>
          <strong>{inr.format(ranked[0].liveReward)}</strong>
          <span>{winnerDelta > 0 ? `${inr.format(winnerDelta)} more than #2` : "Best available demo result"}</span>
        </div>
      </div>

      <div className="ranking-list" aria-live="polite">
        {ranked.map((card, index) => (
          <motion.div
            layout
            key={card.name}
            className={`ranking-card accent-${card.accent}`}
            transition={{ layout: { duration: 0.3 } }}
          >
            <span className="rank-number">0{index + 1}</span>
            <div>
              <strong>{card.name}</strong>
              <span>{scenario.category}</span>
            </div>
            <strong className="rank-reward">{inr.format(card.liveReward)}</strong>
          </motion.div>
        ))}
      </div>

      <p className="prototype-note">
        Prototype interaction only. These card names and reward figures are UX fixtures, not live financial recommendations. Production must use KaChing&apos;s real wallet + reward engine.
      </p>
    </div>
  );
}
