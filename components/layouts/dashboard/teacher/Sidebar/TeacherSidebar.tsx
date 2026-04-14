"use client";

import BaseSidebar from "@/components/layouts/base/Sidebar/BaseSidebar";
import { TEACHER_SIDEBAR_ITEMS } from "./TeacherSideData";

export default function TeacherSidebar() {
    return (
        <BaseSidebar
            items={TEACHER_SIDEBAR_ITEMS}
            gradientClass="bg-linear-to-b from-yellow-800 to-lime-700"
        />
    );
}   
