// domain/invitation/core.schema.ts

export const CoreInvitationSchema = {
  title: {
    type: "text",
    required: true,
    description: "Judul utama undangan",
    example: "Pernikahan Fadil & Aisyah",
  },

  slug: {
    type: "slug",
    required: true,
    unique: true,
    description: "Digunakan untuk URL publik (/u/[slug])",
    example: "fadil-aisyah",
  },

  eventDate: {
    type: "datetime",
    required: true,
    description: "Tanggal & waktu acara utama",
  },

  timezone: {
    type: "string",
    required: false,
    default: "Asia/Jakarta",
  },

  location: {
    type: "text",
    required: false,
    description: "Lokasi acara utama (teks)",
  },

  coverImage: {
    type: "image",
    required: false,
    description: "Cover utama undangan",
  },

  status: {
    type: "enum",
    values: ["draft", "published", "archived"],
    default: "draft",
    description: "Status lifecycle undangan",
  },

  visibility: {
    type: "enum",
    values: ["public", "private"],
    default: "public",
    description: "Apakah undangan bisa diakses publik",
  },
} as const;
