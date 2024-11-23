import { Html } from "@kitajs/html";
import Elysia from "elysia";
import { MyCourse } from "../views/dashboard/users/my-courses";
import { prisma } from "../utils/prisma";
import { DashboardLayout } from "../views/dashboard/dashboardLayout";
import { SingleCourse } from "../views/dashboard/users/single-course";

export const userCoursesRouter = new Elysia({ prefix: "/dashboard" })
  // My courses
  .get("/my-courses", async () => {
    const allCourses = await prisma.course.findMany();
    return <MyCourse courses={allCourses} />;
  })
  .get("/my-courses/:courseId/first-lesson", async ({ params, redirect }) => {
    const { courseId } = params;

    if (!courseId) {
      return redirect("/dashboard/my-courses");
    }

    const firstLesson = await prisma.lesson.findFirst({
      where: {
        courseId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    console.log(firstLesson);

    if (!firstLesson) {
      return new Response(null, {
        headers: {
          "HX-Location": `/dashboard/my-courses`,
        },
      });
    }

    return new Response(null, {
      headers: {
        "HX-Location": `/dashboard/my-courses/${courseId}/${firstLesson.id}`,
      },
    });
  })
  .get("/my-courses/:courseId/:lessonId", async ({ params }) => {
    const { courseId } = params;

    const allLessons = await prisma.lesson.findMany({
      where: {
        courseId,
      },
    });

    const currentLesson = await prisma.lesson.findFirst({
      where: {
        courseId,
        id: params.lessonId,
      },
    });

    if (!currentLesson) {
      return new Response(null, {
        headers: {
          "HX-Location": `/dashboard/my-courses/${courseId}/first-lesson`,
        },
      });
    }

    return <SingleCourse courseId={courseId} allLessons={allLessons} currentLesson={currentLesson} />;
  });
