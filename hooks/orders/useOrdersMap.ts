"use client";

import { useEffect, useState } from "react";
import { getOrders, type Order } from "@/hooks/orders/getOrder";

export function useOrdersMap() {
	const [ordersMap, setOrdersMap] = useState<Record<string, Order>>({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getOrders()
			.then((orders) => {
				const map: Record<string, Order> = {};
				orders.forEach((o) => {
					map[o.id] = o;
				});
				setOrdersMap(map);
			})
			.finally(() => setLoading(false));
	}, []);

	return { ordersMap, loading };
}