// UserNavData.ts

export interface SideLink {
  label: string;
  href: string;
  highlight?: "gold" | "emerald" | "lapis" | "ruby";
}

export interface SideDropdown {
  label: string;
  items: SideLink[];
  
}

export const ADMIN_SIDE_LINKS: SideLink[] = [
  { label: "My Courses", href: "/admin/courses", highlight: "lapis" },
  { label: "Assignments", href: "/admin/assignments", highlight: "emerald" },
  { label: "My Calendar", href: "/admin/calendar", highlight: "lapis" },
  { label: "Progress & Badges", href: "/admin/progress", highlight: "gold" },
{ label: "Settings", href: "/admin/settings", highlight: "ruby" },
];

export const ADMIN_SIDE_DROPDOWNS: SideDropdown[] = [
  {
    label: "Learning Tools",
    items: [
      { label: "Pomodoro Timer", href: "/admin/tools/pomodoro" },
      { label: "Time Tracker", href: "/admin/tools/time-tracker" },
      { label: "Calculator", href: "/admin/tools/calculator" },
    ],
  },
];

export const ADMIN_KNOWLEDGE_DROPDOWN: SideDropdown = {
  label: "Knowledge",
  items: [
    { label: "My Notes", href: "/admin/notes" },
    { label: "Bookmarks", href: "/admin/bookmarks" },
    { label: "Study History", href: "/admin/study-history" },
  ],
};
