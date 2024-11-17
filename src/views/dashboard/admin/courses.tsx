import { Html } from "@kitajs/html";
import { DashboardLayout } from "../dashboardLayout";
import { CourseCard } from "./courseCard";

export const AdminCourses = () => {
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
          <CourseCard title="Python for Data Analyst" desc="Beginner course for someone who just start to learn data analytics" />
          <CourseCard title="Javascript for Beginners" desc="Javascript is the most powerful web based programming language" />
        </section>
      </main>
    </DashboardLayout>
  );
};
