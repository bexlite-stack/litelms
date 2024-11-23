import html from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";
import { authRouter } from "./routes/authRouter";
import { dashboardRouter } from "./routes/dashboardRouter";
import { userCoursesRouter } from "./routes/user-courses";
import { userDashboardRouter } from "./routes/user-dashboard";
import { userOrdersRouter } from "./routes/user-orders";
import { adminCoursesRouter } from "./routes/admin-courses";
import { adminOverviewRouter } from "./routes/admin-overview";
import { adminStudentRouter } from "./routes/admin-students";

const app = new Elysia()
  .use(staticPlugin())
  .use(html())

  .use(authRouter)
  .use(adminCoursesRouter)
  .use(adminOverviewRouter)
  .use(adminStudentRouter)
  // .use(dashboardRouter)
  .use(userCoursesRouter)
  .use(userDashboardRouter)
  .use(userOrdersRouter)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
