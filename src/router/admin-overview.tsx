import Elysia from "elysia";
import { Overview } from "../views/dashboard/admin/overview";
import { Html } from "@kitajs/html";
import { prisma } from "../utils/prisma";

export const adminOverviewRouter = new Elysia({
	prefix: "/dashboard/admin",
}).get("/overview", async () => {
	const courseCount = await prisma.course.count();
	const studentCount = await prisma.user.count();
	const revenues = await prisma.order.findMany({
		where: { status: "PAID" },
	});

	const revenueData = revenues.map((revenue) => ({
		date: revenue.createdAt.toDateString(),
		value: revenue.amount,
	}));

	while (revenueData.length < 7) {
		revenueData.push({ date: "", value: 0 });
	}

	const totalRevenue = revenues.reduce((acc, curr) => acc + curr.amount, 0);

	return (
		<Overview
			courseCount={courseCount}
			revenueData={revenueData}
			studentCount={studentCount}
			totalRevenue={totalRevenue}
		/>
	);
});
