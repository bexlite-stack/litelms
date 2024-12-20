import { Html } from "@kitajs/html";
import { DashboardLayout } from "../dashboardLayout";

export const CourseForm = () => {
  return (
    <DashboardLayout>
      <main class="max-w-xl m-auto py-8 space-y-4">
        <form class="space-y-5" hx-post="/dashboard/admin/courses" hx-target="#message" hx-encoding="multipart/form-data">
          <section class="space-y-2">
            <h3>Create Course</h3>
            <p>Fill the form below to create a new course</p>
          </section>
          <section class="space-y-2">
            <input name="image" type="file" accept=".png" class="file-input file-input-bordered" />
            <input name="title" placeholder="Title" />
            <textarea name="description" placeholder="Description" rows="6" />
            <input name="price" placeholder="Price" type="number" />
            <select name="level">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <button>Next</button>
          </section>
          <section id="message" />
        </form>
      </main>
    </DashboardLayout>
  );
};
