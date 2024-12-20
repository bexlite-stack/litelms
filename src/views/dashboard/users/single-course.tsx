import type { Lesson } from "@prisma/client";
import { DashboardLayout } from "../dashboardLayout";
import { Html } from "@kitajs/html";

interface SingleCoursesProps {
  courseId: string;
  allLessons: Lesson[];
  currentLesson: Lesson;
}

export const SingleCourse = ({ allLessons, courseId, currentLesson }: SingleCoursesProps) => {
  return (
    <DashboardLayout className="p-0">
      <main class="flex">
        <aside class="border-r w-[240px] h-screen">
          {allLessons.map((lesson) => {
            return (
              <a
                href={`/dashboard/my-courses/${courseId}/${lesson.id}`}
                hx-boost="true"
                class="block text-slate-500 p-2 border-b border-slate-50 text-sm hover:bg-slate-100"
              >
                {lesson.title}
              </a>
            );
          })}
        </aside>
        <div class="w-[calc(100%-240px)] p-4">
          <iframe
            width="100%"
            height="720px"
            src={`https://www.youtube.com/embed/${currentLesson.videoUrl}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            class="rounded-xl overflow-hidden"
            allowfullscreen
          />
        </div>
      </main>
    </DashboardLayout>
  );
};
