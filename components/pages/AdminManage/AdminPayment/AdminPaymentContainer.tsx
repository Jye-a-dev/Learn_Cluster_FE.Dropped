"use client";

import { useMemo, useState } from "react";
import {
	getPayments,
	addPayment,
	updatePayment,
	deletePayment,
	countPayments,
	type Payment as PaymentApi,
} from "@/hooks/payments/getPayment";

import { useBaseCrudContainer } from "../BaseModel/BaseCrudContainer";

import CreatePaymentButton from "./CreatePaymentButton";
import PaymentTable from "./PaymentTable";
import SearchPayment from "./SearchPayment";
import CreatePaymentModal from "./CreatePaymentModal";
import UpdatePaymentModal from "./UpdatePaymentModal";
import ConfirmDeletePaymentModal from "./ConfirmDeletePaymentModal";

import type {
	Payment,
	CreatePaymentPayload,
	UpdatePaymentPayload,
} from "./PaymentUIType";

type PaymentRaw = PaymentApi;

export default function AdminPaymentContainer() {
	const [search, setSearch] = useState("");

	const crud = useBaseCrudContainer<Payment>({
		fetchList: async () => {
			const data = (await getPayments()) as PaymentRaw[];

			return data.map((p) => ({
				...p,
				amount: p.amount !== null ? Number(p.amount) : null,
			}));
		},
		fetchCount: countPayments,
	});

	/* ================= CREATE ================= */

	async function handleCreate(data: CreatePaymentPayload) {
		await addPayment(data);

		crud.setOpenCreate(false);
		crud.refresh();
	}

	/* ================= UPDATE ================= */

	async function handleUpdate(
		id: string,
		data: UpdatePaymentPayload
	) {
		await updatePayment(id, data as never); // fix TS mismatch

		crud.setOpenUpdate(false);
		crud.setSelectedItem(null);
		crud.refresh();
	}

	/* ================= DELETE ================= */

	async function handleConfirmDelete(id: string) {
		await deletePayment(id);

		crud.setOpenDelete(false);
		crud.setDeleteTarget(null);
		crud.refresh();
	}

	/* ================= SEARCH ================= */

	const filtered = useMemo(() => {
		const q = search.toLowerCase();

		return crud.items.filter(
			(p) =>
				p.provider?.toLowerCase().includes(q) ||
				p.transaction_code?.toLowerCase().includes(q) ||
				p.order_id.toLowerCase().includes(q)
		);
	}, [crud.items, search]);

	return (
		<section className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-xl font-semibold text-white">
					Quản lý Payment | Tổng: {crud.totalCount}
				</h1>

				<CreatePaymentButton
					onClick={() => crud.setOpenCreate(true)}
				/>
			</div>

			<SearchPayment
				search={search}
				onSearchChange={setSearch}
			/>

			<PaymentTable
				payments={filtered}
				onEdit={(p) => {
					crud.setSelectedItem(p);
					crud.setOpenUpdate(true);
				}}
				onDelete={(p) => {
					crud.setDeleteTarget(p);
					crud.setOpenDelete(true);
				}}
			/>

			<CreatePaymentModal
				open={crud.openCreate}
				onClose={() => crud.setOpenCreate(false)}
				onSubmit={handleCreate}
			/>

			<UpdatePaymentModal
				open={crud.openUpdate}
				payment={crud.selectedItem}
				onClose={() => crud.setOpenUpdate(false)}
				onSubmit={handleUpdate}
			/>

			<ConfirmDeletePaymentModal
				open={crud.openDelete}
				Payment={crud.deleteTarget}
				onClose={() => crud.setOpenDelete(false)}
				onConfirm={handleConfirmDelete}
			/>
		</section>
	);
}