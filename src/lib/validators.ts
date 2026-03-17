import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.coerce.number().min(13).max(120).nullable().optional(),
  gender: z.enum(["male", "female", "other"]).nullable().optional(),
  sportPreference: z.enum(["run", "bike", "both"]).nullable().optional(),
  typicalPace: z.string().nullable().optional(),
  bio: z.string().max(500).nullable().optional(),
});

export const activitySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  sportType: z.enum(["RUN", "BIKE"]),
  distance: z.coerce.number().positive("Distance must be positive"),
  pace: z.string().optional(),
  startDateTime: z.string().min(1, "Start date/time is required"),
  endDateTime: z.string().optional(),
  startLat: z.coerce.number().min(-90).max(90),
  startLng: z.coerce.number().min(-180).max(180),
  routeGeoJSON: z.string().optional(),
  groupType: z.enum(["MALE", "FEMALE", "MIXED"]),
  description: z.string().max(1000).optional(),
  maxParticipants: z.coerce.number().int().positive().optional(),
  locationName: z.string().optional(),
});

export const feedbackSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().max(500).optional(),
  targetId: z.string().min(1),
  activityId: z.string().min(1),
});
