// templates/wedding-01/schema.ts

export const WeddingTemplateSchema = {
  id: "wedding-01",
  name: "Wedding Classic",
  category: "wedding",

  sections: [
    {
      id: "couple",
      label: "Mempelai",
      fields: {
        groomName: {
          type: "text",
          label: "Nama Pengantin Pria",
          required: true,
        },
        brideName: {
          type: "text",
          label: "Nama Pengantin Wanita",
          required: true,
        },
      },
    },

    {
      id: "event",
      label: "Detail Acara",
      fields: {
        eventTime: {
          type: "time",
          label: "Waktu Acara",
          required: true,
        },
        venueName: {
          type: "text",
          label: "Nama Tempat",
          required: false,
        },
      },
    },

    {
      id: "gallery",
      label: "Galeri Foto",
      fields: {
        photos: {
          type: "image[]",
          label: "Foto Galeri",
          max: 6,
          required: false,
        },
      },
    },
  ],
} as const;
