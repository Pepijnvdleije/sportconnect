"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { feedbackSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";

export async function submitFeedback(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const raw = {
    rating: formData.get("rating"),
    comment: (formData.get("comment") as string) || undefined,
    targetId: formData.get("targetId") as string,
    activityId: formData.get("activityId") as string,
  };

  const parsed = feedbackSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  // Can't rate yourself
  if (parsed.data.targetId === session.user.id) {
    return { error: "You cannot rate yourself" };
  }

  // Check if both users participated
  const participation = await prisma.participation.findUnique({
    where: {
      userId_activityId: {
        userId: session.user.id,
        activityId: parsed.data.activityId,
      },
    },
  });

  if (!participation || participation.status !== "JOINED") {
    return { error: "You must have participated in this activity" };
  }

  await prisma.feedback.upsert({
    where: {
      authorId_targetId_activityId: {
        authorId: session.user.id,
        targetId: parsed.data.targetId,
        activityId: parsed.data.activityId,
      },
    },
    update: {
      rating: parsed.data.rating,
      comment: parsed.data.comment || null,
    },
    create: {
      authorId: session.user.id,
      targetId: parsed.data.targetId,
      activityId: parsed.data.activityId,
      rating: parsed.data.rating,
      comment: parsed.data.comment || null,
    },
  });

  revalidatePath(`/activities/${parsed.data.activityId}/feedback`);
  return { success: true };
}
