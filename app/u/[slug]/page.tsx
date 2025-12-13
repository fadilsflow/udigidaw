// app/u/[slug]/page.tsx

import { notFound } from "next/navigation";
import WeddingTemplate from "@/templates/wedding-01/Renderer";
import { getInvitationBySlug } from "@/services/invitation.service";
import { WeddingTemplateData } from "@/templates/wedding-01/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function InvitationPage({ params }: PageProps) {
  const { slug } = await params;
  const invitation = await getInvitationBySlug(slug);

  if (!invitation || invitation.coreData.status !== "published") {
    notFound();
  }

  // Untuk sekarang kita hardcode wedding-01
  // Nanti bisa pakai switch atau registry
  return (
    <WeddingTemplate
      core={invitation.coreData}
      data={invitation.templateData as WeddingTemplateData}
    />
  );
}
