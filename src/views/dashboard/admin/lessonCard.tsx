import { Html } from "@kitajs/html";
import { Lesson } from "@prisma/client";

export const LessonCard = ({ lesson }: { lesson: Lesson }) => {
	return (
		<main class="bg-slate-50 p-4 rounded-lg border flex items-center justify-between border-slate-100">
			<div class="font-medium" safe>
				{lesson.title}
			</div>
			<div class="flex gap-2">
				<button
					hx-delete={`/dashboard/admin/lessons/${lesson.id}`}
					hx-target="closest main"
					hx-swap="outerHTML"
					class="text-sm"
				>
					Delete
				</button>
			</div>
		</main>
	);
};
