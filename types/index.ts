import { Form, Question, QuestionTypes } from "@prisma/client";

export type Option = {
  id: string;
  value: string;
};

export type QuestionWithOptions = {
  id: string;
  title: string;
  description?: string;
  required: boolean;
  type: QuestionTypes;
  options?: Option[];
  formId: string;
  Form?: Form;
};

export type FormWithQuestions = Form & { questions: QuestionWithOptions[] };
