"use client";

import BaseTeacherList from "@/components/pages/TeacherDashboard/Base/BaseTeacherList";
import { CourseInstructor } from "@/hooks/course_instructors/getCourseInstructor";
import { useUsersMap } from "@/hooks/users/useUsersMap";

type Props = {
  instructors: CourseInstructor[];
};

export default function InstructorList({ instructors }: Props) {

  const { usersMap, loading } = useUsersMap();

  return (
    <BaseTeacherList
      title="Giảng viên"
      items={instructors}
      loading={loading}
      emptyText="No instructors"
      renderItem={(ins) => {

        const user = usersMap[ins.user_id];

        return (
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="
                w-9 h-9 rounded-full
                bg-cyan-100
                flex items-center justify-center
                text-sm font-semibold text-cyan-700
              ">
                {user?.username?.[0]?.toUpperCase() ?? "U"}
              </div>

              <div className="flex flex-col leading-tight">

                <span className="font-medium text-gray-800">
                  {user?.username ?? ins.user_id}
                </span>

                <span className="text-xs text-gray-400">
                  {ins.user_id}
                </span>

              </div>

            </div>

            <span className="
              text-xs font-medium
              px-3 py-1 rounded-full
              bg-cyan-50 text-cyan-700
            ">
              {ins.role_in_course}
            </span>

          </div>
        );
      }}
    />
  );
}