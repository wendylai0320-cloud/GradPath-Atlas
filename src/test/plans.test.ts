import { describe, expect, it } from "vitest";
import { personalPlanOf } from "@/lib/plans";

describe("personalPlanOf", () => {
  it("keeps Adviser / University plan labels within the Basic student limit", () => {
    expect(personalPlanOf("licence").id).toBe("free");
    expect(personalPlanOf("licence").maxProgrammes).toBe(4);
  });

  it("preserves the Season Pass test-preview student limit", () => {
    expect(personalPlanOf("season").id).toBe("season");
    expect(personalPlanOf("season").maxProgrammes).toBe(999);
  });
});
