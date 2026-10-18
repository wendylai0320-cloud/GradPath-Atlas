export type PlanCurrency = "HKD" | "GBP" | "USD";

export const PLAN_CURRENCIES: { value: PlanCurrency; label: string }[] = [
  { value: "HKD", label: "HK$ (HKD)" },
  { value: "GBP", label: "£ (GBP)" },
  { value: "USD", label: "US$ (USD)" },
];

export const PLANS = [
  {
    id: "free",
    name: "Basic",
    tagline: "For students getting organised",
    period: "free forever",
    availability: "available",
    featured: false,
    maxProgrammes: 4,
    prices: { HKD: "HK$0", GBP: "£0", USD: "US$0" } as Record<PlanCurrency, string>,
    features: [
      "Up to 4 programmes",
      "Comparison table",
      "Deadline & task tracking",
      "Document tracker",
    ],
  },
  {
    id: "season",
    name: "Season Pass",
    tagline: "For one student’s application season",
    period: "12-month concept · test preview",
    availability: "test-preview",
    featured: true,
    maxProgrammes: 999,
    prices: { HKD: "HK$150", GBP: "£15", USD: "US$19" } as Record<PlanCurrency, string>,
    features: [
      "Unlimited programme tracking in preview",
      "CSV & printable summary export",
      "Adviser review sharing",
      "Shortlist & action plan",
    ],
  },
  {
    id: "licence",
    name: "Adviser / University",
    tagline: "For careers services and university teams",
    period: "team licence · enquiry only",
    availability: "enquiry-only",
    featured: false,
    maxProgrammes: 999,
    prices: { HKD: "HK$60", GBP: "£6", USD: "US$8" } as Record<PlanCurrency, string>,
    features: [
      "Multi-student review (planned)",
      "Team onboarding (planned)",
      "Institution-level tools (planned)",
      "Invoice billing (planned)",
    ],
  },
] as const;
export type PlanId = (typeof PLANS)[number]["id"];
export const planOf = (id: string | null | undefined) => PLANS.find((p) => p.id === id) ?? PLANS[0];

/** Display price for a plan in a currency (defaults to HKD). */
export function planPrice(
  plan: (typeof PLANS)[number],
  currency: string | null | undefined,
): string {
  const c = (currency ?? "HKD") as PlanCurrency;
  return plan.prices[c] ?? plan.prices.HKD;
}
