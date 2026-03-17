import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { MapView } from "@/components/map/MapView";
import { ParticipantList } from "@/components/activity/ParticipantList";
import { JoinButton } from "@/components/activity/JoinButton";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatDate } from "@/lib/utils";
import { SPORT_ICONS, SPORT_LABELS, GROUP_LABELS, type SportType, type GroupType } from "@/lib/constants";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function ActivityDetailPage({ params }: { params: { id: string } }) {
  const session = await auth();

  const activity = await prisma.activity.findUnique({
    where: { id: params.id },
    include: {
      organizer: {
        select: { id: true, name: true, profileImageUrl: true, typicalPace: true, sportPreference: true },
      },
      participations: {
        include: {
          user: { select: { id: true, name: true, profileImageUrl: true } },
        },
      },
      feedbacks: true,
    },
  });

  if (!activity) notFound();

  const isOrganizer = session?.user?.id === activity.organizerId;
  const joinedParticipants = activity.participations.filter((p) => p.status === "JOINED");
  const isJoined = joinedParticipants.some((p) => p.user.id === session?.user?.id);
  const isFull = activity.maxParticipants ? joinedParticipants.length >= activity.maxParticipants : false;
  const isPast = new Date(activity.startDateTime) < new Date();

  const sportIcon = SPORT_ICONS[activity.sportType as SportType] || "";
  const sportLabel = SPORT_LABELS[activity.sportType as SportType] || activity.sportType;
  const groupLabel = GROUP_LABELS[activity.groupType as GroupType] || activity.groupType;

  return (
    <div>
      <PageHeader title="" backButton />

      <Card className="p-6">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{sportIcon}</span>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{activity.title}</h1>
            <p className="text-sm text-gray-500">{formatDate(activity.startDateTime)}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="sport">{sportLabel}</Badge>
          <Badge>{activity.distance} km</Badge>
          {activity.pace && <Badge>{activity.pace}</Badge>}
          <Badge variant="group">{groupLabel}</Badge>
        </div>

        {activity.description && (
          <p className="mt-4 text-sm text-gray-600">{activity.description}</p>
        )}

        {activity.locationName && (
          <p className="mt-3 text-sm text-gray-500">
            &#x1F4CD; {activity.locationName}
          </p>
        )}

        <div className="mt-4">
          <MapView
            lat={activity.startLat}
            lng={activity.startLng}
            routeGeoJSON={activity.routeGeoJSON}
            className="h-48"
          />
        </div>

        <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
          <Link href={`/profile/${activity.organizer.id}`} className="flex items-center gap-2">
            <Avatar name={activity.organizer.name} imageUrl={activity.organizer.profileImageUrl} size="sm" />
            <div>
              <p className="text-sm font-medium text-gray-900">{activity.organizer.name}</p>
              <p className="text-xs text-gray-500">Organizer</p>
            </div>
          </Link>
        </div>
      </Card>

      <div className="mt-4">
        <JoinButton
          activityId={activity.id}
          isOrganizer={isOrganizer}
          isJoined={isJoined}
          isFull={isFull}
          isPast={isPast}
        />
      </div>

      {isPast && isJoined && (
        <div className="mt-3">
          <Link href={`/activities/${activity.id}/feedback`}>
            <Button variant="outline" className="w-full">
              Leave Feedback
            </Button>
          </Link>
        </div>
      )}

      <div className="mt-6">
        <Card className="p-4">
          <ParticipantList
            participants={activity.participations}
            organizerId={activity.organizerId}
            maxParticipants={activity.maxParticipants}
          />
        </Card>
      </div>
    </div>
  );
}
