import Elysia, { redirect } from "elysia";
import { Html } from "@kitajs/html";
import { Dashboard } from "../views/dashboard/users/dashboard";
import { MyCourse } from "../views/dashboard/users/myCourse";
import { OrderHistory } from "../views/dashboard/users/orderHistory";
import { AdminCourses } from "../views/dashboard/admin/courses";
import { Students } from "../views/dashboard/admin/students";
import { Revenues } from "../views/dashboard/admin/revenues";
import { Orders } from "../views/dashboard/admin/orders";
import { CourseForm } from "../views/dashboard/admin/courseForm";
import { LessonForm } from "../views/dashboard/admin/lessonForm";
import { prisma } from "../utils/prisma";
import { Course } from "@prisma/client";
import { Up } from "../views/icons/up";
import { Down } from "../views/icons/down";
import { LessonCard } from "../views/dashboard/admin/lessonCard";
import { DashboardLayout } from "../views/dashboard/dashboardLayout";
import { Overview } from "../views/dashboard/admin/overview";

interface CourseBody {
  image: File;
  title: string;
  description: string;
  price: number;
  level: string;
}

export const dashboardRouter = new Elysia({ prefix: "/dashboard" })
  .get("/", () => <Dashboard />)
  .get("/my-courses", () => <MyCourse />)
  .get("/orders", () => <OrderHistory />)
  .group("/admin", (app) =>
    app
      .get("/overview", async () => {
        return <Overview />;
      })
      .get("/courses", async () => {
        const courses = await prisma.course.findMany();
        return <AdminCourses courses={courses} />;
      })
      .get("/courses/create", () => <CourseForm />)
      .get("/courses/:courseId/add-lesson", ({ params }) => <LessonForm courseId={params.courseId} />)
      .get("/courses/:courseId/lessons", async ({ params }) => {
        const { courseId } = params;
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
      .get("/students", async () => {
        const students = await prisma.user.findMany({
          where: {
            role: "USER",
          },
        });

        return <Students users={students} />;
      })
      .get("/revenues", () => <Revenues />)
      .get("/orders", () => <Orders />)

      // Functionality
      .post("/courses", async ({ body }) => {
        const { image, title, description, price, level } = body as CourseBody;

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
              "HX-Location": `/dashboard/admin/courses/${newCourse.id}/add-lesson`,
            },
          });
        } catch (error) {
          console.error(error);
        }
      })
      .post("/courses/:courseId/add-lesson", async ({ body, params }) => {
        const { title, videoUrl, status } = body as { title: string; description: string; videoUrl: string; status: string };

        if (!title || !videoUrl || !status) {
          return <div>Please fill all fields</div>;
        }

        const { courseId } = params;
        const totalLessons = await prisma.lesson.count({
          where: {
            courseId,
          },
        });

        const newLesson = await prisma.lesson.create({
          data: {
            title,
            videoUrl,
            courseId,
            order: totalLessons + 1,
          },
        });

        return <LessonCard lesson={newLesson} />;
      })
      .patch("/lessons/:lessonId", async ({ params, body }) => {
        const { movement, order } = body as { movement: "UP" | "DOWN"; order: string };
        const { lessonId } = params;

        console.log({ movement, order, lessonId });

        // Update current lesson order
        await prisma.lesson.update({
          where: {
            id: lessonId,
          },
          data: {
            order: {
              [movement === "UP" ? "decrement" : "increment"]: 1,
            },
          },
        });

        // Update the lesson that was moved
        await prisma.lesson.update({
          where: {
            id: lessonId,
            order: Number(order),
          },
          data: {
            order: {
              [movement === "UP" ? "increment" : "decrement"]: 1,
            },
          },
        });

        return new Response(null, {
          headers: {
            "HX-Refresh": "true",
          },
        });
      })
  );
