export type ProjectionQuestion = {
  id: string;
  label: string;
  placeholder: string;
  minLength?: number;
};

export type ProjectionAnswers = Record<string, string>;

export type ProjectionResult = {
  vision: string;
  centralMessage: string;
  userExperience: string;
  recommendedEntryPoint: string;
  closingNote: string;
};

export type ProjectionApiResponse = {
  success: boolean;
  result: ProjectionResult;
};

export type LeadRequest = {
  fullName: string;
  email: string;
  organization?: string;
  message?: string;
  projectionSnapshot?: ProjectionResult;
};
