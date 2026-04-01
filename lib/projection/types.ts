export type ProjectionQuestion = {
  id: string;
  label: string;
  placeholder: string;
  hint?: string;
  minLength?: number;
};

export type ProjectionAnswers = Record<string, string>;

export type ProjectionResult = {
  vision: string;
  clarity: string;
  nextStep: string;
};

export type ProjectionApiResponse = {
  success: boolean;
  result: ProjectionResult;
};

export type LeadRequest = {
  firstName: string;
  email: string;
  activity?: string;
  details?: string;
  answers?: ProjectionAnswers;
  projectionSnapshot?: ProjectionResult;
};
