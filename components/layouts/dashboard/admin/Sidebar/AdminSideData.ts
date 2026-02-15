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
		label: "Manage Courses",
		items: [
			{ label: "Courses", href: "/admin/courses", highlight: "lapis" },
			{ label: "Enrollments", href: "/admin/enrollments", highlight: "emerald" },
			{ label: "Chapers", href: "/admin/chapters", highlight: "lapis" },
			{ label: "Lessons", href: "/admin/lessons", highlight: "gold" },
			{ label: "Course Instruction", href: "/admin/course_instruction", highlight: "gold" },
		],
	},
	{
		label: "Manage User",
		items: [
			{ label: "Permission", href: "/admin/permissions", highlight: "gold" },
			{ label: "Roles Permission", href: "/admin/roleallow", highlight: "emerald" },
			{ label: "Users", href: "/admin/users", highlight: "lapis" },
			{ label: "Roles", href: "/admin/roles", highlight: "emerald" },
		],
	},
	{
		label: "Manage Task",
		items: [
			{ label: "Assignments", href: "/admin/assignments", highlight: "gold" },
			{ label: "Submissions", href: "/admin/submissions", highlight: "lapis" },
			{ label: "Grades", href: "/admin/grades", highlight: "emerald" },
		],
	},
	{
		label: "Manage Study date",
		items: [
			{ label: "Study dates", href: "/admin/study_dates", highlight: "gold" },
			{ label: "Participants", href: "/admin/studydate_participants", highlight: "gold" },
			{ label: "Lesson to study", href: "/admin/studydate_lesson", highlight: "gold" },
		],
	},
	{
		label: "Manage Messages",
		items: [
			{ label: "Messages", href: "/admin/message", highlight: "gold" },
			{ label: "Notes", href: "/admin/note", highlight: "lapis" },
			{ label: "Bookmark", href: "/admin/bookmark", highlight: "lapis" },
			{ label: "Achievment", href: "/admin/achievment", highlight: "lapis" },
			{ label: "Nofitication", href: "/admin/nofitication", highlight: "lapis" },
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
