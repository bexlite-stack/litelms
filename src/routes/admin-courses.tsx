import Elysia from "elysia";
import { AdminCourses } from "../views/dashboard/admin/courses";
import { Html } from "@kitajs/html";
import { prisma } from "../utils/prisma";

export const adminCoursesRouter = new Elysia({ prefix: "/dashboard/admin" }).get("/courses", async () => {
  const allCourses = await prisma.course.findMany();

  return <AdminCourses courses={allCourses} />;
});
