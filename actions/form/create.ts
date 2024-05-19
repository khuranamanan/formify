"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createForm() {
  const session = await currentUser();

  if (!session) {
    return { error: "Not authenticated" };
  }

  const existingUser = await getUserById(session.id);

  if (!existingUser) {
    return { error: "User does not exist" };
  }

  let newForm;

  try {
    newForm = await db.form.create({
      data: {
        title: "Untitled Form",
        response: {},
        userId: session.id,
      },
    });
  } catch (error) {
    return { error: "Error creating form" };
  }

  revalidatePath("/dashboard");
  return { success: "Form Created Successfully!", data: newForm };
}
