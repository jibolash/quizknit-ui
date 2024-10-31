import { QuizTextInput } from "./QuizKnit";

function createRequest(path: string, init: RequestInit): Request {
    const origin = 'http://localhost:3000/';
    const apiPath = 'api/';
    const url = `${origin}${apiPath}${path}`;
    init.headers = { ...init.headers, 'X-BFF-CSRF': 'true' };
    return new Request(url, init);
}

export const QuizKnitApi = {
    async generateQuiz(
        textInput: QuizTextInput
    ): Promise<any> {
        const request = createRequest('quiz', {
            method: 'POST',
            body: JSON.stringify(textInput),
            headers: {
                'content-type': 'application/json',
            },
        });
        const response = await fetch(request);
        if (response.status !== 201) {
            throw new Error('Could not create quiz');
        }
        const createdQuiz = await response.json();
        return createdQuiz;
    },
}