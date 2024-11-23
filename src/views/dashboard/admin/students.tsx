import { Html } from "@kitajs/html";
import { DashboardLayout } from "../dashboardLayout";
import { User } from "@prisma/client";

export const Students = ({ users }: { users: User[] }) => {
  return (
    <DashboardLayout>
      <table class="w-full text-left table-auto table-zebra">
        <thead class="border-b">
          <tr>
            <th class="py-4">ID</th>
            <th>User</th>
            <th>Registered At</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <td class="py-4">{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.createdAt.toDateString()}</td>
              <td>Active</td>
              <td>
                <button class="w-fit text-sm">Ban</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
};
