"use client";

import BaseTeacherList from "@/components/pages/TeacherDashboard/Base/BaseTeacherList";
import { Enrollment } from "@/hooks/enrollment/getEnrollment";
import { useUsersMap } from "@/hooks/users/useUsersMap";

type Props = {
  students: Enrollment[];
};

export default function StudentList({ students }: Props) {

  const { usersMap, loading } = useUsersMap();

  return (
    <BaseTeacherList
      title="Students"
      items={students}
      loading={loading}
      emptyText="No students"
      renderItem={(s) => {

        const user = usersMap[s.user_id];

        return (
          <div className="flex items-center gap-3">

            <div className="
              w-9 h-9 rounded-full
              bg-emerald-200
              flex items-center justify-center
              text-sm font-semibold
            ">
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
      }}
    />
  );
}