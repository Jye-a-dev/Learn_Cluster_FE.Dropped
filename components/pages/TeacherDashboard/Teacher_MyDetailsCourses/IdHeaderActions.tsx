"use client";

type Props = {
  onEdit?: () => void;
  onManage?: () => void;
  onExit?: () => void;
};

export default function CourseHeaderActions({
  onEdit,
  onManage,
  onExit,
}: Props) {
  return (
    <div className="flex gap-3">

      <button
        onClick={onEdit}
        className="px-4 py-2 rounded-lg bg-cyan-500 text-white text-sm font-medium hover:bg-cyan-600 transition"
      >
        Edit Course
      </button>

      <button
        onClick={onManage}
        className="px-4 py-2 rounded-lg bg-white/20 text-cyan-100 text-sm hover:bg-white/30 transition"
      >
        Manage Content
      </button>

      <button
        onClick={onExit}
        className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
      >
        Thoát
      </button>

    </div>
  );
}