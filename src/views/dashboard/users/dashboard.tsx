import { Html } from "@kitajs/html";
import { DashboardLayout } from "../dashboardLayout";

export const Dashboard = () => {
  return (
    <DashboardLayout>
      <section class="grid grid-cols-3 gap-6 p-6">
        <div class="card space-y-4">
          <p>Total Course</p>
          <h2>3</h2>
        </div>
        <div class="card space-y-4">
          <p>Total Students</p>
          <h2>43</h2>
        </div>
        <div class="card space-y-4">
          <p>Total Revenue</p>
          <h2>IDR 460.000</h2>
        </div>
      </section>
    </DashboardLayout>
  );
};
