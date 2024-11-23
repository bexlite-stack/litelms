import { Html } from "@kitajs/html";
import { DashboardLayout } from "../dashboardLayout";
import { CourseCard } from "./courseCard";
import { Course } from "@prisma/client";

export const AdminCourses = ({ courses }: { courses: Course[] }) => {
  return (
    <DashboardLayout>
      <main class="space-y-6">
        <section class="flex justify-between">
          <section>
            <h3>All Courses</h3>
            <p>Here is your all purchased courses</p>
          </section>
          <a href="/dashboard/admin/courses/create">
            <button class="w-fit">Create Course</button>
          </a>
        </section>
        <section class="grid grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard id={course.id} title={course.title} desc={course.description} />
          ))}
        </section>
      </main>
    </DashboardLayout>
  );
};
