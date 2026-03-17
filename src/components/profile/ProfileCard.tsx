import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SPORT_LABELS, type SportType } from "@/lib/constants";
import type { UserProfile } from "@/types";

type ProfileCardProps = {
  user: UserProfile;
  activityCount?: number;
  averageRating?: number;
};

export function ProfileCard({ user, activityCount, averageRating }: ProfileCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <Avatar name={user.name} imageUrl={user.profileImageUrl} size="lg" />
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {user.sportPreference && (
              <Badge variant="sport">
                {user.sportPreference === "both"
                  ? "Running & Cycling"
                  : SPORT_LABELS[user.sportPreference.toUpperCase() as SportType] || user.sportPreference}
              </Badge>
            )}
            {user.typicalPace && (
              <Badge>{user.typicalPace}</Badge>
            )}
            {user.gender && (
              <Badge variant="group">{user.gender}</Badge>
            )}
          </div>
        </div>
      </div>

      {user.bio && (
        <p className="mt-4 text-sm text-gray-600">{user.bio}</p>
      )}

      <div className="mt-4 flex gap-6 border-t border-gray-100 pt-4">
        {user.age && (
          <div>
            <p className="text-sm font-medium text-gray-900">{user.age}</p>
            <p className="text-xs text-gray-500">years</p>
          </div>
        )}
        {activityCount !== undefined && (
          <div>
            <p className="text-sm font-medium text-gray-900">{activityCount}</p>
            <p className="text-xs text-gray-500">activities</p>
          </div>
        )}
        {averageRating !== undefined && averageRating > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-900">{averageRating.toFixed(1)}</p>
            <p className="text-xs text-gray-500">avg rating</p>
          </div>
        )}
      </div>
    </Card>
  );
}
