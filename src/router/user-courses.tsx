import { Html } from "@kitajs/html";
import Elysia from "elysia";
import { MyCourse } from "../views/dashboard/users/my-courses";
import { prisma } from "../utils/prisma";
import { SingleCourse } from "../views/dashboard/users/single-course";

export const userCoursesRouter = new Elysia({ prefix: "/dashboard" })
  .derive(async ({ cookie: { sessionId } }) => {
    const user = await prisma.session.findUnique({
      where: {
        id: sessionId.value,
      },
      include: {
        user: true,
      },
    });

    return { user: user?.user };
  })

  // My courses
  .get("/my-courses", async ({ user }) => {
    const userCourses = await prisma.enrollment.findMany({
      where: {
        userId: user?.id as string,
      },
      include: {
        course: true,
      },
    });

    const courses = userCourses.map((enrollment) => enrollment.course);
    const certificates = await prisma.certificate.findMany({
      where: {
        userId: user?.id,
      },
    });

    return <MyCourse courses={courses} certificates={certificates} />;
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

    if (!firstLesson) {
      return new Response(null, {
        headers: {
          "HX-Location": "/dashboard/my-courses",
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
