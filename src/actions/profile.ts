"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { profileSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  const raw = {
    name: formData.get("name") as string,
    age: formData.get("age") ? Number(formData.get("age")) : null,
    gender: (formData.get("gender") as string) || null,
    sportPreference: (formData.get("sportPreference") as string) || null,
    typicalPace: (formData.get("typicalPace") as string) || null,
    bio: (formData.get("bio") as string) || null,
  };

  const parsed = profileSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: parsed.data,
  });

  revalidatePath("/profile");
  return { success: true };
}
