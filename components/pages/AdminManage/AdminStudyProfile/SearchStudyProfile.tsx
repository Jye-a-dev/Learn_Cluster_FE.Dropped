import BaseSearch from "../BaseModel/BaseSearch";

export default function SearchStudyProfile({
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
			placeholder="Tìm theo user hoặc subject…"
			inputClassName="focus:ring-1 focus:ring-blue-500"
		/>
	);
}