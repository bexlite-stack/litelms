import { Html } from "@kitajs/html";
import { RootLayout } from "../rootLayout";
import { twMerge } from "tailwind-merge";

interface DashboardLayoutProps {
	children: JSX.Element | JSX.Element[];
	className?: string;
}

export const DashboardLayout = ({
	children,
	className,
}: DashboardLayoutProps) => {
	return (
		<RootLayout>
			<div class="h-screen flex">
				<aside class="w-[240px] border-r p-6 flex flex-col justify-between">
					<div class="space-y-6">
						<div class="ml-3 font-bold tracking-tight">litelms.</div>
						<section>
							<h4 class="ml-3">Platform</h4>
							<a href="/dashboard" hx-boost="true" class="menu">
								Dashboard
							</a>
							<a href="/dashboard/my-courses" hx-boost="true" class="menu">
								My Courses
							</a>
							<a href="/dashboard/orders" hx-boost="true" class="menu">
								Order History
							</a>
						</section>
						<section>
							<h4 class="ml-3">Admin</h4>
							<a href="/dashboard/admin/overview" hx-boost="true" class="menu">
								Overview
							</a>
							<a href="/dashboard/admin/courses" hx-boost="true" class="menu">
								Courses
							</a>
							<a href="/dashboard/admin/students" hx-boost="true" class="menu">
								Students
							</a>{" "}
							<a
								href="/dashboard/admin/certificates"
								hx-boost="true"
								class="menu"
							>
								Certificates
							</a>
						</section>
					</div>
					<button class="btn-outline text-sm">Logout</button>
				</aside>
				<main
					class={twMerge(
						"w-[calc(100vw-240px)] overflow-y-auto p-6",
						className,
					)}
				>
					{children}
				</main>
			</div>
		</RootLayout>
	);
};
