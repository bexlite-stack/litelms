import { Html } from "@kitajs/html";
import { Lesson } from "@prisma/client";

export const LessonCard = ({ lesson }: { lesson: Lesson }) => {
  return (
    <div class="bg-slate-50 p-4 rounded-lg border flex items-center justify-between border-slate-100">
      <div class="font-medium" safe>
        {lesson.title}
      </div>
      <div class="flex gap-2">
        <button class="text-sm">Edit</button>
        <button class="text-sm">Delete</button>
      </div>
    </div>
  );
};
