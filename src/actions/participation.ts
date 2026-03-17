"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function joinActivity(activityId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
    include: {
      _count: {
        select: { participations: { where: { status: "JOINED" } } },
      },
    },
  });

  if (!activity) return { error: "Activity not found" };

  if (activity.maxParticipants && activity._count.participations >= activity.maxParticipants) {
    return { error: "Activity is full" };
  }

  // Upsert to handle re-joining after leaving
  await prisma.participation.upsert({
    where: {
      userId_activityId: {
        userId: session.user.id,
        activityId,
      },
    },
    update: { status: "JOINED", leftAt: null },
    create: {
      userId: session.user.id,
      activityId,
      status: "JOINED",
    },
  });

  revalidatePath(`/activities/${activityId}`);
  return { success: true };
}

export async function leaveActivity(activityId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
  });

  if (!activity) return { error: "Activity not found" };

  // Don't let organizer leave their own activity
  if (activity.organizerId === session.user.id) {
    return { error: "Organizers cannot leave their own activity" };
  }

  await prisma.participation.update({
    where: {
      userId_activityId: {
        userId: session.user.id,
        activityId,
      },
    },
    data: { status: "LEFT", leftAt: new Date() },
  });

  revalidatePath(`/activities/${activityId}`);
  return { success: true };
}
