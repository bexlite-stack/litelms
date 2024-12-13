import { Elysia } from "elysia";
import { prisma } from "../utils/prisma";
import { Html } from "@kitajs/html";
import { Login } from "../views/auth/login";
import { Register } from "../views/auth/register";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

type LoginBody = Omit<RegisterBody, "name">;

export const authRouter = new Elysia()
  .post("/register", async ({ body }) => {
    const { name, email, password } = body as RegisterBody;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      return <div>User already registered</div>;
    }

    const hashedPassword = await Bun.password.hash(password);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return <div>User Registered</div>;
  })
  .post("/login", async ({ body, redirect, cookie: { sessionId } }) => {
    const { email, password } = body as LoginBody;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return <div class="alert alert-error">User not found</div>;
    }

    const isPasswordValid = await Bun.password.verify(password, user.password);
    if (!isPasswordValid) {
      return <div class="alert alert-error">Invalid password</div>;
    }
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await prisma.session.create({
      data: {
        expiresAt,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    sessionId.set({
      value: session.id,
      httpOnly: true,
      expires: expiresAt,
    });

    return new Response(null, {
      headers: {
        "HX-Location": "/dashboard",
      },
    });
  })
  .get("/login", () => {
    return <Login />;
  })
  .get("/register", () => {
    return <Register />;
  });
