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

export const USER_SIDE_LINKS: SideLink[] = [
  { label: "My Courses", href: "/user/courses", highlight: "lapis" },
  { label: "Assignments", href: "/user/assignments", highlight: "emerald" },
  { label: "My Calendar", href: "/user/calendar", highlight: "lapis" },
  { label: "Progress & Badges", href: "/user/progress", highlight: "gold" },
{ label: "Settings", href: "/user/settings", highlight: "ruby" },
];

export const USER_SIDE_DROPDOWNS: SideDropdown[] = [
  {
    label: "Learning Tools",
    items: [
      { label: "Pomodoro Timer", href: "/user/tools/pomodoro" },
      { label: "Time Tracker", href: "/user/tools/time-tracker" },
      { label: "Calculator", href: "/user/tools/calculator" },
    ],
  },
];

export const USER_KNOWLEDGE_DROPDOWN: SideDropdown = {
  label: "Knowledge",
  items: [
    { label: "My Notes", href: "/user/notes" },
    { label: "Bookmarks", href: "/user/bookmarks" },
    { label: "Study History", href: "/user/study-history" },
  ],
};
