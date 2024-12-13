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
      include: {
        user: true,
      },
    });

    return { user: user?.user };
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
  })

  .post("/courses/:courseId/buy", async ({ user, params, body, redirect }) => {
    const { amount } = body as { amount: string };
    const { courseId } = params;

    try {
      const newOrder = await prisma.order.create({
        data: {
          userId: user?.id as string,
          courseId: courseId,
          amount: Number(amount),
          mayarTransactionId: "",
        },
        include: {
          course: true,
        },
      });

      const createPayment = await fetch("https://api.mayar.id/hl/v1/payment/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.MAYAR_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user?.name,
          email: user?.email,
          amount: Number(amount),
          mobile: "00000000000000",
          description: newOrder.course.title,
          redirectUrl: "https://devscale.id",
        }),
        redirect: "follow",
      });

      const { data } = await createPayment.json();

      await prisma.order.update({
        where: {
          id: newOrder.id,
        },
        data: {
          mayarTransactionId: data.id,
        },
      });

      return new Response(null, {
        status: 302,
        headers: {
          "HX-Redirect": data.link,
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
