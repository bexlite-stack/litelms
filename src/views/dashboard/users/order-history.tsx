import { Html } from "@kitajs/html";
import { DashboardLayout } from "../dashboardLayout";
import { Order } from "@prisma/client";

interface OrderHistoryProps {
  orders: any[];
}

export const OrderHistory = ({ orders }: OrderHistoryProps) => {
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
          {orders.map((order) => {
            return (
              <tr>
                <td>{order.id}</td>
                <td>{order.user.name}</td>
                <td class="font-bold">{order.course.title}</td>
                <td>
                  <div class="bg-emerald-100 text-emerald-600 border border-emerald-500 font-bold text-sm w-fit px-2 py-1 rounded-lg ">{order.status}</div>
                </td>
                <td>{order.amount}</td>
                <td class="flex gap-2 py-4">
                  <button class="w-fit text-sm">View Receipt</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </DashboardLayout>
  );
};
