import BaseSearch from "@/components/pages/AdminManage/BaseModel/BaseSearch";

export default function SearchNote(props: {
	search: string;
	onSearchChange: (v: string) => void;
}) {
	return (
		<BaseSearch
			value={props.search}
			onChange={props.onSearchChange}
			placeholder="Tìm theo nội dung note, user ID hoặc lesson ID…"
			inputClassName="focus:ring-1 focus:ring-blue-500"
		/>
	);
}
