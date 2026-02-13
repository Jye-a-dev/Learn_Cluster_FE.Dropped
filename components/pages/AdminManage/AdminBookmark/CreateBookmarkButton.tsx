import { PlusIcon } from "@heroicons/react/24/outline";

export default function CreateBookmarkButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <PlusIcon className="h-4 w-4" />
      Tạo bookmark
    </button>
  );
}
