"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { joinActivity, leaveActivity } from "@/actions/participation";

type JoinButtonProps = {
  activityId: string;
  isOrganizer: boolean;
  isJoined: boolean;
  isFull: boolean;
  isPast: boolean;
};

export function JoinButton({ activityId, isOrganizer, isJoined, isFull, isPast }: JoinButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (isPast) {
    return (
      <Button variant="secondary" disabled className="w-full">
        Activity ended
      </Button>
    );
  }

  if (isOrganizer) {
    return (
      <Button variant="secondary" disabled className="w-full">
        You&apos;re the organizer
      </Button>
    );
  }

  if (isJoined) {
    return (
      <Button
        variant="outline"
        className="w-full"
        loading={loading}
        onClick={async () => {
          setLoading(true);
          await leaveActivity(activityId);
          router.refresh();
          setLoading(false);
        }}
      >
        Leave Activity
      </Button>
    );
  }

  if (isFull) {
    return (
      <Button variant="secondary" disabled className="w-full">
        Activity is full
      </Button>
    );
  }

  return (
    <Button
      className="w-full"
      size="lg"
      loading={loading}
      onClick={async () => {
        setLoading(true);
        await joinActivity(activityId);
        router.refresh();
        setLoading(false);
      }}
    >
      Join Activity
    </Button>
  );
}
