"use client";

import BaseSearch from "@/components/pages/AdminManage/BaseModel/BaseSearch";

export default function SearchMessage(props: {
	search: string;
	onSearchChange: (v: string) => void;
}) {
	return (
		<BaseSearch
			value={props.search}
			onChange={props.onSearchChange}
			placeholder="Tìm theo nội dung hoặc sender…"
		/>
	);
}
