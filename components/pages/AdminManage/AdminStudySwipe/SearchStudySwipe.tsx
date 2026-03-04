import BaseSearch from "../BaseModel/BaseSearch";

export default function SearchStudySwipe({
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
			placeholder="Tìm theo swiper, target hoặc status…"
			inputClassName="focus:ring-1 focus:ring-blue-500"
		/>
	);
}