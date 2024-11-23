import { Html } from "@kitajs/html";
import { DashboardLayout } from "../dashboardLayout";
import { CourseCard } from "./courseCard";
import { Course } from "@prisma/client";

interface MyCourseProps {
  courses: Course[];
}

export const MyCourse = ({ courses }: MyCourseProps) => {
  return (
    <DashboardLayout>
      <main class="space-y-4">
        <section>
          <h3>All my courses</h3>
          <p>Here is your all purchased courses</p>
        </section>
        <section class="grid grid-cols-3 gap-6">
          {courses.map((course) => {
            return <CourseCard href={`/dashboard/my-courses/${course.id}/first-lesson`} title={course.title} desc={course.description} />;
          })}
        </section>
      </main>
    </DashboardLayout>
  );
};
