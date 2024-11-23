import { Html } from "@kitajs/html";
import { DashboardLayout } from "../dashboardLayout";

export const Overview = () => {
  const data = [
    { date: "Fr, Nov 15", value: 15 },
    { date: "Sa, Nov 16", value: 4 },
    { date: "Su, Nov 17", value: 2 },
    { date: "Mo, Nov 18", value: 1 },
    { date: "Tu, Nov 19", value: 4 },
    { date: "Wed, Nov 28", value: 7 },
    { date: "Fri, Nov 28", value: 2 },
  ];

  const maxGridHeight = 500;
  const maxValue = Math.max(...data.map((d) => d.value));
  const gridSteps = 5;
  const stepValue = maxValue / gridSteps;

  return (
    <DashboardLayout>
      <main class="space-y-6">
        <section>
          <h3>Overview</h3>
          <p>Weekly Revenues</p>
        </section>
        <section class="grid grid-cols-3 gap-6">
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
        <div class="relative border-b-2 border-indigo-700 p-12 pb-0">
          <div class="absolute inset-0 left-4 top-10 w-full -z-10 flex flex-col justify-between h-[500px]">
            {Array.from({ length: gridSteps + 1 }).map((_, index) => {
              const gridValue = Math.round(stepValue * (gridSteps - index)); // Calculate grid line value
              return (
                <div class="flex items-center justify-between">
                  <div class="text-sm text-indigo-500 w-10 -translate-y-1/2">{gridValue}</div>
                  <div class="flex-1 border-t border-dashed border-indigo-400"></div>
                </div>
              );
            })}
          </div>

          <div class="flex justify-around gap-4 items-end h-[500px]">
            {data.map(({ value, date }, index) => {
              const barHeight = (value / maxValue) * maxGridHeight;
              return (
                <div class="relative group w-full">
                  <div
                    style={{ height: `${barHeight}px` }}
                    class="w-full bg-gradient-to-b from-indigo-600/40 to-indigo-100/40 border-t-2 border-indigo-700 hover:opacity-70 transition-all duration-300"
                  ></div>

                  <div
                    safe
                    class="duration-700 absolute w-[120px] text-center bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block p-2 bg-indigo-700 text-white text-sm rounded shadow-lg"
                  >
                    {`${date}: ${value}`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
                <button class="w-fit text-sm">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </DashboardLayout>
  );
};
