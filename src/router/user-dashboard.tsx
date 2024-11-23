import { Html } from "@kitajs/html";
import Elysia from "elysia";
import { Dashboard } from "../views/dashboard/users/dashboard";

export const userDashboardRouter = new Elysia({ prefix: "/dashboard" })
  // Dashboard
  .get("/", async () => {
    return <Dashboard />;
  });
