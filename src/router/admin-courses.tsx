import Elysia from "elysia";
import { AdminCourses } from "../views/dashboard/admin/courses";
import { Html } from "@kitajs/html";
import { prisma } from "../utils/prisma";
import { LessonForm } from "../views/dashboard/admin/lessonForm";
import { LessonCard } from "../views/dashboard/admin/lessonCard";
import { CourseForm } from "../views/dashboard/admin/courseForm";

export const adminCoursesRouter = new Elysia({ prefix: "/dashboard/admin" })

  .get("/courses", async () => {
    const allCourses = await prisma.course.findMany();
    return <AdminCourses courses={allCourses} />;
  })

  .get("/courses/create", () => <CourseForm />)

  .get("/courses/:courseId/edit-lesson", ({ params }) => <LessonForm courseId={params.courseId} />)

  .post("/courses", async ({ body }) => {
    const { image, title, description, price, level } = body as any;

    if (!image || !title || !description || !price || !level) {
      return <div>Please fill all fields</div>;
    }

    try {
      const newCourse = await prisma.course.create({
        data: {
          image: image.name,
          title,
          description,
          price: Number(price),
          level,
        },
      });

      await Bun.write(`public/courses/${newCourse.id}/${image.name}`, image);

      return new Response(null, {
        headers: {
          "HX-Location": `/dashboard/admin/courses/${newCourse.id}/edit-lesson`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  })

  .patch("/courses/:courseId", async ({ params, body }) => {
    const { courseId } = params;
    const { published } = body as { published: string };

    await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        published: published === "true" ? true : false,
      },
    });

    return new Response(null, {
      headers: {
        "HX-Refresh": "true",
      },
    });
  })

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
