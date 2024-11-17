import { Html } from "@kitajs/html";

interface CourseCardProps {
  id: string;
  title: string;
  desc: string;
}

export const CourseCard = ({ id, title, desc }: CourseCardProps) => {
  return (
    <div class="card card-bordered">
      <div class="bg-slate-100 h-64 rounded-t-lg"></div>
      <div class="card-body">
        <h3 class="text-xl">{title}</h3>
        <p>{desc}</p>
      </div>
      <div class="p-6 pt-0 flex gap-2">
        <button class="btn-outline btn w-fit animate-none">Edit</button>
        <a href={`/dashboard/admin/courses/${id}/add-lesson`} hx-boost="true">
          <button class="btn-outline btn w-fit animate-none">Add lesson</button>
        </a>
        <button class="btn-primary btn w-fit animate-none">Publish</button>
      </div>
    </div>
  );
};
