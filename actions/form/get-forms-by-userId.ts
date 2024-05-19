import { getUserById } from "@/data/user";
import { db } from "@/lib/db";

export async function getFormsByUserId(userId?: string) {
  if (!userId) {
    return { error: "No userId provided" };
  }

  const existingUser = await getUserById(userId);

  if (!existingUser) {
    return { error: "User does not exist" };
  }

  let forms;

  try {
    forms = await db.form.findMany({
      where: {
        userId: existingUser.id,
      },
      include: {
        questions: true,
      },
    });
  } catch (error) {
    return { error: "Error fetching forms" };
  }

  return {
    success: "Forms fetched successfully!",
    data: forms,
  };
}
