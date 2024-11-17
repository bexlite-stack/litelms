import { Html } from "@kitajs/html";
import { DashboardLayout } from "../dashboardLayout";
import { CourseCard } from "./courseCard";

export const AdminCourses = () => {
  return (
    <DashboardLayout>
      <section class="grid grid-cols-4 gap-6 p-6">
        <CourseCard title="Python for Data Analyst" desc="Beginner course for someone who just start to learn data analytics" />
        <CourseCard title="Javascript for Beginners" desc="Javascript is the most powerful web based programming language" />
      </section>
    </DashboardLayout>
  );
};
