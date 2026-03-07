"use client";

import BaseSidebar from "@/components/layouts/base/Sidebar/BaseSidebar";
import { TEACHER_SIDEBAR_ITEMS } from "./TeacherSideData";

export default function AdminSidebar() {
    return (
        <BaseSidebar
            items={TEACHER_SIDEBAR_ITEMS}
            gradientClass="bg-linear-to-b from-yellow-800 to-lime-700"
        />
    );
}   