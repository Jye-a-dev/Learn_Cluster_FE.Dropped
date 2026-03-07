// AdminSideData.ts

export interface SideItem {
	label: string;
	href?: string;
	highlight?: "gold" | "emerald" | "lapis" | "ruby";
	items?: SideItem[];
}
export const TEACHER_SIDEBAR_ITEMS: SideItem[] = [
	{ label: "Dashboard", href: "/teacher/dashboard", highlight: "lapis" },

	/* ================= COURSE ================= */
	{
		label: "Courses",
		items: [
			{ label: "My Courses", href: "/teacher/courses", highlight: "lapis" },
			{ label: "Create Course", href: "/teacher/courses/create", highlight: "emerald" },
			{ label: "Enrollments", href: "/teacher/enrollments", highlight: "gold" },
		],
	},

	/* ================= CONTENT ================= */
	{
		label: "Course Content",
		items: [
			{ label: "Chapters", href: "/teacher/chapters", highlight: "lapis" },
			{ label: "Lessons", href: "/teacher/lessons", highlight: "gold" },
		],
	},

	/* ================= ASSIGNMENT ================= */
	{
		label: "Assignments",
		items: [
			{ label: "Assignments", href: "/teacher/assignments", highlight: "gold" },
			{ label: "Submissions", href: "/teacher/submissions", highlight: "lapis" },
			{ label: "Grades", href: "/teacher/grades", highlight: "emerald" },
		],
	},

	/* ================= STUDY DATE ================= */
	{
		label: "Study Dates",
		items: [
			{ label: "Schedule", href: "/teacher/study-dates", highlight: "gold" },
			{ label: "Participants", href: "/teacher/studydate-participants", highlight: "emerald" },
		],
	},

	/* ================= COMMUNICATION ================= */
	{
		label: "Communication",
		items: [
			{ label: "Messages", href: "/teacher/messages", highlight: "lapis" },
			{ label: "Notifications", href: "/teacher/notifications", highlight: "gold" },
		],
	},

	/* ================= KNOWLEDGE ================= */
	{
		label: "Knowledge",
		items: [
			{ label: "My Notes", href: "/teacher/notes", highlight: "lapis" },
			{ label: "Bookmarks", href: "/teacher/bookmarks", highlight: "gold" },
		],
	},

	/* ================= TOOLS ================= */
	{
		label: "Tools",
		items: [
			{ label: "Pomodoro Timer", href: "/teacher/tools/pomodoro" },
			{ label: "Time Tracker", href: "/teacher/tools/time_tracker" },
			{ label: "Calculator", href: "/teacher/tools/calculator" },
		],
	},

	{ label: "Settings", href: "/teacher/settings", highlight: "ruby" },
];