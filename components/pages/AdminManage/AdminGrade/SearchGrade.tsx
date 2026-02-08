"use client";

import BaseSearch from "@/components/pages/AdminManage/BaseModel/BaseSearch";

export default function SearchGrade(props: {
	search: string;
	onSearchChange: (v: string) => void;
}) {
	return (
		<BaseSearch
			value={props.search}
			onChange={props.onSearchChange}
			placeholder="Tìm theo user hoặc course…"
		/>
	);
}
