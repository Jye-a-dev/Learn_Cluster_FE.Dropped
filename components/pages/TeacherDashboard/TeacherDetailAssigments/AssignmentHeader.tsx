"use client";

import { AssignmentBE } from "@/hooks/assignment/getAssignment";

import AssignmentHeaderActions from "./AssigmentHeaderActions";

type Props = {
  assignment: AssignmentBE;
  onOpenEdit?: () => void;
  onOpenManage?: () => void;
  onDelete?: () => void;
};

export default function AssignmentHeader({
  assignment,
  onOpenEdit,
  onOpenManage,
  onDelete,
}: Props) {

  const stats = [
    {
      label: "Deadline",
      value: assignment.deadline
        ? new Date(assignment.deadline).toLocaleString()
        : "No deadline",
    },
    {
      label: "File",
      value: assignment.file_url ? "Attached" : "None",
    },
  ];

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-8">

      {/* TITLE */}
      <div className="flex items-start justify-between gap-6">

        <div>
          <h1 className="text-3xl font-bold text-cyan-100">
            {assignment.title}
          </h1>

          {assignment.description && (
            <p className="mt-2 text-cyan-200 max-w-2xl">
              {assignment.description}
            </p>
          )}
        </div>

        <AssignmentHeaderActions
          onEdit={onOpenEdit}
          onManage={onOpenManage}
          onDelete={onDelete}
        />

      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-8 text-sm">

        {stats.map((item) => (
          <div
            key={item.label}
            className="bg-white/50 rounded-lg p-4"
          >
            <p className="text-cyan-700">
              {item.label}
            </p>

            <p className="text-lg font-semibold text-white">
              {item.value}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}