import BaseSearch from "@/components/pages/AdminManage/BaseModel/BaseSearch";

export default function SearchRole(props: {
	search: string;
	onSearchChange: (v: string) => void;
}) {
	return (
		<BaseSearch
			value={props.search}
			onChange={props.onSearchChange}
			placeholder="Tìm theo role name hoặc code…"
			inputClassName="focus:ring-1 focus:ring-blue-500"
		/>
	);
}
