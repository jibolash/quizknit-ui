import { Question, QuizTextInput } from "./QuizKnit";

function createRequest(path: string, init: RequestInit): Request {
  // const origin = "http://localhost:3000/";
  const origin = "https://quizknit-api.fly.dev/";
  const apiPath = "api/";
  const url = `${origin}${apiPath}${path}`;
  init.headers = { ...init.headers, "X-BFF-CSRF": "true" };
  return new Request(url, init);
}

export const QuizKnitApi = {
  async generateQuiz(textInput: QuizTextInput): Promise<any> {
    const request = createRequest("quiz", {
      method: "POST",
      body: JSON.stringify(textInput),
      headers: {
        "content-type": "application/json",
      },
    });
    const response = await fetch(request);
    if (response.status !== 201) {
      throw new Error("Could not create quiz");
    }
    const createdQuiz = await response.json();
    return JSON.parse(createdQuiz);
  },

  async saveQuiz(quiz: Question[]): Promise<any> {
    const request = createRequest("quiz/saveQuestions", {
      method: "POST",
      body: JSON.stringify({ quiz: quiz }),
      headers: {
        "content-type": "application/json",
      },
    });
    const response = await fetch(request);
    if (response.status !== 201) {
      throw new Error("Could not save questions");
    }
    const savedQuiz = await response.json();
    console.log("savedQuiz", savedQuiz);
    return savedQuiz.id;
  },

  async getQuizWithId(quizId: string): Promise<any> {
    const request = createRequest(`quiz/${quizId}`, { method: "GET" });
    const response = await fetch(request);
    if (response.status !== 200) {
      throw new Error("Could not get quiz");
    }
    const quizResponse = await response.json();
    return quizResponse.quiz;
  },
};
