"use client";

import { Enrollment } from "@/hooks/enrollment/getEnrollment";
import { useUsersMap } from "@/hooks/users/useUsersMap";

type Props = {
  students: Enrollment[];
};

export default function StudentList({ students }: Props) {

  const { usersMap, loading } = useUsersMap();

  if (loading) {
    return <div className="text-gray-400 text-sm">Loading students...</div>;
  }

  if (students.length === 0) {
    return <div className="text-gray-400 text-sm">No students</div>;
  }

  return (
    <div className="space-y-3">

      {students.map((s) => {

        const user = usersMap[s.user_id];

        return (
          <div
            key={s.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
          >

            <div className="w-9 h-9 rounded-full bg-emerald-200 flex items-center justify-center text-sm font-semibold">
              {user?.username?.[0]?.toUpperCase() ?? "U"}
            </div>

            <div>

              <div className="text-sm font-medium">
                {user?.username ?? s.user_id}
              </div>

              <div className="text-xs text-gray-500">
                Enrolled {new Date(s.enrolled_at ?? "").toLocaleDateString()}
              </div>

            </div>

          </div>
        );

      })}

    </div>
  );
}