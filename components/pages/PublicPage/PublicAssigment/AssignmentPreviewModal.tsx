"use client";

import { AssignmentBE } from "@/hooks/assignment/getAssignment";

interface Props {
  assignment: AssignmentBE;
  onClose: () => void;
}

export default function AssignmentPreviewModal({
  assignment,
  onClose,
}: Props) {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-emerald-100 rounded-2xl shadow-xl max-w-2xl w-full p-8 relative animate-[fadeUp_.3s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {assignment.title || "Bài tập"}
        </h2>

        {assignment.deadline && (
          <div className="inline-block mb-4 px-3 py-1 text-sm rounded-full bg-red-100 text-red-600">
            Hạn nộp:{" "}
            {new Date(assignment.deadline).toLocaleDateString()}
          </div>
        )}

        <div className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
          {assignment.description || "Chưa có mô tả cho bài tập này."}
        </div>

        {assignment.file_url && (
          <div className="mb-6">
            <p className="font-semibold text-gray-700 mb-2">
              Tài liệu bài tập
            </p>

            <a
              href={assignment.file_url}
              target="_blank"
              className="inline-flex items-center gap-2 text-cyan-700 hover:text-cyan-900 font-medium"
            >
              📄 Xem file bài tập
            </a>
          </div>
        )}

        <div className="bg-cyan-200 rounded-lg p-4 text-sm text-emerald-600 mb-6">
          Sau khi đăng nhập, bạn có thể tải tài liệu bài tập, thực hiện yêu cầu
          và nộp bài trước thời hạn. Việc hoàn thành bài tập giúp bạn củng cố
          kiến thức và đánh giá mức độ hiểu bài của mình.
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
