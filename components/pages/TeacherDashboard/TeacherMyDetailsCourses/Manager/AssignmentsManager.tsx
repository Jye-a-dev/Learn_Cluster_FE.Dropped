"use client";

import { useState } from "react";
import BaseTeacherManage from "@/components/pages/TeacherDashboard/Base/BaseTeacherManage";

import {
  AssignmentBE,
  getAssignments,
  createAssignment,
  deleteAssignment,
} from "@/hooks/assignment/getAssignment";

type Props = {
  courseId: string;
  assignments: AssignmentBE[];
};

export default function AssignmentsManager({ courseId, assignments }: Props) {
  const [title, setTitle] = useState("");

  return (
    <BaseTeacherManage
      data={assignments}
      fetchData={() => getAssignments({ course_id: courseId })}
      onAdd={async () => {
        if (!title.trim()) return;

        await createAssignment({
          course_id: courseId,
          title,
          ordering: 0
        });

        setTitle("");
      }}
      renderItem={(a: AssignmentBE, refresh) => (
        <div className="flex items-center justify-between px-3 py-2 gap-3">

          {/* TITLE */}
          <span className="flex-1 text-sm text-gray-200">
            {a.title || "Untitled"}
          </span>

          {/* DELETE */}
          <button
            onClick={async () => {
              await deleteAssignment(a.id);
              await refresh();
            }}
            className="text-red-500 text-xs hover:text-red-600"
          >
            Remove
          </button>

        </div>
      )}
      renderAdd={(handleAdd) => (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Assignment title"
            className="border rounded-lg text-white p-2 w-full"
          />

          <button
            onClick={handleAdd}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Add Assignment
          </button>
        </>
      )}
    />
  );
}