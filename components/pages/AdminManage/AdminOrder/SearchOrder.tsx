import BaseSearch from "@/components/pages/AdminManage/BaseModel/BaseSearch";

export default function SearchOrder(props: {
    search: string;
    onSearchChange: (v: string) => void;
}) {
    return (
        <BaseSearch
            value={props.search}
            onChange={props.onSearchChange}
            placeholder="Tìm theo Order User"
        />
    );
}
