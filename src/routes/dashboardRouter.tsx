import Elysia from "elysia";
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

export const dashboardRouter = new Elysia({ prefix: "/dashboard" })
  .get("/", () => <Dashboard />)
  .get("/my-courses", () => <MyCourse />)
  .get("/orders", () => <OrderHistory />)
  .group("/admin", (app) =>
    app
      .get("/courses", () => <AdminCourses />)
      .get("/courses/create", () => <CourseForm />)
      .get("/courses/:courseId/add-lesson", () => <LessonForm />)
      .get("/students", () => <Students />)
      .get("/revenues", () => <Revenues />)
      .get("/orders", () => <Orders />)
  );
