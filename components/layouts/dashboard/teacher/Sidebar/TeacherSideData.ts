// AdminSideData.ts

export interface SideItem {
	label: string;
	href?: string;
	highlight?: "gold" | "emerald" | "lapis" | "ruby";
	items?: SideItem[];
}
export const TEACHER_SIDEBAR_ITEMS: SideItem[] = [
	{ label: "Workflow Dashboard", href: "/teacher/dashboard", highlight: "lapis" },

	{
		label: "Course Operations",
		items: [
			{ label: "Course Intake", href: "/teacher/courses", highlight: "lapis" },
			{ label: "Teaching Workspace", href: "/teacher/courses/my", highlight: "emerald" },
		],
	},

	{
		label: "Session Operations",
		items: [
			{ label: "Teaching Scope", href: "/teacher/study_dates", highlight: "gold" },
			{ label: "Sessions I Created", href: "/teacher/my/study_dates", highlight: "gold" },
		],
	},
];
