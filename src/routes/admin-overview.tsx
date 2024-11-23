import Elysia from "elysia";
import { Overview } from "../views/dashboard/admin/overview";
import { Html } from "@kitajs/html";

export const adminOverviewRouter = new Elysia({ prefix: "/dashboard/admin" }).get("/overview", async () => {
  return <Overview />;
});
