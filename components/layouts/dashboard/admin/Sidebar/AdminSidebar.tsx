"use client";

import BaseSidebar from "@/components/layouts/base/Sidebar/BaseSidebar";
import { ADMIN_SIDEBAR_ITEMS } from "./AdminSideData";

export default function AdminSidebar() {
	return (
		<BaseSidebar
			items={ADMIN_SIDEBAR_ITEMS}
			gradientClass="bg-linear-to-b from-yellow-800 to-lime-700"
		/>
	);
}