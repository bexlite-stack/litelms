import { Html } from "@kitajs/html";

interface CourseCardProps {
  title: string;
  desc: string;
  children?: JSX.Element;
}

export const CourseCard = ({ title, desc, children }: CourseCardProps) => {
  return (
    <div class="card p-0">
      <div class="bg-slate-100 h-64" />
      <div class="p-6 space-y-6">
        <div class="space-y-2">
          <h3 safe>{title}</h3>
          <p safe>{desc}</p>
        </div>
        {children}
      </div>
    </div>
  );
};
