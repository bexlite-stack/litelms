import { Html } from "@kitajs/html";
import { DashboardLayout } from "../dashboardLayout";

export const Students = () => {
  return (
    <DashboardLayout>
      <table class="w-full text-left table-auto table-zebra">
        <thead class="border-b">
          <tr>
            <th class="p-4">ID</th>
            <th>User</th>
            <th>Course</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-4">1</td>
            <td>Indra Zulfi</td>
            <td>Python for Data Analyst</td>
            <td>Granted</td>
            <td>IDR 150.000</td>
            <td class="flex gap-2 py-4">
              <button class="w-fit btn-sm">Send Email</button>
              <button class="w-fit btn-outline  btn-sm">Mark as Cancel</button>
            </td>
          </tr>
          <tr>
            <td class="p-4">1</td>
            <td>Indra Zulfi</td>
            <td>Python for Data Analyst</td>
            <td>Granted</td>
            <td>IDR 150.000</td>
            <td class="flex gap-2 py-4">
              <button class="w-fit  btn-sm">Send Email</button>
              <button class="w-fit btn-outline btn-sm">Mark as Cancel</button>
            </td>
          </tr>
        </tbody>
      </table>
    </DashboardLayout>
  );
};
