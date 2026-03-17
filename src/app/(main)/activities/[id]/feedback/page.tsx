import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";

export default async function FeedbackPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const activity = await prisma.activity.findUnique({
    where: { id: params.id },
    include: {
      participations: {
        where: { status: "JOINED" },
        include: {
          user: { select: { id: true, name: true, profileImageUrl: true } },
        },
      },
    },
  });

  if (!activity) notFound();

  // Filter out the current user from participants to rate
  const otherParticipants = activity.participations
    .filter((p) => p.user.id !== session.user!.id)
    .map((p) => p.user);

  // Get existing feedback from this user for this activity
  const existingFeedback = await prisma.feedback.findMany({
    where: {
      authorId: session.user.id,
      activityId: activity.id,
    },
  });

  const feedbackMap: Record<string, { rating: number; comment: string | null }> = {};
  for (const fb of existingFeedback) {
    feedbackMap[fb.targetId] = { rating: fb.rating, comment: fb.comment };
  }

  return (
    <div>
      <PageHeader title={`Rate: ${activity.title}`} backButton />
      {otherParticipants.length > 0 ? (
        <FeedbackForm
          activityId={activity.id}
          participants={otherParticipants}
          existingFeedback={feedbackMap}
        />
      ) : (
        <p className="text-center text-sm text-gray-500 py-8">
          No other participants to rate.
        </p>
      )}
    </div>
  );
}
