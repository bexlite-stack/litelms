import { Html } from "@kitajs/html";
import Elysia from "elysia";
import { OrderHistory } from "../views/dashboard/users/order-history";
import { prisma } from "../utils/prisma";

export const userOrdersRouter = new Elysia({ prefix: "/dashboard" })
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

  // Orders History
  .get("/orders", async ({ user }) => {
    const orders = await prisma.order.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        course: true,
        user: true,
      },
    });

    return <OrderHistory orders={orders} />;
  });
