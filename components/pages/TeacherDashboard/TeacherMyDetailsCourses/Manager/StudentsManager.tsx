"use client";

import { useState } from "react";
import BaseTeacherManage from "@/components/pages/TeacherDashboard/Base/BaseTeacherManage";

import { Enrollment } from "@/hooks/enrollment/getEnrollment";
import { useUsersMap } from "@/hooks/users/useUsersMap";
import { addEnrollment, deleteEnrollment, getStudentsByCourse } from "@/hooks/enrollment/getEnrollment";

type Props = {
  courseId: string;
  students: Enrollment[];
};

export default function StudentsManager({ courseId, students }: Props) {

  const { usersMap } = useUsersMap();
  const [selectedUser, setSelectedUser] = useState("");

  const users = Object.values(usersMap);

  return (
    <BaseTeacherManage
      data={students}
      fetchData={() => getStudentsByCourse(courseId)}
      onAdd={async () => {
        if (!selectedUser) return;

        await addEnrollment({
          user_id: selectedUser,
          course_id: courseId,
        });

        setSelectedUser("");
      }}
      renderItem={(s: Enrollment, refresh) => {

        const user = usersMap[s.user_id];

        return (
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">

            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">
                {user?.username ?? "Unknown"}
              </span>

              <span className="text-xs text-gray-400">
                {s.user_id}
              </span>
            </div>

            <button
              onClick={async () => {
                await deleteEnrollment(s.id);
                await refresh();
              }}
              className="text-red-400 text-xs hover:text-red-500 transition"
            >
              Remove
            </button>

          </div>
        );
      }}
      renderAdd={(handleAdd) => (
        <div className="flex gap-2">
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="
              bg-white/5 border border-white/10
              rounded-lg px-3 py-2 w-full
              text-sm text-white
              focus:outline-none focus:border-cyan-500
            "
          >
            <option value="" className="text-black">
              Select user
            </option>

            {users.map((u) => (
              <option key={u.id} value={u.id} className="text-black">
                {u.username}
              </option>
            ))}
          </select>

          <button
            onClick={handleAdd}
            className="
              px-4 py-2 text-sm rounded-lg
              bg-emerald-600 hover:bg-emerald-500
              text-white transition
              whitespace-nowrap
            "
          >
            Add Student
          </button>
        </div>
      )}
    />
  );
}