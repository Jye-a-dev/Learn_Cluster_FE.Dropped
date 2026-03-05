"use client";

import { useMemo, useState } from "react";
import {
	getOrders,
	addOrder,
	updateOrder,
	deleteOrder,
	countOrders,
	type Order as OrderApi,
} from "@/hooks/orders/getOrder";

import { useBaseCrudContainer } from "../BaseModel/BaseCrudContainer";

import OrderTable from "./OrderTable";
import CreateOrderModal from "./CreateOrderModal";
import UpdateOrderModal from "./UpdateOrderModal";
import ConfirmDeleteOrderModal from "./ConfirmDeleteOrderModal";
import SearchOrder from "./SearchOrder";
import CreateOrderButton from "./CreateOrderButton";

import type {
	Order,
	CreateOrderPayload,
	UpdateOrderPayload,
} from "./OrderUiTypes";

type OrderRaw = OrderApi;

export default function AdminOrderContainer() {
	const [search, setSearch] = useState("");

	const crud = useBaseCrudContainer<Order>({
		fetchList: async () => {
			const orders = (await getOrders()) as OrderRaw[];

			return orders.map((o) => ({
				...o,
				total_amount: Number(o.total_amount),
				created_at: o.created_at ?? "",
			}));
		},
		fetchCount: countOrders,
	});

	/* ================= CREATE ================= */
	async function handleCreate(data: CreateOrderPayload) {
		await addOrder(data);
		crud.setOpenCreate(false);
		crud.refresh();
	}

	/* ================= EDIT ================= */
	function handleEdit(order: Order) {
		crud.setSelectedItem(order);
		crud.setOpenUpdate(true);
	}

	async function handleUpdate(
		id: string,
		data: UpdateOrderPayload
	) {
		await updateOrder(id, data);
		crud.setOpenUpdate(false);
		crud.setSelectedItem(null);
		crud.refresh();
	}

	/* ================= DELETE ================= */
	function handleDelete(order: Order) {
		crud.setDeleteTarget(order);
		crud.setOpenDelete(true);
	}

	async function handleConfirmDelete(id: string) {
		await deleteOrder(id);
		crud.setOpenDelete(false);
		crud.setDeleteTarget(null);
		crud.refresh();
	}

	/* ================= FILTER ================= */
	const filteredOrders = useMemo(() => {
		const q = search.toLowerCase();

		return crud.items.filter((o) =>
			o.user_id.toLowerCase().includes(q)
		);
	}, [crud.items, search]);

	/* ================= RENDER ================= */
	return (
		<section className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold text-white">
					Quản lý Order | Tổng order:{" "}
					{crud.totalCount}
				</h1>

			<CreateOrderButton
                onClick={() => crud.setOpenCreate(true)}
            />
			</div>

			{/* Search */}
			<SearchOrder
                search={search}
                onSearchChange={setSearch}
            />

			{crud.loading ? (
				<p className="text-white/60">
					Đang tải order…
				</p>
			) : (
				<OrderTable
					orders={filteredOrders}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			)}

			{/* CREATE */}
			<CreateOrderModal
				open={crud.openCreate}
				onClose={() =>
					crud.setOpenCreate(false)
				}
				onSubmit={handleCreate}
			/>

			{/* UPDATE */}
			<UpdateOrderModal
				open={crud.openUpdate}
				order={crud.selectedItem}
				onClose={() => {
					crud.setOpenUpdate(false);
					crud.setSelectedItem(null);
				}}
				onSubmit={handleUpdate}
			/>

			{/* DELETE */}
			<ConfirmDeleteOrderModal
				open={crud.openDelete}
				order={crud.deleteTarget}
				onClose={() => {
					crud.setOpenDelete(false);
					crud.setDeleteTarget(null);
				}}
				onConfirm={handleConfirmDelete}
			/>
		</section>
	);
}