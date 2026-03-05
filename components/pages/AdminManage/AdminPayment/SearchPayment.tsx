import BaseSearch from "../BaseModel/BaseSearch";

export default function SearchPayment({
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
			placeholder="Tìm theo order, provider, transaction"
		/>
	);
}