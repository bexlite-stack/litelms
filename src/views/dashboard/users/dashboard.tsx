import { Html } from "@kitajs/html";
import { DashboardLayout } from "../dashboardLayout";

export const Dashboard = () => {
  return (
    <DashboardLayout>
      <section class="grid grid-cols-3 gap-6 p-6">
        <div class="card card-bordered card-body">
          <p>Total Course</p>
          <h2>3</h2>
        </div>
        <div class="card card-bordered card-body">
          <p>Total Students</p>
          <h2>3</h2>
        </div>
        <div class="card card-bordered card-body">
          <p>Total Revenue</p>
          <h2>IDR 460.000</h2>
        </div>
      </section>
    </DashboardLayout>
  );
};
