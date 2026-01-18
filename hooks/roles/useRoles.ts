"use client";

import { useEffect, useState } from "react";
import { getRoles, type Role } from "./getRoles";

export function useRoles() {
	const [roles, setRoles] = useState<Role[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let active = true;

		const fetchRoles = async () => {
			setLoading(true);
			try {
				const data = await getRoles();
				if (active) setRoles(data);
			} catch {
				if (active) setRoles([]);
			} finally {
				if (active) setLoading(false);
			}
		};

		fetchRoles();
		return () => {
			active = false;
		};
	}, []);

	return { roles, loading };
}
