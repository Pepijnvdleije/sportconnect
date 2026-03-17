import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ProfilePageClient } from "./ProfilePageClient";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      age: true,
      gender: true,
      profileImageUrl: true,
      sportPreference: true,
      typicalPace: true,
      bio: true,
      createdAt: true,
    },
  });

  if (!user) redirect("/login");

  const activityCount = await prisma.activity.count({
    where: { organizerId: user.id },
  });

  const avgRating = await prisma.feedback.aggregate({
    where: { targetId: user.id },
    _avg: { rating: true },
  });

  return (
    <ProfilePageClient
      user={user}
      activityCount={activityCount}
      averageRating={avgRating._avg.rating ?? 0}
    />
  );
}
