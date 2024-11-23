import { Html } from "@kitajs/html";
import Elysia from "elysia";
import { OrderHistory } from "../views/dashboard/users/orderHistory";

export const userOrdersRouter = new Elysia({ prefix: "/dashboard" })
  // Orders History
  .get("/orders", async () => {
    return <OrderHistory />;
  });
