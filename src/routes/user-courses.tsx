import { Html } from "@kitajs/html";
import Elysia from "elysia";
import { MyCourse } from "../views/dashboard/users/myCourse";
import { prisma } from "../utils/prisma";

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

    const firstLesson = await prisma.lesson.findFirst({
      where: {
        courseId,
      },
    });

    return <div>{firstLesson?.title}</div>;
  });
