// AdminSideData.ts

export interface SideItem {
	label: string;
	href?: string;
	highlight?: "gold" | "emerald" | "lapis" | "ruby";
	items?: SideItem[];
}

export const ADMIN_SIDEBAR_ITEMS: SideItem[] = [
	/* ================= MAIN ================= */
	{ label: "Assignments", href: "/admin/assignments", highlight: "emerald" },
	{ label: "My Calendar", href: "/admin/calendar", highlight: "lapis" },
	{ label: "Progress & Badges", href: "/admin/progress", highlight: "gold" },
	{ label: "Settings", href: "/admin/settings", highlight: "ruby" },

	/* ================= COURSE ================= */
	{
		label: "Course Management",
		items: [
			{ label: "Courses", href: "/admin/courses", highlight: "lapis" },
			{ label: "Chapters", href: "/admin/chapters", highlight: "lapis" },
			{ label: "Lessons", href: "/admin/lessons", highlight: "gold" },
			{ label: "Course Instructions", href: "/admin/course-instruction", highlight: "gold" },
			{ label: "Enrollments", href: "/admin/enrollments", highlight: "emerald" },
		],
	},

	/* ================= USER ================= */
	{
		label: "User Management",
		items: [
			{ label: "Users", href: "/admin/users", highlight: "lapis" },
			{ label: "Roles", href: "/admin/roles", highlight: "emerald" },
			{ label: "Permissions", href: "/admin/permissions", highlight: "gold" },
			{ label: "Role Permissions", href: "/admin/role-permissions", highlight: "emerald" },
		],
	},

	/* ================= TASK ================= */
	{
		label: "Task Management",
		items: [
			{ label: "Assignments", href: "/admin/assignments", highlight: "gold" },
			{ label: "Submissions", href: "/admin/submissions", highlight: "lapis" },
			{ label: "Grades", href: "/admin/grades", highlight: "emerald" },
		],
	},

	/* ================= STUDY DATE ================= */
	{
		label: "Study Date Management",
		items: [
			{ label: "Study Dates", href: "/admin/study-dates", highlight: "gold" },
			{ label: "Participants", href: "/admin/studydate-participants", highlight: "gold" },
			{ label: "Lessons to Study", href: "/admin/studydate-lessons", highlight: "gold" },
		],
	},

	/* ================= STUDY MATCH ================= */
	{
		label: "Study Match Management",
		items: [
			{ label: "Profile", href: "/admin/study_profile", highlight: "emerald" },
			{ label: "Requests", href: "/admin/study-match-requests", highlight: "gold" },
			{ label: "Reports", href: "/admin/study-match-reports", highlight: "lapis" },
		],
	},

	/* ================= MESSAGE ================= */
	{
		label: "Message Management",
		items: [
			{ label: "Messages", href: "/admin/messages", highlight: "gold" },
			{ label: "Notes", href: "/admin/notes", highlight: "lapis" },
			{ label: "Bookmarks", href: "/admin/bookmarks", highlight: "lapis" },
			{ label: "Achievements", href: "/admin/achievements", highlight: "lapis" },
			{ label: "Notifications", href: "/admin/notifications", highlight: "lapis" },
		],
	},

	/* ================= TOOLS ================= */
	{
		label: "Learning Tools",
		items: [
			{ label: "Pomodoro Timer", href: "/admin/tools/pomodoro" },
			{ label: "Time Tracker", href: "/admin/tools/time-tracker" },
			{ label: "Calculator", href: "/admin/tools/calculator" },
		],
	},

	/* ================= KNOWLEDGE ================= */
	{
		label: "Knowledge",
		items: [
			{ label: "My Notes", href: "/admin/notes" },
			{ label: "Bookmarks", href: "/admin/bookmarks" },
			{ label: "Study History", href: "/admin/study-history" },
		],
	},
];
