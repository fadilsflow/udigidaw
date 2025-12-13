// templates/wedding-01/Renderer.tsx

import { CoreInvitationData } from "@/domain/invitation/types";
import { WeddingTemplateData } from "./types";

interface WeddingTemplateProps {
  core: CoreInvitationData;
  data: WeddingTemplateData;
  guestName?: string;
}

export default function WeddingTemplate({
  core,
  data,
  guestName,
}: WeddingTemplateProps) {
  return (
    <main className="min-h-screen  text-center p-6">
      {/* Cover */}
      <section className="mb-8">
        {core.coverImage && (
          <img
            src={core.coverImage}
            alt={core.title}
            className="mx-auto rounded-lg mb-4"
          />
        )}
        <h1 className="text-3xl font-bold">{core.title}</h1>
        <p className="">{core.location}</p>
      </section>

      {guestName && (
        <p className="text-sm text-gray-500">
          Kepada Yth. <strong>{guestName}</strong>
        </p>
      )}

      {/* Couple */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold">
          {data.groomName} & {data.brideName}
        </h2>
      </section>

      {/* Event */}
      <section className="mb-10">
        <p className="font-medium">
          {new Date(core.eventDate).toLocaleDateString("id-ID")}
        </p>
        <p>{data.eventTime}</p>
        {data.venueName && <p>{data.venueName}</p>}
      </section>

      {/* Gallery */}
      {data.photos && data.photos.length > 0 && (
        <section className="grid grid-cols-2 gap-4">
          {data.photos.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Gallery ${idx + 1}`}
              className="rounded-md h-10 w-10"
            />
          ))}
        </section>
      )}
    </main>
  );
}
