import { Html } from "@kitajs/html";
import { RootLayout } from "../rootLayout";

interface DashboardLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <RootLayout>
      <div class="h-screen flex">
        <aside class="w-[240px] border-r p-6 flex flex-col justify-between">
          <div class="space-y-6">
            <div class="ml-3 font-bold tracking-tight">litelms.</div>
            <section>
              <h4 class="ml-3">Platform</h4>
              <a href="/dashboard" hx-boost="true" class="menu">
                Dashboard
              </a>
              <a href="/dashboard/my-courses" hx-boost="true" class="menu">
                My Courses
              </a>
              <a href="/dashboard/orders" hx-boost="true" class="menu">
                Order History
              </a>
            </section>
            <section>
              <h4 class="ml-3">Admin</h4>
              <a href="/dashboard/admin/overview" hx-boost="true" class="menu">
                Overview
              </a>
              <a href="/dashboard/admin/courses" hx-boost="true" class="menu">
                Courses
              </a>
              <a href="/dashboard/admin/students" hx-boost="true" class="menu">
                Students
              </a>
              <a href="/dashboard/admin/revenues" hx-boost="true" class="menu">
                Revenues
              </a>
              <a href="/dashboard/admin/orders" hx-boost="true" class="menu">
                Orders
              </a>
            </section>
          </div>
          <button>Logout</button>
        </aside>
        <main class="w-[calc(100vw-240px)] overflow-y-auto p-6">{children}</main>
      </div>
    </RootLayout>
  );
};
