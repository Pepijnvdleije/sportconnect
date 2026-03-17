"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { StarRating } from "@/components/ui/StarRating";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { submitFeedback } from "@/actions/feedback";

type Participant = {
  id: string;
  name: string;
  profileImageUrl: string | null;
};

type FeedbackFormProps = {
  activityId: string;
  participants: Participant[];
  existingFeedback: Record<string, { rating: number; comment: string | null }>;
};

export function FeedbackForm({ activityId, participants, existingFeedback }: FeedbackFormProps) {
  const router = useRouter();
  const [ratings, setRatings] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const [targetId, fb] of Object.entries(existingFeedback)) {
      initial[targetId] = fb.rating;
    }
    return initial;
  });
  const [comments, setComments] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const [targetId, fb] of Object.entries(existingFeedback)) {
      initial[targetId] = fb.comment || "";
    }
    return initial;
  });
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<Set<string>>(new Set());

  async function handleSubmit(targetId: string) {
    setSubmitting(targetId);

    const formData = new FormData();
    formData.set("activityId", activityId);
    formData.set("targetId", targetId);
    formData.set("rating", (ratings[targetId] || 5).toString());
    formData.set("comment", comments[targetId] || "");

    const result = await submitFeedback(formData);

    setSubmitting(null);
    if (result?.success) {
      setSubmitted((prev) => new Set(prev).add(targetId));
    }
  }

  return (
    <div className="space-y-4">
      {participants.map((participant) => (
        <Card key={participant.id} className="p-4">
          <div className="flex items-center gap-3">
            <Avatar name={participant.name} imageUrl={participant.profileImageUrl} size="sm" />
            <span className="font-medium">{participant.name}</span>
            {(submitted.has(participant.id) || existingFeedback[participant.id]) && (
              <span className="text-xs text-green-600">Submitted</span>
            )}
          </div>
          <div className="mt-3">
            <StarRating
              value={ratings[participant.id] || 0}
              onChange={(v) => setRatings((prev) => ({ ...prev, [participant.id]: v }))}
            />
          </div>
          <div className="mt-2">
            <Textarea
              placeholder="Optional comment..."
              rows={2}
              value={comments[participant.id] || ""}
              onChange={(e) => setComments((prev) => ({ ...prev, [participant.id]: e.target.value }))}
            />
          </div>
          <div className="mt-2">
            <Button
              size="sm"
              loading={submitting === participant.id}
              disabled={!ratings[participant.id]}
              onClick={() => handleSubmit(participant.id)}
            >
              {existingFeedback[participant.id] ? "Update" : "Submit"} Feedback
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
