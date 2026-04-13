import { AssignmentBE } from "@/hooks/assignment/getAssignment";

interface Props {
  assignment: AssignmentBE;
  onPreview: () => void;
}

export default function AssignmentCard({
  assignment,
  onPreview,
}: Props) {
  return (
    <div
      onClick={onPreview}
      className="group bg-white border border-gray-200 rounded-2xl p-5 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
    >
      <h3 className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-cyan-700 transition">
        {assignment.title || "Bài tập"}
      </h3>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-gray-500">
          <span className="text-lg">📄</span>
          <span className="text-sm">Bài tập</span>
        </div>

        {assignment.deadline && (
          <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600">
            Hạn nộp
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
        {assignment.description || "Chưa có mô tả cho bài tập này."}
      </p>

      <div className="flex items-center justify-between mt-4 text-sm">
        {assignment.deadline && (
          <span className="text-red-500 font-medium">
            {new Date(assignment.deadline).toLocaleDateString()}
          </span>
        )}

        <span className="text-cyan-700 font-medium group-hover:underline">
          Xem chi tiết →
        </span>
      </div>
    </div>
  );
}
