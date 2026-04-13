"use client";

import { useEffect, useState } from "react";
import {
  AssignmentBE,
  getAssignments,
} from "@/hooks/assignment/getAssignment";

import AssignmentCard from "./AssignmentCard";
import AssignmentPreviewModal from "./AssignmentPreviewModal";

export default function AssignmentContainer() {
  const [assignments, setAssignments] = useState<AssignmentBE[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<AssignmentBE | null>(null);

  useEffect(() => {
    async function fetchAssignments() {
      try {
        const data = await getAssignments();

        setAssignments(data.slice(0, 10));
      } catch (err) {
        console.error("Lỗi tải bài tập:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAssignments();
  }, []);

  return (
    <>
      <section className="bg-gray-50/80 border-b m-2">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-cyan-800/70 mb-4">
            Bài tập thực hành
          </h1>

          <p className="max-w-2xl mx-auto text-emerald-600 text-justify">
            Sau khi đăng nhập, bạn có thể truy cập danh sách bài tập của từng
            khóa học. Mỗi bài tập sẽ cung cấp mô tả chi tiết, tài liệu đính kèm
            và thời hạn nộp bài. Người học có thể đọc yêu cầu, tải tài liệu và
            hoàn thành bài tập trước hạn để rèn luyện kỹ năng và củng cố kiến
            thức đã học.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        {loading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-xl bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && assignments.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            Hiện chưa có bài tập nào.
          </div>
        )}

        {!loading && assignments.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {assignments.map((assignment, index) => (
              <div
                key={assignment.id}
                className="hover:scale-[1.02] transition"
                style={{
                  animation: "fadeUp .4s ease forwards",
                  animationDelay: `${index * 60}ms`,
                  opacity: 0,
                }}
              >
                <AssignmentCard
                  assignment={assignment}
                  onPreview={() => setSelected(assignment)}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {selected && (
        <AssignmentPreviewModal
          assignment={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
