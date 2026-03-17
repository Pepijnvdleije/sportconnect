"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { activitySchema } from "@/lib/validators";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createActivity(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  const raw = {
    title: formData.get("title") as string,
    sportType: formData.get("sportType") as string,
    distance: formData.get("distance"),
    pace: (formData.get("pace") as string) || undefined,
    startDateTime: formData.get("startDateTime") as string,
    endDateTime: (formData.get("endDateTime") as string) || undefined,
    startLat: formData.get("startLat"),
    startLng: formData.get("startLng"),
    routeGeoJSON: (formData.get("routeGeoJSON") as string) || undefined,
    groupType: formData.get("groupType") as string,
    description: (formData.get("description") as string) || undefined,
    maxParticipants: formData.get("maxParticipants") || undefined,
    locationName: (formData.get("locationName") as string) || undefined,
  };

  const parsed = activitySchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const activity = await prisma.activity.create({
    data: {
      ...parsed.data,
      startDateTime: new Date(parsed.data.startDateTime),
      endDateTime: parsed.data.endDateTime ? new Date(parsed.data.endDateTime) : null,
      organizerId: session.user.id,
    },
  });

  // Organizer automatically joins
  await prisma.participation.create({
    data: {
      userId: session.user.id,
      activityId: activity.id,
      status: "JOINED",
    },
  });

  revalidatePath("/activities");
  redirect(`/activities/${activity.id}`);
}

export async function deleteActivity(activityId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
  });

  if (!activity || activity.organizerId !== session.user.id) {
    return { error: "Not authorized" };
  }

  await prisma.activity.delete({ where: { id: activityId } });

  revalidatePath("/activities");
  redirect("/activities");
}
