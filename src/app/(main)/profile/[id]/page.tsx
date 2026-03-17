import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { FeedbackList } from "@/components/feedback/FeedbackList";

export default async function UserProfilePage({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
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

  if (!user) notFound();

  const activityCount = await prisma.activity.count({
    where: { organizerId: user.id },
  });

  const avgRating = await prisma.feedback.aggregate({
    where: { targetId: user.id },
    _avg: { rating: true },
  });

  const feedbacks = await prisma.feedback.findMany({
    where: { targetId: user.id },
    include: {
      author: { select: { id: true, name: true, profileImageUrl: true } },
      activity: { select: { title: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div>
      <PageHeader title={user.name} backButton />
      <ProfileCard user={user} activityCount={activityCount} averageRating={avgRating._avg.rating ?? 0} />
      {feedbacks.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-lg font-semibold">Reviews</h3>
          <FeedbackList feedbacks={feedbacks} />
        </div>
      )}
    </div>
  );
}
