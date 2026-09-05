import { describe, expect, it } from "vitest";

import { answerQuestion, type Turn } from "./retrieval";

describe("catalogue retrieval", () => {
  it("returns only available synthetic-stone products", () => {
    const result = answerQuestion("List all available synthetic-stone items.", []);

    expect(result.sources).toEqual(["R1001", "N2002", "E3002", "P5001"]);
    expect(result.text).not.toContain("B4002");
  });

  it("answers an exact product price question", () => {
    const result = answerQuestion("What is the price of the Pearl-Style Necklace?", []);

    expect(result.sources).toEqual(["N2001"]);
    expect(result.text).toContain("112000");
  });

  it("keeps a single-product focus for a follow-up", () => {
    const history: Turn[] = [
      { role: "assistant", text: "Selected", focus: ["B4001"], sources: ["B4001"] },
    ];

    const result = answerQuestion("What is its price?", history);

    expect(result.sources).toEqual(["B4001"]);
    expect(result.text).toContain("71000");
  });

  it("offers an in-stock alternative for an unavailable item", () => {
    const result = answerQuestion("Can I buy the Garnet Solitaire Ring today?", []);

    expect(result.sources).toEqual(["R1002"]);
    expect(result.text).toContain("out of stock");
    expect(result.text).toContain("Aurora Halo Ring");
  });

  it("refuses unsupported catalogue claims", () => {
    const result = answerQuestion("Do you offer delivery?", []);

    expect(result.sources).toEqual([]);
    expect(result.text).toContain("not in the sample catalogue");
  });
});
