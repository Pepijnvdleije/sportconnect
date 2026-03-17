import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";
import { formatRelative } from "@/lib/utils";

type FeedbackItem = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date | string;
  author: {
    id: string;
    name: string;
    profileImageUrl: string | null;
  };
  activity?: {
    title: string;
  };
};

type FeedbackListProps = {
  feedbacks: FeedbackItem[];
};

export function FeedbackList({ feedbacks }: FeedbackListProps) {
  return (
    <div className="space-y-3">
      {feedbacks.map((fb) => (
        <Card key={fb.id} className="p-3">
          <div className="flex items-center gap-2">
            <Avatar name={fb.author.name} imageUrl={fb.author.profileImageUrl} size="sm" />
            <div className="flex-1">
              <p className="text-sm font-medium">{fb.author.name}</p>
              <p className="text-xs text-gray-400">{formatRelative(fb.createdAt)}</p>
            </div>
            <StarRating value={fb.rating} readonly size="sm" />
          </div>
          {fb.comment && (
            <p className="mt-2 text-sm text-gray-600">{fb.comment}</p>
          )}
          {fb.activity && (
            <p className="mt-1 text-xs text-gray-400">on: {fb.activity.title}</p>
          )}
        </Card>
      ))}
    </div>
  );
}
