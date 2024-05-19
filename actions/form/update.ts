"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Form } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateForm(formId: string, data: Partial<Form>) {
  const session = await currentUser();

  if (!session) {
    return { error: "Not authenticated" };
  }

  const existingUser = await getUserById(session.id);

  if (!existingUser) {
    return { error: "User does not exist" };
  }

  try {
    await db.form.update({
      where: {
        id: formId,
        userId: session.id,
      },
      data,
    });
  } catch (error) {
    return { error: "Error updating form" };
  }

  revalidatePath("/dashboard");
  revalidatePath(`/form/${data.id}`);
  return { success: "Form updated successfully!" };
}
