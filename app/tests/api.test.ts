import { getQuestion } from "../api/qa_api";

describe("Questions (correct index)", () => {
  it("should return a question with 4 answers", () => {
    const response = getQuestion(0);
    expect(response).toHaveProperty("text");
    expect(response).toHaveProperty("answers");
    expect(response?.answers).toHaveLength(4);
  });
});

describe("Questions (wrong index)", () => {
  it("should return null", () => {
    const response = getQuestion(10);
    expect(response).toBeNull();
  });
});
