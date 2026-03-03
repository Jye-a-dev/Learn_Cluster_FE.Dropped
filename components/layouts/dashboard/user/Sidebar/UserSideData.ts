// UserNavData.ts

export interface SideItem {
  label: string;
  href?: string;
  highlight?: "gold" | "emerald" | "lapis" | "ruby";
  items?: SideItem[];
}
export const USER_SIDEBAR_ITEMS: SideItem[] = [
  /* ================= MAIN ================= */
  { label: "My Courses", href: "/user/courses", highlight: "lapis" },
  { label: "Assignments", href: "/user/assignments", highlight: "emerald" },
  { label: "My Calendar", href: "/user/calendar", highlight: "lapis" },
  { label: "Progress & Badges", href: "/user/progress", highlight: "gold" },
  { label: "Settings", href: "/user/settings", highlight: "ruby" },

  /* ================= TOOLS ================= */
  {
    label: "Learning Tools",
    items: [
      { label: "Pomodoro Timer", href: "/user/tools/pomodoro" },
      { label: "Time Tracker", href: "/user/tools/time-tracker" },
      { label: "Calculator", href: "/user/tools/calculator" },
    ],
  },

  /* ================= KNOWLEDGE ================= */
  {
    label: "Knowledge",
    items: [
      { label: "My Notes", href: "/user/notes" },
      { label: "Bookmarks", href: "/user/bookmarks" },
      { label: "Study History", href: "/user/study-history" },
    ],
  },
];