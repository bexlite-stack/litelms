import Elysia from "elysia";
import { Html } from "@kitajs/html";
import { prisma } from "../utils/prisma";
import { DashboardLayout } from "../views/dashboard/dashboardLayout";

export const adminCertificatesRouter = new Elysia({ prefix: "/dashboard/admin" })
  .get("/certificates", async () => {
    const allCertificates = await prisma.certificate.findMany({
      where: {
        status: "REQUESTED",
      },
      include: {
        user: true,
        course: true,
      },
    });

    return (
      <DashboardLayout>
        <main class="space-y-8">
          <section>
            <h3>Certificate Request</h3>
            <p>Here is your all certificates</p>
          </section>
          <section class="grid grid-cols-4 gap-8">
            {allCertificates.map((cert) => {
              return (
                <div class="card space-y-2">
                  <div>{cert.course.title}</div>
                  <h3>{cert.user.name}</h3>
                  <form hx-patch="/dashboard/admin/certificates">
                    <input name="certificateId" value={cert.id} readonly hidden />
                    <button class="text-sm">Approve</button>
                  </form>
                </div>
              );
            })}
          </section>
        </main>
      </DashboardLayout>
    );
  })

  .patch("/certificates", async ({ body }) => {
    const { certificateId } = body as any;

    await prisma.certificate.update({
      where: {
        id: certificateId,
      },
      data: {
        status: "APPROVED",
      },
    });

    return new Response(null, {
      headers: {
        "HX-Refresh": "true",
      },
    });
  });
