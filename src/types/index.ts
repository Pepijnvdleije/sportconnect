import type { Activity, User, Participation, Feedback } from "@prisma/client";

export type ActivityWithOrganizer = Activity & {
  organizer: Pick<User, "id" | "name" | "profileImageUrl">;
  _count: {
    participations: number;
  };
};

export type ActivityWithDetails = Activity & {
  organizer: Pick<User, "id" | "name" | "profileImageUrl" | "typicalPace" | "sportPreference">;
  participations: (Participation & {
    user: Pick<User, "id" | "name" | "profileImageUrl">;
  })[];
  feedbacks: Feedback[];
};

export type ActivityFeedItem = ActivityWithOrganizer & {
  distanceFromUser?: number;
};

export type UserProfile = Pick<
  User,
  | "id"
  | "name"
  | "email"
  | "age"
  | "gender"
  | "profileImageUrl"
  | "sportPreference"
  | "typicalPace"
  | "bio"
  | "createdAt"
>;
