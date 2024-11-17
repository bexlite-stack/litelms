import Elysia from "elysia";
import { Html } from "@kitajs/html";

export const dashboardRouter = new Elysia().get("/dashboard", () => <>Dashboard</>);
