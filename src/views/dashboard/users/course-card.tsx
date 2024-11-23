import { Html } from "@kitajs/html";

interface CourseCardProps {
  title: string;
  desc: string;
  href: string;
}

export const CourseCard = ({ title, desc, href }: CourseCardProps) => {
  return (
    <div class="card p-0">
      <div class="bg-slate-100 h-64" />
      <div class="p-6 space-y-6">
        <div class="space-y-2">
          <h3 safe>{title}</h3>
          <p safe>{desc}</p>
        </div>
        <div class="flex gap-2">
          <a href={href} hx-boost="true" class="block w-full">
            <button class="text-sm">Continue</button>
          </a>
          <button class="text-sm btn-outline">Request Certificate</button>
        </div>
      </div>
    </div>
  );
};
