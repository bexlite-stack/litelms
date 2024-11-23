import { Html } from "@kitajs/html";
import Elysia from "elysia";
import { Dashboard } from "../views/dashboard/users/dashboard";
import { prisma } from "../utils/prisma";

export const userDashboardRouter = new Elysia({ prefix: "/dashboard" })
  .derive(async ({ cookie: { sessionId } }) => {
    const user = await prisma.session.findUnique({
      where: {
        id: sessionId.value,
      },
    });

    return { user };
  })
  // Dashboard
  .get("/", async ({ user }) => {
    const allCourses = await prisma.course.findMany();
    const enrolledCourses = await prisma.enrollment.findMany({
      where: {
        userId: user?.id,
      },
    });

    return <Dashboard courses={allCourses} enrolledCourses={enrolledCourses} />;
  });
