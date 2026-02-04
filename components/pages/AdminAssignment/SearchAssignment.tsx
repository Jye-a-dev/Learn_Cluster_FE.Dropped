import BaseSearch from "@/components/pages/AdminManage/BaseModel/BaseSearch";

export default function SearchAssignment(props: {
	search: string;
	onSearchChange: (v: string) => void;
}) {
	return (
		<BaseSearch
			value={props.search}
			onChange={props.onSearchChange}
			placeholder="Tìm theo assignment title…"
		/>
	);
}
