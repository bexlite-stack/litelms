import { Html } from "@kitajs/html";
import { DashboardLayout } from "../dashboardLayout";

export const OrderHistory = () => {
  return (
    <DashboardLayout>
      <table class="w-full text-left table-auto table-zebra">
        <thead class="border-b">
          <tr>
            <th class="py-2">ID</th>
            <th>User</th>
            <th>Course</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Indra Zulfi</td>
            <td class="font-bold">Python for Data Analyst</td>
            <td>Granted</td>
            <td>IDR 150.000</td>
            <td class="flex gap-2 py-4">
              <button class="w-fit text-sm">View Receipt</button>
            </td>
          </tr>
        </tbody>
      </table>
    </DashboardLayout>
  );
};
