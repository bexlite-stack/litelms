import { Html } from "@kitajs/html";

interface CourseCardProps {
  id: string;
  title: string;
  desc: string;
}

export const CourseCard = ({ id, title, desc }: CourseCardProps) => {
  return (
    <div class="card p-0">
      <div class="bg-slate-100 h-64 rounded-t-lg" />
      <div class="p-6 space-y-6">
        <div class="space-y-2">
          <h3 safe>{title}</h3>
          <p safe>{desc}</p>
        </div>
        <div class="flex gap-2">
          <button class="text-sm btn-outline">Edit</button>
          <a href={`/dashboard/admin/courses/${id}/add-lesson`} hx-boost="true" class="block w-full">
            <button class="btn-outline text-sm">Add lesson</button>
          </a>
          <button class="text-sm">Publish</button>
        </div>
      </div>
    </div>
  );
};
