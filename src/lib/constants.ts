export const SPORT_TYPES = ["RUN", "BIKE"] as const;
export type SportType = (typeof SPORT_TYPES)[number];

export const GROUP_TYPES = ["MALE", "FEMALE", "MIXED"] as const;
export type GroupType = (typeof GROUP_TYPES)[number];

export const SPORT_LABELS: Record<SportType, string> = {
  RUN: "Running",
  BIKE: "Cycling",
};

export const GROUP_LABELS: Record<GroupType, string> = {
  MALE: "Men only",
  FEMALE: "Women only",
  MIXED: "Mixed",
};

export const SPORT_ICONS: Record<SportType, string> = {
  RUN: "🏃",
  BIKE: "🚴",
};

export const ROTTERDAM_CENTER = {
  lat: 51.9225,
  lng: 4.4792,
};
