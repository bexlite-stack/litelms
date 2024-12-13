import { Html } from "@kitajs/html";

interface CourseCardProps {
	id: string;
	title: string;
	desc: string;
	published: boolean;
	image: string;
}

export const CourseCard = ({
	id,
	title,
	desc,
	published,
	image,
}: CourseCardProps) => {
	return (
		<div class="card p-0">
			<div class="bg-slate-100 h-64 rounded-t-lg overflow-hidden">
				<img src={`/public/courses/${id}/image.png`} />
			</div>
			<div class="p-6 space-y-6">
				<div class="space-y-2">
					<h3 safe>{title}</h3>
					<p safe>{desc}</p>
				</div>
				<div class="flex gap-2">
					<a
						href={`/dashboard/admin/courses/${id}/edit-lesson`}
						hx-boost="true"
						class="block w-full"
					>
						<button class="btn-outline text-sm">Edit lesson</button>
					</a>
					<div class="w-full">
						{published ? (
							<form hx-patch={`/dashboard/admin/courses/${id}`}>
								<input value="false" name="published" hidden />
								<button class="text-sm">Unpublish</button>
							</form>
						) : (
							<form hx-patch={`/dashboard/admin/courses/${id}`}>
								<input value="true" name="published" hidden />
								<button class="text-sm">Publish</button>
							</form>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
