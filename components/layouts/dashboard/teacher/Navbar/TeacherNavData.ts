export const TEACHER_NAV_LINKS = [
  { label: "Dashboard", href: "/teacher/dashboard", highlight: "emerald" },
  { label: "Discover Courses", href: "/teacher/courses", highlight: "lapis" },
  { label: "My Courses", href: "/teacher/courses/my", highlight: "gold" },
  { label: "Study Dates", href: "/teacher/study_dates", highlight: "emerald" },
];

export const TEACHER_NAV_DROPDOWNS = [
  {
    label: "Teacher Flow",
    items: [
      { label: "Teaching Scope", href: "/teacher/study_dates", highlight: "emerald" },
      { label: "My Sessions", href: "/teacher/my/study_dates", highlight: "lapis" },
    ],
  },
];
