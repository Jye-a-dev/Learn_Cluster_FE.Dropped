import { StudyDateBE } from "@/hooks/study_dates/getStudyDates";
import BaseTeacherCard from "../Base/BaseTeacherCard";

type Props = {
  item: StudyDateBE;
  onEdit: () => void;
  onDelete: () => void;
};

export default function TeacherStudyDateCard({
  item,
  onEdit,
  onDelete,
}: Props) {
  return (
    <BaseTeacherCard>
      {/* TITLE */}
      <h3 className="text-lg font-semibold text-emerald-200 mb-2">
        {item.title || "Buổi học"}
      </h3>

      {/* TIME */}
      <p className="text-sm text-emerald-300 mb-1">
        ⏰ {item.scheduled_at || "Chưa có thời gian"}
      </p>

      {/* LOCATION */}
      <p className="text-sm text-emerald-400 mb-4">
        📍 {item.location || "Chưa có địa điểm"}
      </p>

      {/* ACTION */}
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="flex-1 py-2 bg-cyan-600 text-white rounded-lg"
        >
          Sửa
        </button>

        <button
          onClick={onDelete}
          className="flex-1 py-2 bg-red-600 text-white rounded-lg"
        >
          Xóa
        </button>
      </div>
    </BaseTeacherCard>
  );
}