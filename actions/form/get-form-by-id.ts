"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function getFormById(formId: string) {
  const session = await currentUser();

  let form;

  try {
    form = await db.form.findUnique({
      where: {
        id: formId,
      },
    });
  } catch (error) {
    return { error: "Error getting form" };
  }

  if (form?.isPublished) {
    return { data: form };
  }

  if (!session) {
    return { error: "Not authenticated" };
  }

  const existingUser = await getUserById(session.id);

  if (!existingUser) {
    return { error: "User does not exist" };
  }

  if (form?.userId !== session.id) {
    return { error: "Not authorized" };
  }

  return { data: form };
}
