import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { formatDate } from "@/lib/utils";
import { SPORT_ICONS, SPORT_LABELS, GROUP_LABELS, type SportType, type GroupType } from "@/lib/constants";

type ActivityCardProps = {
  activity: {
    id: string;
    title: string;
    sportType: string;
    distance: number;
    pace: string | null;
    startDateTime: string | Date;
    groupType: string;
    locationName: string | null;
    maxParticipants: number | null;
    organizer: {
      id: string;
      name: string;
      profileImageUrl: string | null;
    };
    _count: {
      participations: number;
    };
    distanceFromUser?: number;
  };
};

export function ActivityCard({ activity }: ActivityCardProps) {
  const sportIcon = SPORT_ICONS[activity.sportType as SportType] || "";
  const sportLabel = SPORT_LABELS[activity.sportType as SportType] || activity.sportType;
  const groupLabel = GROUP_LABELS[activity.groupType as GroupType] || activity.groupType;

  return (
    <Link href={`/activities/${activity.id}`}>
      <Card className="transition-shadow hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">{sportIcon}</span>
              <h3 className="font-semibold text-gray-900">{activity.title}</h3>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {formatDate(activity.startDateTime)}
            </p>
          </div>
          {activity.distanceFromUser !== undefined && (
            <span className="text-xs text-gray-400">
              {activity.distanceFromUser} km away
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="sport">{sportLabel}</Badge>
          <Badge>{activity.distance} km</Badge>
          {activity.pace && <Badge>{activity.pace}</Badge>}
          <Badge variant="group">{groupLabel}</Badge>
        </div>

        {activity.locationName && (
          <p className="mt-2 text-xs text-gray-500">
            &#x1F4CD; {activity.locationName}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2">
            <Avatar name={activity.organizer.name} imageUrl={activity.organizer.profileImageUrl} size="sm" />
            <span className="text-sm text-gray-600">{activity.organizer.name}</span>
          </div>
          <span className="text-sm text-gray-500">
            {activity._count.participations}
            {activity.maxParticipants ? `/${activity.maxParticipants}` : ""} joined
          </span>
        </div>
      </Card>
    </Link>
  );
}
