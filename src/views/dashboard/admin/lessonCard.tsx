import { Html } from "@kitajs/html";
import { Lesson } from "@prisma/client";
import { Up } from "../../icons/up";
import { Down } from "../../icons/down";

export const LessonCard = ({ lesson }: { lesson: Lesson }) => {
  return (
    <div class="bg-slate-50 p-4 rounded-lg border flex justify-between border-slate-100">
      <div class="font-medium">{lesson.title}</div>
      <div class="flex gap-2">
        <button class="btn btn-ghost btn-sm w-fit">
          <Up />
        </button>
        <button class="btn btn-ghost btn-sm w-fit">
          <Down />
        </button>
        <button class="btn btn-outline btn-sm w-fit">Edit</button>
        <button class="btn btn-error text-white btn-sm w-fit">Delete</button>
      </div>
    </div>
  );
};
