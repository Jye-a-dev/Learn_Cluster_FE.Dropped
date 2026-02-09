// src/components/pages/AdminManage/StudyDateParticipant/SearchStudyDateParticipant.tsx
import BaseSearch from "@/components/pages/AdminManage/BaseModel/BaseSearch";

export default function SearchStudyDateParticipant(props: {
	search: string;
	onSearchChange: (v: string) => void;
}) {
	return (
		<BaseSearch
			value={props.search}
			onChange={props.onSearchChange}
			placeholder="Tìm theo học viên hoặc study date…"
			inputClassName="focus:ring-1 focus:ring-blue-500"
		/>
	);
}
