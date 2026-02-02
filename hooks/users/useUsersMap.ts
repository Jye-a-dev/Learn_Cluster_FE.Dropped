// src/hooks/users/useUsersMap.ts
"use client";

import { useEffect, useState } from "react";
import { getUsers, type User } from "@/hooks/users/getUsers";

export function useUsersMap() {
	const [usersMap, setUsersMap] = useState<Record<string, User>>({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getUsers()
			.then((users) => {
				const map: Record<string, User> = {};
				users.forEach((u) => {
					map[u.id] = u;
					
				});
				setUsersMap(map);
			})
			.finally(() => setLoading(false));
	}, []);

	return { usersMap, loading };
}
