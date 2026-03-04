import BaseSearch from "../BaseModel/BaseSearch";

export default function SearchStudyMatch({
	search,
	onSearchChange,
}: {
	search: string;
	onSearchChange: (v: string) => void;
}) {
	return (
		<BaseSearch
			value={search}
			onChange={onSearchChange}
			placeholder="Tìm theo user..."
			inputClassName="focus:ring-1 focus:ring-blue-500"
		/>
	);
}