"use client";

import { useState } from "react";
import { createStudyDate } from "@/hooks/study_dates/getStudyDates";
import { useCurrentUser } from "@/hooks/users/useCurrentUser";
import axios from "axios";
export type CreateStudyDateInput = {
	courseId: string;
	title?: string;
	location?: string;
	scheduledAt?: string;
};

const formatDateTime = (value: string) => {
	const d = new Date(value);
	return d.toISOString().slice(0, 19).replace("T", " ");
};

export function useCreateStudyDateByTeacher() {
	const { user } = useCurrentUser();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<unknown>(null);

	const create = async (input: CreateStudyDateInput) => {
		if (!user?.id) throw new Error("User not found");
		if (!input.courseId) throw new Error("courseId is required");

		const payload = {
			course_id: input.courseId,
			title: input.title || "Untitled",
			location: input.location || "TBD",
			scheduled_at: input.scheduledAt ? formatDateTime(input.scheduledAt) : formatDateTime(new Date().toISOString()),
			created_by: user.id,
		};

		console.log("👉 PAYLOAD SEND:", payload);

		try {
			setLoading(true);
			setError(null);

			const res = await createStudyDate(payload);

			console.log("✅ CREATED ID:", res);

			return res;
		} catch (err: unknown) {
			console.error("❌ CREATE ERROR:", err);

			if (axios.isAxiosError(err)) {
				console.error("❌ RESPONSE:", err.response?.data);
				console.error("❌ STATUS:", err.response?.status);
			}

			setError(err);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return {
		create,
		loading,
		error,
	};
}
