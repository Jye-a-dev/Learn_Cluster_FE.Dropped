// UserNavData.ts

export const ADMIN_NAV_LINKS= [
  { label: "Dashboard", href: "/admin/dashboard", highlight: "emerald" },
  { label: "Courses", href: "admin/courses", highlight: "lapis" },
  { label: "Study Date", href: "admin/studydate", highlight: "gold" },
  { label: "Notifications", href: "user/notificantions", highlight: "emerald" },
];

export const ADMIN_NAV_DROPDOWNS= [
  {
    label: "Resources",
    items: [
      { label: "Tutorials", href: "/resources/tutorials", highlight: "emerald" },
      { label: "Feature & Updates", href: "/resources/Updates", highlight: "lapis" },
      { label: "Terms & Conditions", href: "/resources/terms", highlight: "emerald" },
    ],
  },
];
