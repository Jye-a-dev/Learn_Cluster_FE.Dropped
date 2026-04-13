// AdminSideData.ts

export interface SideItem {
	label: string;
	href?: string;
	highlight?: "gold" | "emerald" | "lapis" | "ruby";
	items?: SideItem[];
}

export const ADMIN_SIDEBAR_ITEMS: SideItem[] = [
	/* ================= MAIN ================= */
	{ label: "My Calendar", href: "/admin/calendar", highlight: "lapis" },
	{ label: "Settings", href: "/admin/settings", highlight: "ruby" },

	/* ================= COURSE ================= */
	{
		label: "Course Management",
		items: [
			{ label: "Courses", href: "/admin/courses", highlight: "lapis" },
			{ label: "Chapters", href: "/admin/chapters", highlight: "lapis" },
			{ label: "Lessons", href: "/admin/lessons", highlight: "gold" },
			{ label: "Course Instructions", href: "/admin/course_instruction", highlight: "gold" },
			{ label: "Enrollments", href: "/admin/enrollments", highlight: "emerald" },
		],
	},

	/* ================= USER ================= */
	{
		label: "User Management",
		items: [
			{ label: "Users", href: "/admin/users", highlight: "lapis" },
			{ label: "Roles", href: "/admin/roles", highlight: "emerald" },
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
			{ label: "Study Dates", href: "/admin/study_dates", highlight: "gold" },
			{ label: "Participants", href: "/admin/studydate_participants", highlight: "gold" },
			{ label: "Lessons to Study", href: "/admin/studydate_lesson", highlight: "gold" },
		],
	},

	/* ================= STUDY MATCH ================= */
	{
		label: "Study Match Management",
		items: [
			{ label: "Profile", href: "/admin/study_profile", highlight: "emerald" },
			{ label: "Swipe", href: "/admin/study_swipe", highlight: "gold" },
			{ label: "Match", href: "/admin/study_match", highlight: "lapis" },
		],
	},

	/* ================= MESSAGE ================= */
	{
		label: "Message Management",
		items: [
			{ label: "Messages", href: "/admin/messages", highlight: "gold" },
			{ label: "Notes", href: "/admin/notes", highlight: "lapis" },
			{ label: "Bookmarks", href: "/admin/bookmarks", highlight: "lapis" },
			{ label: "Achievement", href: "/admin/achievement", highlight: "lapis" },
			{ label: "Notifications", href: "/admin/notifications", highlight: "lapis" },
		],
	},
	{
		label: "Payments",
		items: [
			{ label: "Plans", href: "/admin/plans" },
			{ label: "Orders", href: "/admin/orders/" },
			{ label: "Order items ", href: "/admin/order_items"},
			{ label: "Payments ", href: "/admin/payments"},
		],
	},
	/* ================= TOOLS ================= */
	{
		label: "Learning Tools",
		items: [
			{ label: "Pomodoro Timer", href: "/user/tools/pomodoro" },
			{ label: "Time Tracker", href: "/user/tools/time_tracker" },
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
