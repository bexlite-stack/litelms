import html from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";
import { authRouter } from "./routes/authRouter";
import { dashboardRouter } from "./routes/dashboardRouter";

const app = new Elysia()
  .use(staticPlugin())
  .use(html())

  .use(authRouter)
  .use(dashboardRouter)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
