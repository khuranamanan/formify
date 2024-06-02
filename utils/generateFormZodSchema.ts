import { QuestionWithOptions } from "@/types";
import { QuestionTypes } from "@prisma/client";
import { z } from "zod";

export function generateFormZodSchema(questions: QuestionWithOptions[]) {
  const schemaShape: Record<string, any> = {};

  questions.forEach((question) => {
    let fieldSchema;

    switch (question.type) {
      case QuestionTypes.TEXT:
      case QuestionTypes.TEXTAREA:
        fieldSchema = z.string();
        break;
      case QuestionTypes.RADIO:
      case QuestionTypes.SELECT:
        fieldSchema = z
          .string()
          .refine(
            (val) => question.options?.some((option) => option.id !== val),
            {
              message: "Invalid option",
            }
          );
        break;
      case QuestionTypes.CHECKBOX:
        fieldSchema = z.array(
          z
            .string()
            .refine(
              (val) => question.options?.some((option) => option.id !== val),
              {
                message: "Invalid option",
              }
            )
        );
        break;
      case QuestionTypes.DATE:
        fieldSchema = z.string().refine((val) => !isNaN(Date.parse(val)), {
          message: "Invalid date",
        });
        break;
      case QuestionTypes.TIME:
        fieldSchema = z
          .string()
          .refine((val) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(val), {
            message: "Invalid time",
          });
        break;
      case QuestionTypes.NUMBER:
        fieldSchema = z.number();
        break;
      case QuestionTypes.EMAIL:
        fieldSchema = z.string().email();
        break;
      case QuestionTypes.URL:
        fieldSchema = z.string().url();
        break;
      default:
        fieldSchema = z.string();
    }

    if (!question.required) {
      fieldSchema = fieldSchema.optional();
    }

    schemaShape[question.id] = fieldSchema;
  });

  return z.object(schemaShape);
}
