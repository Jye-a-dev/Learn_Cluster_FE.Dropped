// UserNavData.ts

export interface NavLink {
  label: string;
  href: string;
  highlight?: "gold" | "emerald" | "lapis";
}

export interface NavDropdown {
  label: string;
  items: NavLink[];
  
}

export const USER_NAV_LINKS: NavLink[] = [
  { label: "Dashboard", href: "/user/dashboard", highlight: "emerald" },
  { label: "Courses", href: "user/courses", highlight: "lapis" },
  { label: "Study Date", href: "user/studydate", highlight: "gold" },
  { label: "Notifications", href: "user/notificantions", highlight: "emerald" },
];

export const USER_NAV_DROPDOWNS: NavDropdown[] = [
  {
    label: "Resources",
    items: [
      { label: "Tutorials", href: "/resources/tutorials", highlight: "emerald" },
      { label: "Feature & Updates", href: "/resources/Updates", highlight: "lapis" },
      { label: "Terms & Conditions", href: "/resources/terms", highlight: "emerald" },
    ],
  },
];
