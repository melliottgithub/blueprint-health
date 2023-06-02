import { Assessment, Question } from "../assessment/types";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const DefaultHeaders = {
    "Content-Type": "application/json",
};

export const post = async <T, R>(url: string, body: T) => {
  const response = await fetch(url, {
    method: "POST",
    headers: DefaultHeaders,
    body: JSON.stringify(body),
    mode: "cors",
  });
  return response.json() as R;
};

export const get = async <R>(url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: DefaultHeaders,
    mode: "cors",
  });
  return response.json() as R;
};

type Response = {
    error?: string;
}

type GetQuestionResponse = Response & Question[];

export const getQuestions = async (): Promise<GetQuestionResponse> => {
    const response = await get<GetQuestionResponse>(`${API_BASE_URL}/question`);
    return response;
}

type CreateAssessmentResponse = Response & {
    results: string[];
};

type CreateAssessmentRequest = {
    answers: {
        question_id: string;
        value: number;
    }[];
}

export const createAssessment = async (assessment: Assessment) => {
    let payload: CreateAssessmentRequest = { answers: [] };
    payload.answers = assessment.answers.map((e) => 
      ({ question_id: e.question.id, value: parseInt(e.value) }));

    const response = await post<CreateAssessmentRequest, CreateAssessmentResponse>(
        `${API_BASE_URL}/assessment`, payload
    );
    return response;
}
