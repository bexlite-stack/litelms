import html from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";
import { authRouter } from "./router/authRouter";
import { userCoursesRouter } from "./router/user-courses";
import { userDashboardRouter } from "./router/user-dashboard";
import { userOrdersRouter } from "./router/user-orders";
import { adminCoursesRouter } from "./router/admin-courses";
import { adminOverviewRouter } from "./router/admin-overview";
import { adminStudentRouter } from "./router/admin-students";

const app = new Elysia()
  .use(staticPlugin())
  .use(html())

  // auth
  .use(authRouter)

  .guard((app) =>
    app
      .onBeforeHandle(({ cookie: { sessionId }, redirect }) => {
        if (!sessionId.value) {
          return redirect("/login");
        }
      })
      // dashboard
      .use(adminCoursesRouter)
      .use(adminOverviewRouter)
      .use(adminStudentRouter)

      // user dashboard
      .use(userDashboardRouter)
      .use(userCoursesRouter)
      .use(userOrdersRouter)
  )

  // port
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
