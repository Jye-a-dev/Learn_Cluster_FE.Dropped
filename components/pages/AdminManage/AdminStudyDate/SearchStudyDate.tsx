// src/components/pages/AdminManage/AdminStudyDate/SearchStudyDate.tsx
import BaseSearch from "@/components/pages/AdminManage/BaseModel/BaseSearch";

export default function SearchStudyDate(props: {
	search: string;
	onSearchChange: (v: string) => void;
}) {
	return (
		<BaseSearch
			value={props.search}
			onChange={props.onSearchChange}
			placeholder="Tìm theo tiêu đề hoặc địa điểm…"
			inputClassName="focus:ring-1 focus:ring-blue-500"
		/>
	);
}
