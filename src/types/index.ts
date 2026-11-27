export type UserRole = "attendee" | "organizer";

export const USER_ROLE = {
  attendee: "attendee",
  organizer: "organizer",
} as const;
