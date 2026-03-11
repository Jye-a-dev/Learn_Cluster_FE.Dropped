"use client";

import { CourseInstructor } from "@/hooks/course_instructors/getCourseInstructor";
import { useUsersMap } from "@/hooks/users/useUsersMap";

type Props = {
  instructors: CourseInstructor[];
};

export default function InstructorList({ instructors }: Props) {

  const { usersMap, loading } = useUsersMap();

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <h2 className="text-xl font-semibold mb-5">
        Giảng viên
      </h2>

      {instructors.length === 0 && (
        <p className="text-gray-500">No instructors</p>
      )}

      <ul className="space-y-3">

        {instructors.map((ins) => {

          const user = usersMap[ins.user_id];

          return (
            <li
              key={ins.id}
              className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition"
            >

              {/* LEFT */}
              <div className="flex items-center gap-3">

                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center font-semibold text-cyan-700">
                  {loading
                    ? "..."
                    : user?.username?.charAt(0)?.toUpperCase() ?? "U"}
                </div>

                {/* Name */}
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">
                    {loading
                      ? "Loading..."
                      : user?.username ?? ins.user_id}
                  </span>

                  <span className="text-xs text-gray-400">
                    {ins.user_id}
                  </span>
                </div>

              </div>

              {/* ROLE */}
              <span className="
                text-xs font-medium
                px-3 py-1
                rounded-full
                bg-cyan-100
                text-cyan-700
              ">
                {ins.role_in_course}
              </span>

            </li>
          );
        })}

      </ul>

    </div>
  );
}