import { Html } from "@kitajs/html";

interface CourseCardProps {
  title: string;
  desc: string;
}

export const CourseCard = ({ title, desc }: CourseCardProps) => {
  return (
    <div class="card card-bordered">
      <div class="bg-slate-100 h-64 rounded-t-lg"></div>
      <div class="card-body">
        <h3 class="text-xl">{title}</h3>
        <p>{desc}</p>
      </div>
      <div class="card-actions p-6 pt-0">
        <button class="btn-outline btn animate-none">Continue Learning</button>
      </div>
    </div>
  );
};
