import Elysia from "elysia";
import { AdminCourses } from "../views/dashboard/admin/courses";
import { Html } from "@kitajs/html";
import { prisma } from "../utils/prisma";
import { LessonForm } from "../views/dashboard/admin/lessonForm";
import { LessonCard } from "../views/dashboard/admin/lessonCard";

export const adminCoursesRouter = new Elysia({ prefix: "/dashboard/admin" })

  .get("/courses", async () => {
    const allCourses = await prisma.course.findMany();
    return <AdminCourses courses={allCourses} />;
  })

  .get("/courses/:courseId/edit-lesson", ({ params }) => <LessonForm courseId={params.courseId} />)

  .get("/lessons", async ({ query }) => {
    const { courseId } = query;

    if (!courseId) {
      return null;
    }

    const lessons = await prisma.lesson.findMany({
      where: {
        courseId,
      },
    });

    return (
      <>
        {lessons.map((lesson) => (
          <LessonCard lesson={lesson} />
        ))}
      </>
    );
  })

  .post("/lessons", async ({ body }) => {
    const { courseId, title, videoUrl } = body as any;

    if (!courseId || !title || !videoUrl) {
      return <div class="alert alert-error">All Field required</div>;
    }

    const totalLessons = await prisma.lesson.count({
      where: {
        courseId,
      },
    });

    await prisma.lesson.create({
      data: {
        courseId,
        title,
        videoUrl,
        order: totalLessons + 1,
      },
    });

    return new Response(null, {
      headers: {
        "HX-Refresh": "true",
      },
    });
  })

  .delete("/lessons/:lessonId", async ({ params }) => {
    const { lessonId } = params;

    await prisma.lesson.delete({
      where: {
        id: lessonId,
      },
    });

    return null;
  });
