import { Html } from "@kitajs/html";
import { DashboardLayout } from "../dashboardLayout";

export const LessonForm = ({ courseId }: { courseId: string }) => {
  return (
    <DashboardLayout>
      <main class="max-w-xl m-auto py-8 space-y-4">
        <form class="space-y-5" hx-post={`/dashboard/admin/lessons`} hx-target="#message">
          <section class="space-y-2">
            <h3>Add Lesson</h3>
            <p>Fill the form below to create a new lesson</p>
          </section>
          <section class="space-y-2">
            <input name="courseId" type="hidden" value={courseId} />
            <input name="title" placeholder="Title" />
            <input name="videoUrl" placeholder="Url" />
            <button>Add Lesson</button>
          </section>
          <div id="message"></div>
        </form>
        <section id="list" hx-get={`/dashboard/admin/lessons?courseId=${courseId}`} hx-trigger="load" class="space-y-2"></section>
      </main>
    </DashboardLayout>
  );
};
