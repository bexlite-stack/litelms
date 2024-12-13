import Elysia from "elysia";
import { Html } from "@kitajs/html";
import { prisma } from "../utils/prisma";
import { DashboardLayout } from "../views/dashboard/dashboardLayout";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import path from "node:path";
import fs from "node:fs/promises";

export const adminCertificatesRouter = new Elysia({
  prefix: "/dashboard/admin",
})
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
    const { certificateId } = body as { certificateId: string };

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
  })

  .get("/certificates/:certificateId", async ({ params, redirect }) => {
    const { certificateId } = params;

    const certificate = await prisma.certificate.findFirst({
      where: {
        id: certificateId,
      },
      include: {
        user: true,
        course: true,
      },
    });

    if (!certificate) {
      return new Response(null, {
        headers: {
          "HX-Location": "/dashboard/admin/certificates",
        },
      });
    }

    const certificateTemplatePath = path.resolve("public", "CertificateTemplate.pdf");
    const certificateTemplate = await fs.readFile(certificateTemplatePath);
    const fontPath = path.resolve("public", "Inter-Bold.ttf");
    const font = await fs.readFile(fontPath);
    const pdfDoc = await PDFDocument.load(new Uint8Array(certificateTemplate));

    // first page of PDF
    const page = pdfDoc.getPage(0);
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(new Uint8Array(font));
    const letterSpacing = -0.95;

    // modify template
    let nameXPos = 197;
    for (const char of certificate.user.name) {
      page.drawText(char, {
        x: nameXPos,
        y: 332,
        size: 40,
        font: customFont,
        color: rgb(0, 0, 0),
      });
      nameXPos += customFont.widthOfTextAtSize(char, 40) + letterSpacing;
    }

    let titleXPos = 197;
    for (const char of certificate.course.title) {
      page.drawText(char, {
        x: titleXPos,
        y: 238,
        size: 32,
        font: customFont,
        color: rgb(0, 0, 0),
      });
      titleXPos += customFont.widthOfTextAtSize(char, 32) + letterSpacing;
    }

    const pdfBytes = await pdfDoc.save();
    Bun.write(`public/certificates/${certificateId}.pdf`, pdfBytes);

    return redirect(`/public/certificates/${certificateId}.pdf`);
  });
