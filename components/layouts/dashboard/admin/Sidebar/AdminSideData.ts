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

/* ===================== LINKS (KHÔNG GỘP) ===================== */

export const ADMIN_SIDE_LINKS: SideLink[] = [
	{ label: "Assignments", href: "/admin/assignments", highlight: "emerald" },
	{ label: "My Calendar", href: "/admin/calendar", highlight: "lapis" },
	{ label: "Progress & Badges", href: "/admin/progress", highlight: "gold" },
	{ label: "Settings", href: "/admin/settings", highlight: "ruby" },
];

/* ===================== DROPDOWNS ===================== */

export const ADMIN_SIDE_DROPDOWNS: SideDropdown[] = [
	{
		label: "Manage",
		items: [
			{ label: "Courses", href: "/admin/courses", highlight: "lapis" },
			{ label: "Chapers", href: "/admin/chapters", highlight: "lapis" },
			{ label: "Lessons", href: "/admin/lessons", highlight: "gold" },
			{ label: "Permission", href: "/admin/permissions", highlight: "gold" },
			{ label: "Roles Permission", href: "/admin/roleallow", highlight: "emerald" },
			{ label: "Users", href: "/admin/users", highlight: "lapis" },
			{ label: "Roles", href: "/admin/roles", highlight: "emerald" },
		],
	},
	{
		label: "Learning Tools",
		items: [
			{ label: "Pomodoro Timer", href: "/admin/tools/pomodoro" },
			{ label: "Time Tracker", href: "/admin/tools/time-tracker" },
			{ label: "Calculator", href: "/admin/tools/calculator" },
		],
	},
	{
		label: "Knowledge",
		items: [
			{ label: "My Notes", href: "/admin/notes" },
			{ label: "Bookmarks", href: "/admin/bookmarks" },
			{ label: "Study History", href: "/admin/study-history" },
		],
	},
];
