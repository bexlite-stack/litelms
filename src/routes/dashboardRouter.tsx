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

interface CourseBody {
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
        const { title, description, price, level } = body as CourseBody;

        if (!title || !description || !price || !level) {
          return <div>Please fill all fields</div>;
        }

        try {
          const newCourse = await prisma.course.create({
            data: {
              title,
              description,
              price: Number(price),
              level,
            },
          });

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

        const newLesson = await prisma.lesson.create({
          data: {
            title,
            videoUrl,
            courseId,
          },
        });

        return <LessonCard lesson={newLesson} />;
      })
  );
