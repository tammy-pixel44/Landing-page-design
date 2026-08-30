export type DemoCard = {
  name: string;
  reward: number;
  reason: string;
  accent: string;
};

export type DemoScenario = {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  cards: DemoCard[];
};

export const demoScenarios: DemoScenario[] = [
  {
    id: "food",
    merchant: "Food delivery",
    category: "Dining",
    amount: 1240,
    cards: [
      { name: "Everyday Plus", reward: 62, reason: "Dining multiplier wins before the demo cap.", accent: "lime" },
      { name: "Rewards Core", reward: 31, reason: "Solid base return, but no dining boost.", accent: "cream" },
      { name: "Travel Metal", reward: 12, reason: "Travel-heavy value is wasted on this purchase.", accent: "steel" },
    ],
  },
  {
    id: "flight",
    merchant: "Flight booking",
    category: "Travel",
    amount: 18500,
    cards: [
      { name: "Travel Metal", reward: 925, reason: "Travel category multiplier dominates this purchase.", accent: "lime" },
      { name: "Rewards Core", reward: 555, reason: "Strong general rewards, but lower travel value.", accent: "cream" },
      { name: "Everyday Plus", reward: 185, reason: "Everyday spend card falls back to its base rate.", accent: "steel" },
    ],
  },
  {
    id: "grocery",
    merchant: "Grocery basket",
    category: "Groceries",
    amount: 3200,
    cards: [
      { name: "Rewards Core", reward: 160, reason: "Grocery category value beats the rest of the wallet.", accent: "lime" },
      { name: "Everyday Plus", reward: 96, reason: "Useful everyday return, just not the highest here.", accent: "cream" },
      { name: "Travel Metal", reward: 32, reason: "Premium travel perks do not help this category.", accent: "steel" },
    ],
  },
  {
    id: "upi",
    merchant: "UPI merchant",
    category: "UPI",
    amount: 860,
    cards: [
      { name: "UPI Edge", reward: 43, reason: "The demo UPI reward rule makes it the clear winner.", accent: "lime" },
      { name: "Everyday Plus", reward: 17, reason: "Base reward applies, but no UPI-specific edge.", accent: "cream" },
      { name: "Rewards Core", reward: 9, reason: "This transaction misses its stronger categories.", accent: "steel" },
    ],
  },
];

export const issuerExamples = ["HDFC", "ICICI", "SBI", "AXIS", "KOTAK", "AMEX", "IDFC", "INDUSIND"];
