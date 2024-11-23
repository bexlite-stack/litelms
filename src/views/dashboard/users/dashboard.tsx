import { Html } from "@kitajs/html";
import { DashboardLayout } from "../dashboardLayout";
import { Course, Enrollment } from "@prisma/client";
import { CourseCard } from "./course-card";

interface DashboardProps {
  courses: Course[];
  enrolledCourses: Enrollment[];
}

export const Dashboard = ({ courses, enrolledCourses }: DashboardProps) => {
  return (
    <DashboardLayout>
      <main class="space-y-4">
        <section>
          <h3>Dashboard</h3>
          <p>Welcome to your dashboard!</p>
        </section>
        <section class="grid grid-cols-3 gap-6">
          {courses.map((course) => {
            const hasEnrolled = enrolledCourses.some((enrollment) => enrollment.courseId === course.id);
            return (
              <CourseCard href={`/dashboard/my-courses/${course.id}/first-lesson`} title={course.title} desc={course.description}>
                {hasEnrolled ? (
                  <form hx-get={`/dashboard/my-courses/${course.id}/first-lesson`} class="block">
                    <button class="text-sm">Continue Learning</button>
                  </form>
                ) : (
                  <button class="text-sm btn-outline">Buy</button>
                )}
              </CourseCard>
            );
          })}
        </section>
      </main>
    </DashboardLayout>
  );
};
