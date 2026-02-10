// src/components/pages/AdminManage/AdminStudyDateLesson/SearchStudyDateLesson.tsx
import BaseSearch from "@/components/pages/AdminManage/BaseModel/BaseSearch";

export default function SearchStudyDateLesson(props: {
	search: string;
	onSearchChange: (v: string) => void;
}) {
	return (
		<BaseSearch
			value={props.search}
			onChange={props.onSearchChange}
			placeholder="Tìm theo study date hoặc lesson…"
			inputClassName="focus:ring-1 focus:ring-blue-500"
		/>
	);
}
