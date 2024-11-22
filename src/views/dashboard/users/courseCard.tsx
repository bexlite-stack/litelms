import { Html } from "@kitajs/html";

interface CourseCardProps {
  title: string;
  desc: string;
}

export const CourseCard = ({ title, desc }: CourseCardProps) => {
  return (
    <div class="card p-0">
      <div class="bg-slate-100 h-64 rounded-t-lg" />
      <div class="p-6 space-y-2">
        <div>
          <h3 safe>{title}</h3>
          <p safe>{desc}</p>
        </div>
        <div>
          <button>Continue Learning</button>
        </div>
      </div>
    </div>
  );
};
