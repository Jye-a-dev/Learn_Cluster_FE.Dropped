"use client";

import { useState } from "react";

import AdminOverviewContainer from "./Overview/AdminOverviewContainer";
import AdminGraphContainer from "./Graph/AdminGraphContainer";

export default function AdminDashboardContainer() {
    const [activeTab, setActiveTab] = useState<"overview" | "grade">("overview");

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950/20 to-slate-900/40 p-8">

            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl text-center font-extrabold text-white tracking-tight">
                    Admin Dashboard
                </h1>
                <p className="mt-3 text-slate-400 text-center text-sm">
                    Tổng quan hệ thống & tăng trưởng dữ liệu
                </p>
                <div className="flex justify-center">
                    <div className="mt-5 h-1 w-42 bg-indigo-500 rounded-full" />
                </div>
            </div>

            {/* Switch Buttons */}
            <div className="flex justify-center gap-4 mb-10">
                <button
                    onClick={() => setActiveTab("overview")}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200
            ${activeTab === "overview"
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }`}
                >
                    Overview
                </button>

                <button
                    onClick={() => setActiveTab("grade")}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200
            ${activeTab === "grade"
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }`}
                >
                    Grade Management
                </button>
            </div>

            {/* Content */}
            <div className="transition-all duration-300">
                {activeTab === "overview" && <AdminOverviewContainer />}
                {activeTab === "grade" && <AdminGraphContainer />}
            </div>
        </div>
    );
}