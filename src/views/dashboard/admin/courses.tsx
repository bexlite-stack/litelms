import { Html } from "@kitajs/html";
import { DashboardLayout } from "../dashboardLayout";
import { CourseCard } from "./courseCard";
import { Course } from "@prisma/client";

export const AdminCourses = ({ courses }: { courses: Course[] }) => {
  return (
    <DashboardLayout>
      <main class="p-6 space-y-6">
        <section class="flex justify-between">
          <h3>All Courses</h3>
          <a href="/dashboard/admin/courses/create">
            <button class="w-fit">Create Course</button>
          </a>
        </section>
        <section class="grid grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard title={course.title} desc={course.description} />
          ))}
        </section>
      </main>
    </DashboardLayout>
  );
};
