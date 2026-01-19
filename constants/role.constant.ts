export const ROLES = {
  ADMIN: "Admin",
  MODERATOR: "Moderator",
  STUDENT: "Student",
  TA:"TA",
  TEACHER:"Teacher",
} as const;

export type RoleName = (typeof ROLES)[keyof typeof ROLES];
