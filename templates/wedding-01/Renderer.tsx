// templates/wedding-01/Renderer.tsx

import { CoreInvitationData } from "@/domain/invitation/types";
import { WeddingTemplateData } from "./types";
import { Button } from "@/components/ui/button";
import { CalendarHeart } from "lucide-react";
import { toLocaleDate } from "@/lib/utils";

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
    <main className="flex h-screen w-full">
      {/* LEFT */}
      <section className="hidden md:flex md:w-2/3 sticky top-0 h-screen overflow-hidden flex-col items-center justify-center text-center p-8 bg-white">
        {core.coverImage && (
          <img
            src={core.coverImage}
            alt={core.title}
            className="w-64 h-auto rounded-lg mb-6"
          />
        )}

        <p className="text-sm mb-2">Undangan Pernikahan</p>

        <h1 className="text-3xl font-bold mb-2">{data.groomName}</h1>
        <span className="text-xl">&</span>
        <h1 className="text-3xl font-bold mt-2">{data.brideName}</h1>

        {guestName && (
          <p className="text-sm text-gray-500 mt-6">
            Kepada Yth. <strong>{guestName}</strong>
          </p>
        )}
      </section>

      {/* RIGHT */}
      <section className="w-full md:w-2/3 h-screen overflow-y-auto p-6 bg-gray-50">
        {/* Title */}
        <div className="text-center border-b h-screen flex flex-col justify-center items-center">
          <p>Undangan Pernikahan</p>
          <h2 className="text-2xl font-semibold mb-1">
            {data.groomName} & {data.brideName}
          </h2>

          {/* Countdown */}
          <p className="text-sm text-gray-600 mt-5">
            {toLocaleDate(core.eventDate)}
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-semibold">51</p>
              <p className="text-sm text-gray-500">Hari</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">20</p>
              <p className="text-sm text-gray-500">Jam</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">03</p>
              <p className="text-sm text-gray-500">Menit</p>
            </div>
          </div>
          <Button variant="default" className="rounded-full mt-5 w-fit">
            <CalendarHeart /> Simpan Tanggal
          </Button>
        </div>

        {/* Event Info */}
        <div className="text-center mb-10">
          <p className="font-medium">{toLocaleDate(core.eventDate)}</p>
          {core.location && <p>{core.location}</p>}
        </div>

        <div className="space-y-4">
          {data.events.map((event, idx) => (
            <div key={idx}>
              <h2>{event.name}</h2>
              <p>{event.date}</p>
              <p>{event.time}</p>
              <p>{event.venueName}</p>
            </div>
          ))}
        </div>

        {/* Gallery */}
        {data.photos && data.photos.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {data.photos.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Gallery ${idx + 1}`}
                className="rounded-lg w-full object-cover"
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
