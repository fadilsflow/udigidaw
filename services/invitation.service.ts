// services/invitation.service.ts

import { CoreInvitationZodSchema } from "@/domain/invitation/zod.schema";
import { InvitationEntity } from "@/domain/invitation/types";

/**
 * Dummy in-memory data
 * Nanti bisa diganti DB tanpa ubah contract
 */
const DUMMY_INVITATIONS: InvitationEntity[] = [
  {
    id: "inv-001",
    userId: "user-001",
    templateId: "wedding-01",

    coreData: CoreInvitationZodSchema.parse({
      title: "Pernikahan Joko & Aisyah",
      slug: "joko-aisyah",
      eventDate: "2025-06-12T09:00:00.000Z",
      timezone: "Asia/Jakarta",
      location: "JL. Kebon Jeruk No. 123, Jakarta, Indonesia",
      coverImage: "/wedding-left.jpeg",
      status: "published",
      visibility: "public",
    }),

    templateData: {
      groomName: "Joko",
      brideName: "Aisyah",
      events: [
        {
          name: "Acara Pernikahan",
          date: "2025-06-12",
          time: "09:00 WIB",
          venueName: "JL. Kebon Jeruk No. 123, Jakarta, Indonesia",
        },
        {
          name: "Acara Pernikahan",
          date: "2025-06-12",
          time: "09:00 WIB",
          venueName: "JL. Kebon Jeruk No. 123, Jakarta, Indonesia",
        },
      ],
      photos: [
        "/file.svg",
        "/file.svg",
        "/file.svg",
        "/file.svg",
        "/file.svg",
        "/file.svg",
      ],
    },

    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    updatedAt: new Date("2025-01-01T00:00:00.000Z"),
  },
];

/**
 * Ambil invitation berdasarkan slug
 */
export async function getInvitationBySlug(
  slug: string
): Promise<InvitationEntity | null> {
  const invitation = DUMMY_INVITATIONS.find(
    (inv) => inv.coreData.slug === slug
  );

  if (!invitation) return null;

  return invitation;
}
