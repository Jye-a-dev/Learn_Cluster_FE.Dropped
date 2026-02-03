import BaseSearch from "@/components/pages/AdminManage/BaseModel/BaseSearch";

export default function SearchPermission(props: {
	search: string;
	onSearchChange: (v: string) => void;
}) {
	return (
		<BaseSearch
			value={props.search}
			onChange={props.onSearchChange}
			placeholder="Tìm theo permission name hoặc code…"
			inputClassName="focus:ring-1 focus:ring-blue-500"
		/>
	);
}
