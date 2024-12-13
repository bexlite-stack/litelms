import Elysia from "elysia";
import { Html } from "@kitajs/html";
import { prisma } from "../utils/prisma";
import { Students } from "../views/dashboard/admin/students";

export const adminStudentRouter = new Elysia({
	prefix: "/dashboard/admin",
}).get("/students", async () => {
	const students = await prisma.user.findMany({
		where: {
			role: "USER",
		},
	});

	return <Students users={students} />;
});
