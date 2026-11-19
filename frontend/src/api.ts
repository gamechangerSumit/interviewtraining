export type CoachRequest = {
  role: string;
  experience: string;
  mode?: string;
  question?: string;
  answer?: string;
  previousContext?: string;
};

export type CoachResponse = {
  content: string;
  provider: string;
  model: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Request failed with status ${response.status}`);
  }
  return response.status === 204 ? (undefined as T) : response.json() as Promise<T>;
}

export const coachApi = {
  question: (data: CoachRequest) => request<CoachResponse>("/api/v1/coach/question", { method: "POST", body: JSON.stringify(data) }),
  evaluate: (data: CoachRequest) => request<CoachResponse>("/api/v1/coach/evaluate", { method: "POST", body: JSON.stringify(data) }),
  followUp: (data: CoachRequest) => request<CoachResponse>("/api/v1/coach/follow-up", { method: "POST", body: JSON.stringify(data) }),
};

export type PracticeQuestion = {
  id: string;
  prompt: string;
  category: string;
  targetRole?: string;
  difficulty: string;
  expectedThemes?: string;
  referenceAnswer?: string;
  createdAt: string;
};

export const questionApi = {
  list: () => request<PracticeQuestion[]>("/api/v1/questions"),
  create: (data: Omit<PracticeQuestion, "id" | "createdAt">) =>
    request<PracticeQuestion>("/api/v1/questions", { method: "POST", body: JSON.stringify(data) }),
};
