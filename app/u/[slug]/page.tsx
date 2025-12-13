// app/u/[slug]/page.tsx

import { notFound } from "next/navigation";
import WeddingTemplate from "@/templates/wedding-01/Renderer";
import { getInvitationBySlug } from "@/services/invitation.service";
import { WeddingTemplateData } from "@/templates/wedding-01/types";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ to?: string }>;
}

export default async function InvitationPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;

  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  const guestName = resolvedSearchParams?.to
    ? decodeURIComponent(resolvedSearchParams.to)
    : undefined;

  const invitation = await getInvitationBySlug(slug);

  if (!invitation || invitation.coreData.status !== "published") {
    notFound();
  }

  return (
    <WeddingTemplate
      core={invitation.coreData}
      data={invitation.templateData as WeddingTemplateData}
      guestName={guestName}
    />
  );
}
