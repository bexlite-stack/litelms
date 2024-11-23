import { Html } from "@kitajs/html";

interface CourseCardProps {
  id: string;
  title: string;
  desc: string;
  href: string;
  children?: JSX.Element;
}

export const CourseCard = ({ id, title, desc, href, children }: CourseCardProps) => {
  return (
    <div class="card p-0">
      <div class="bg-slate-100 h-64" />
      <div class="p-6 space-y-6">
        <div class="space-y-2">
          <h3 safe>{title}</h3>
          <p safe>{desc}</p>
        </div>
        {children ? (
          children
        ) : (
          <div class="flex gap-2">
            <a href={href} hx-boost="true" class="block w-full">
              <button class="text-sm">Continue</button>
            </a>
            <button hx-post={`/dashboard/admin/courses/${id}/request-certificate`} class="text-sm btn-outline">
              Request Certificate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
