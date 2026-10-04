export const PLANS = [
  { id: "free", name: "Basic", tagline: "For getting organised", price: "£0", period: "forever", featured: false, maxProgrammes: 4,
    features: ["Up to 4 programmes", "Comparison table", "Deadline & task tracking", "Document tracker"] },
  { id: "season", name: "Season Pass", tagline: "For one full application season", price: "£19", period: "one-off, 12 months", featured: true, maxProgrammes: 999,
    features: ["Unlimited programmes", "CSV & printable summary export", "Adviser review sharing", "Shortlist & action plan"] },
  { id: "licence", name: "Adviser / University", tagline: "For careers & progression teams", price: "£6", period: "per student / season", featured: false, maxProgrammes: 999,
    features: ["Everything in Season Pass", "Review many students", "Team onboarding", "Invoice billing"] },
] as const;
export type PlanId = (typeof PLANS)[number]["id"];
export const planOf = (id: string | null | undefined) => PLANS.find((p) => p.id === id) ?? PLANS[0];
