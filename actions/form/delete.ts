"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteForm(formId: string) {
  const session = await currentUser();

  if (!session) {
    return { error: "Not authenticated" };
  }

  const existingUser = await getUserById(session.id);

  if (!existingUser) {
    return { error: "User does not exist" };
  }

  try {
    await db.form.delete({
      where: {
        id: formId,
        userId: session.id,
      },
    });
  } catch (error) {
    return { error: "Error deleting form" };
  }

  revalidatePath("/dashboard");
  return { success: "Form deleted successfully!" };
}
