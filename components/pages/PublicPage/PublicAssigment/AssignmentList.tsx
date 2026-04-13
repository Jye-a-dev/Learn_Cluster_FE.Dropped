import { AssignmentBE } from "@/hooks/assignment/getAssignment";
import AssignmentCard from "./AssignmentCard";

interface Props {
  assignments: AssignmentBE[];
  loading: boolean;
  onPreview: (a: AssignmentBE) => void;
}

export default function AssignmentList({
  assignments,
  loading,
  onPreview,
}: Props) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-32 bg-gray-100 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!assignments.length) {
    return (
      <div className="text-center text-emerald-500 py-20">
        Chưa có bài tập nào.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {assignments.map((a) => (
        <AssignmentCard
          key={a.id}
          assignment={a}
          onPreview={() => onPreview(a)}
        />
      ))}
    </div>
  );
}
