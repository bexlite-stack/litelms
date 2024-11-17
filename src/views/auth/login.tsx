import { Html } from "@kitajs/html";
import { RootLayout } from "../rootLayout";

export const Login = () => {
  return (
    <RootLayout>
      <main class="h-screen flex justify-center items-center">
        <div class="w-[300px] space-y-4">
          <section>
            <h3>Sign in</h3>
            <p>Login to continue</p>
          </section>
          <form hx-post="/login" hx-target="#message" class="space-y-2">
            <input name="email" placeholder="Email" />
            <input name="password" placeholder="Password" type="password" />
            <button>Login</button>
          </form>
          <div id="message"></div>
          <p>
            Don't have an account ?{" "}
            <a href="/register" hx-boost="true" hx-swap="transition:true">
              Register
            </a>
          </p>
        </div>
      </main>
    </RootLayout>
  );
};
