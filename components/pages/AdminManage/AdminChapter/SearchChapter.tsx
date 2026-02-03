import BaseSearch from "@/components/pages/AdminManage/BaseModel/BaseSearch";

type Props = {
	search: string;
	onSearchChange: (v: string) => void;
};

export default function SearchChapter({
	search,
	onSearchChange,
}: Props) {
	return (
		<BaseSearch
			value={search}
			onChange={onSearchChange}
			placeholder="Tìm theo chapter title…"
		/>
	);
}
