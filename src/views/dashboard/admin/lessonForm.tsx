import { Html } from "@kitajs/html";
import { DashboardLayout } from "../dashboardLayout";

export const LessonForm = () => {
  return (
    <DashboardLayout>
      <main class="max-w-xl m-auto py-8 space-y-4">
        <form class="space-y-5">
          <section class="space-y-2">
            <h3>Add Lesson</h3>
            <p>Fill the form below to create a new lesson</p>
          </section>
          <section class="space-y-2">
            <input placeholder="Title" />
            <input placeholder="Url" />
            <select>
              <option value="beginner">Unlock</option>
              <option value="intermediate">Lock</option>
            </select>
            <button>Add Lesson</button>
          </section>
        </form>
      </main>
    </DashboardLayout>
  );
};
