import { Html } from "@kitajs/html";
import { RootLayout } from "../rootLayout";

export const Register = () => {
  return (
    <RootLayout>
      <main class="h-screen flex justify-center items-center">
        <div class="w-[300px] space-y-4">
          <section>
            <h3>Sign up</h3>
            <p>Create account to continue</p>
          </section>
          <form hx-post="/register" hx-target="#message" class="space-y-2">
            <input name="name" placeholder="Name" />
            <input name="email" placeholder="Email" />
            <input name="password" placeholder="Password" type="password" />
            <button>Register</button>
          </form>
          <div id="message"></div>
          <p>
            Have an account ?{" "}
            <a href="/login" hx-boost="true" hx-swap="transition:true">
              Login
            </a>
          </p>
        </div>
      </main>
    </RootLayout>
  );
};
