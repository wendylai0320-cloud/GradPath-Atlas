// Pre-loaded mock programme records used for keyword search + auto-fill.
// Figures are illustrative demo values, not official admissions data.
export type Preset = {
  university: string;
  acronym: string;
  country: string;
  name: string;
  degree: string;
  tuition: number;
  currency: string;
  english: string;
  intake: string;
  deadline: string; // YYYY-MM-DD
  keywords?: string;
};

export const PRESETS: Preset[] = [
  { university: "The Chinese University of Hong Kong", acronym: "CUHK", country: "Hong Kong", name: "Business Analytics", degree: "MSc", tuition: 390000, currency: "HKD", english: "IELTS 6.5 / TOEFL 79", intake: "September 2027", deadline: "2027-01-31", keywords: "analytics data" },
  { university: "The Chinese University of Hong Kong", acronym: "CUHK", country: "Hong Kong", name: "Finance", degree: "MSc", tuition: 430000, currency: "HKD", english: "IELTS 6.5 / TOEFL 79", intake: "September 2027", deadline: "2027-02-28", keywords: "finance investment" },
  { university: "The Chinese University of Hong Kong", acronym: "CUHK", country: "Hong Kong", name: "Marketing", degree: "MSc", tuition: 360000, currency: "HKD", english: "IELTS 6.5 / TOEFL 79", intake: "September 2027", deadline: "2027-03-15", keywords: "marketing brand" },
  { university: "The University of Hong Kong", acronym: "HKU", country: "Hong Kong", name: "Finance", degree: "Master", tuition: 462000, currency: "HKD", english: "IELTS 7.0 / TOEFL 100", intake: "September 2027", deadline: "2027-01-15", keywords: "mfin finance" },
  { university: "The University of Hong Kong", acronym: "HKU", country: "Hong Kong", name: "Computer Science", degree: "MSc", tuition: 288000, currency: "HKD", english: "IELTS 6.0 / TOEFL 80", intake: "September 2027", deadline: "2027-02-01", keywords: "computing cs" },
  { university: "Hong Kong University of Science and Technology", acronym: "HKUST", country: "Hong Kong", name: "Big Data Technology", degree: "MSc", tuition: 250000, currency: "HKD", english: "IELTS 6.5 / TOEFL 80", intake: "September 2027", deadline: "2027-03-31", keywords: "data science" },
  { university: "London School of Economics", acronym: "LSE", country: "United Kingdom", name: "Data Science", degree: "MSc", tuition: 36000, currency: "GBP", english: "IELTS 7.0 / TOEFL 100", intake: "September 2027", deadline: "2027-01-20", keywords: "data statistics" },
  { university: "London School of Economics", acronym: "LSE", country: "United Kingdom", name: "Finance", degree: "MSc", tuition: 44000, currency: "GBP", english: "IELTS 7.0 / TOEFL 100", intake: "September 2027", deadline: "2027-01-10", keywords: "finance" },
  { university: "Imperial College London", acronym: "Imperial", country: "United Kingdom", name: "Business Analytics", degree: "MSc", tuition: 42500, currency: "GBP", english: "IELTS 7.0 / TOEFL 100", intake: "September 2027", deadline: "2027-03-01", keywords: "analytics data" },
  { university: "University College London", acronym: "UCL", country: "United Kingdom", name: "Business Analytics", degree: "MSc", tuition: 38300, currency: "GBP", english: "IELTS 7.0 / TOEFL 100", intake: "September 2027", deadline: "2027-03-29", keywords: "analytics" },
  { university: "University of Edinburgh", acronym: "Edinburgh", country: "United Kingdom", name: "Marketing Analytics", degree: "MSc", tuition: 31300, currency: "GBP", english: "IELTS 7.0 / TOEFL 100", intake: "September 2027", deadline: "2027-04-30", keywords: "marketing analytics" },
  { university: "Columbia University", acronym: "Columbia", country: "United States", name: "Business Analytics", degree: "MSc", tuition: 68000, currency: "USD", english: "TOEFL 100 / IELTS 7.0", intake: "Fall 2027", deadline: "2027-02-15", keywords: "analytics" },
  { university: "National University of Singapore", acronym: "NUS", country: "Singapore", name: "Business Analytics", degree: "MSc", tuition: 58000, currency: "SGD", english: "IELTS 7.0 / TOEFL 100", intake: "August 2027", deadline: "2027-01-31", keywords: "analytics data" },
];

export function searchPresets(q: string): Preset[] {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return PRESETS.filter((p) => {
    const hay = `${p.acronym} ${p.university} ${p.degree} ${p.name} ${p.country} ${p.keywords ?? ""}`.toLowerCase();
    return terms.every((t) => hay.includes(t));
  }).slice(0, 8);
}
