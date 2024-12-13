import { Html } from "@kitajs/html";
import { DashboardLayout } from "../dashboardLayout";
import { CourseCard } from "./course-card";
import { Certificate, Course } from "@prisma/client";

interface MyCourseProps {
	courses: Course[];
	certificates: Certificate[];
}

export const MyCourse = ({ courses, certificates }: MyCourseProps) => {
	return (
		<DashboardLayout>
			<main class="space-y-4">
				<section>
					<h3>All my courses</h3>
					<p>Here is your all purchased courses</p>
				</section>
				<section class="grid grid-cols-3 gap-6">
					{courses.map((course) => {
						const certificateRequested = certificates.find(
							(i) => i.courseId === course.id && i.status === "REQUESTED",
						);
						const certificateApproved = certificates.find(
							(i) => i.status === "APPROVED",
						);
						const certificateId = certificates.find(
							(i) => i.courseId === course.id,
						)?.id;

						return (
							<CourseCard
								id={course.id}
								title={course.title}
								desc={course.description}
							>
								<div class="flex gap-2">
									<a
										href={`/dashboard/my-courses/${course.id}/first-lesson`}
										hx-boost="true"
										class="block w-full"
									>
										<button class="text-sm">Continue</button>
									</a>
									{certificateApproved && (
										<button
											hx-get={`/dashboard/admin/certificates/${certificateId}`}
											class="text-sm btn-outline"
										>
											Download Certificate
										</button>
									)}
									{certificateRequested && (
										<button class="text-sm btn-outline bg-yellow-100 border-yellow-600 text-yellow-700 cursor-text">
											Certificate Requested
										</button>
									)}
									{!certificateRequested && !certificateApproved && (
										<button
											hx-post={`/dashboard/admin/courses/${course.id}/request-certificate`}
											class="text-sm btn-outline"
										>
											Request Certificate
										</button>
									)}
								</div>
							</CourseCard>
						);
					})}
				</section>
			</main>
		</DashboardLayout>
	);
};
