import BaseSearch from "@/components/pages/AdminManage/BaseModel/BaseSearch";

export default function SearchBookmark(props: {
  search: string;
  onSearchChange: (v: string) => void;
}) {
  return (
    <BaseSearch
      value={props.search}
      onChange={props.onSearchChange}
      placeholder="Tìm theo user ID hoặc lesson ID…"
      inputClassName="focus:ring-1 focus:ring-blue-500"
    />
  );
}
