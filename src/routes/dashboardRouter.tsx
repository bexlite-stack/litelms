import Elysia from "elysia";
import { Html } from "@kitajs/html";
import { Dashboard } from "../views/dashboard/users/dashboard";
import { MyCourse } from "../views/dashboard/users/myCourse";
import { OrderHistory } from "../views/dashboard/users/orderHistory";
import { AdminCourses } from "../views/dashboard/admin/courses";
import { Students } from "../views/dashboard/admin/students";
import { Revenues } from "../views/dashboard/admin/revenues";

export const dashboardRouter = new Elysia({ prefix: "/dashboard" })
  .get("/", () => <Dashboard />)
  .get("/my-courses", () => <MyCourse />)
  .get("/orders", () => <OrderHistory />)
  .group("/admin", (app) =>
    app
      .get("/courses", () => <AdminCourses />)
      .get("/students", () => <Students />)
      .get("/revenues", () => <Revenues />)
  );
