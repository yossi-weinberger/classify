"use server";

import { revalidatePath } from "next/cache";

export async function revalidateStudentCache(classId) {
  revalidatePath(`/classes/${classId}`);
  revalidatePath("/students");
  revalidatePath("/");
}
