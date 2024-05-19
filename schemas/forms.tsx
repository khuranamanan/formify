import { z } from "zod";

export const AddFormFieldSchema = z
  .object({
    title: z.string().min(1, {
      message: "Title is required",
    }),
    description: z.string().optional(),
    required: z.boolean().optional(),
    type: z.enum([
      "TEXT",
      "TEXTAREA",
      "RADIO",
      "CHECKBOX",
      "SELECT",
      "DATE",
      "TIME",
      "NUMBER",
      "EMAIL",
      "URL",
    ]),
    options: z
      .object({
        value: z.string(),
      })
      .array()
      .optional(),
  })
  .superRefine((data, ctx) => {
    const { type, options } = data;
    if (
      (type === "RADIO" || type === "CHECKBOX" || type === "SELECT") &&
      (!options || options.length < 2 || !options.every((o) => o.value.trim()))
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Options are required when type is RADIO, CHECKBOX, or SELECT. Minimum 2 options required.",
        path: ["options"],
      });
    }
  });
