import BaseSearch from "@/components/pages/AdminManage/BaseModel/BaseSearch";

export default function SearchAchievement(props: {
    search: string;
    onSearchChange: (v: string) => void;
}) {
    return (
        <BaseSearch
            value={props.search}
            onChange={props.onSearchChange}
            placeholder="Tìm theo tên hoặc mô tả achievement…"
        />
    );
}
