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
import { prisma } from "./utils/prisma";
import { adminCertificatesRouter } from "./router/admin-certificates";

const app = new Elysia()
  .use(staticPlugin())
  .use(html())

  // auth
  .use(authRouter)

  .post("/webhook", async ({ body }) => {
    const { event, data } = body as { event: string; data: { productId: string } };

    if (event === "payment.received") {
      const updatedOrder = await prisma.order.update({
        where: {
          mayarTransactionId: data.productId,
        },
        data: {
          status: "PAID",
        },
        include: {
          course: true,
        },
      });

      await prisma.enrollment.create({
        data: {
          userId: updatedOrder.userId,
          courseId: updatedOrder.course.id,
        },
      });
    }

    return "Success!!!";
  })

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
      .use(adminCertificatesRouter)

      // user dashboard
      .use(userDashboardRouter)
      .use(userCoursesRouter)
      .use(userOrdersRouter)
  )

  // port
  .listen(8805);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
