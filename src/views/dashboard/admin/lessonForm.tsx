import { Html } from "@kitajs/html";
import { DashboardLayout } from "../dashboardLayout";

export const LessonForm = ({ courseId }: { courseId: string }) => {
  return (
    <DashboardLayout>
      <main class="max-w-xl m-auto py-8 space-y-4">
        <form class="space-y-5" hx-post={`/dashboard/admin/courses/${courseId}/add-lesson`} hx-target="#list" hx-swap="beforeend">
          <section class="space-y-2">
            <h3>Add Lesson</h3>
            <p>Fill the form below to create a new lesson</p>
          </section>
          <section class="space-y-2">
            <input name="title" placeholder="Title" />
            <input name="videoUrl" placeholder="Url" />
            <select name="status">
              <option value="beginner">Unlock</option>
              <option value="intermediate">Lock</option>
            </select>
            <button>Add Lesson</button>
          </section>
        </form>
        <section id="list" hx-get={`/dashboard/admin/courses/${courseId}/lessons`} hx-trigger="load" class="space-y-2"></section>
      </main>
    </DashboardLayout>
  );
};
