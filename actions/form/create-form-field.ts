"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { AddFormFieldSchema } from "@/schemas/forms";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createFormField = async (
  formId: string,
  field: z.infer<typeof AddFormFieldSchema>
) => {
  const session = await currentUser();

  if (!session) {
    return { error: "Not authenticated" };
  }

  const existingUser = await getUserById(session.id);

  if (!existingUser) {
    return { error: "User does not exist" };
  }

  let newField;

  try {
    newField = await db.question.create({
      data: {
        ...field,
        options: field.options
          ? field.options.map((option) => option.value)
          : [],
        formId,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Error creating form field" };
  }

  revalidatePath(`/form/${formId}`);
  return { success: "Form Field Created Successfully!", data: newField };
};
