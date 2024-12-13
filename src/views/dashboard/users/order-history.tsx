import { Html } from "@kitajs/html";
import { DashboardLayout } from "../dashboardLayout";
import moment from "moment";

type OrderHistoryProps = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  orders: any[];
};

export const OrderHistory = ({ orders }: OrderHistoryProps) => {
  return (
    <DashboardLayout>
      <table class="w-full text-left table-auto table-zebra">
        <thead class="border-b">
          <tr>
            <th class="py-2">Course</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr>
                <td class="font-bold py-4">{order.course.title}</td>
                <td>
                  <div class="bg-emerald-100 text-emerald-600 border border-emerald-500 font-bold text-sm w-fit px-2 py-1 rounded-lg ">{order.status}</div>
                </td>
                <td>{order.amount}</td>
                <td>{moment(order.createdAt).format("DD/MM/YYYY")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </DashboardLayout>
  );
};
