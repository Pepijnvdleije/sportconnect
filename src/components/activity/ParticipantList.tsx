import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";

type Participant = {
  user: {
    id: string;
    name: string;
    profileImageUrl: string | null;
  };
  status: string;
};

type ParticipantListProps = {
  participants: Participant[];
  organizerId: string;
  maxParticipants?: number | null;
};

export function ParticipantList({ participants, organizerId, maxParticipants }: ParticipantListProps) {
  const joined = participants.filter((p) => p.status === "JOINED");

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">
          Participants ({joined.length}{maxParticipants ? `/${maxParticipants}` : ""})
        </h3>
      </div>
      <div className="space-y-2">
        {joined.map((participant) => (
          <Link
            key={participant.user.id}
            href={`/profile/${participant.user.id}`}
            className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
          >
            <Avatar name={participant.user.name} imageUrl={participant.user.profileImageUrl} size="sm" />
            <span className="text-sm font-medium text-gray-900">{participant.user.name}</span>
            {participant.user.id === organizerId && (
              <Badge variant="sport">Organizer</Badge>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
