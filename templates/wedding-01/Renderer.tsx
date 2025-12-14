"use client";

import { CoreInvitationData } from "@/domain/invitation/types";
import { WeddingTemplateData } from "./types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  CalendarHeart,
  MapPin,
  Clock,
  Copy,
  Heart,
  Music,
  Quote,
  HeartHandshake,
  CalendarDays,
} from "lucide-react";
import { toLocaleDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

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
  // Dummy Love Story Data (Since not in schema yet based on previous file read, we keep it static or use data if available)
  // Assuming for now we stick to the provided schema, so we keep the Love Story static or hide it if no data.
  // The user asked to "ubah placeholder ... dengan shadcn componen".
  // I will make the Love Story section use Accordion with the static text matching the original placeholder but styled.

  const loveStories = [
    {
      title: "Pertemuan",
      content:
        "Kami bertemu pertama kali di sebuah acara kampus. Tatapan pertama yang tak sengaja, menjadi awal dari segalanya.",
    },
    {
      title: "Pendekatan",
      content:
        "Melalui teman dekat, kami mulai saling mengenal. Berbagi cerita, tawa, dan mimpi-mimpi kecil bersama.",
    },
    {
      title: "Lamaran",
      content:
        "Di bawah langit senja, sebuah janji terucap untuk melangkah ke jenjang yang lebih serius bersama selamanya.",
    },
    {
      title: "Pernikahan",
      content:
        "Hari ini, kami menyatukan dua hati dalam ikatan suci pernikahan, memohon doa restu untuk perjalanan panjang kami.",
    },
  ];

  return (
    <main className="flex flex-col md:flex-row min-h-screen w-full bg-slate-50 font-sans text-slate-900">
      {/* LEFT SIDE (Desktop Only) */}
      <section className="fixed top-0 w-full h-screen z-0 md:sticky md:top-0 md:flex md:w-2/3 md:h-screen md:overflow-hidden md:z-auto border-r">
        {/* Background Image */}
        {core.coverImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={core.coverImage}
              alt={core.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center p-8">
          <div className="max-w-md w-full space-y-8 animate-in fade-in duration-1000">
            <Badge
              variant="outline"
              className="text-lg px-4 py-1 uppercase tracking-widest border-white text-white"
            >
              Undangan Pernikahan
            </Badge>

            <div className="space-y-2">
              <h1 className="text-5xl font-serif text-white">
                {data.groomName}
              </h1>
              <span className="text-3xl font-serif text-white/80">&</span>
              <h1 className="text-5xl font-serif text-white">
                {data.brideName}
              </h1>
            </div>

            {guestName && (
              <div className="mt-8 p-6 bg-muted rounded-xl shadow-sm">
                <p className="text-sm text-slate-500 mb-2 uppercase tracking-wide">
                  Kepada Yth. Bapak/Ibu/Saudara/i
                </p>
                <div className="text-2xl font-semibold text-slate-800 wrap-break-word">
                  {guestName}
                </div>
                <p className="text-xs text-slate-400 mt-2 italic">
                  *Mohon maaf apabila ada kesalahan penulisan nama/gelar
                </p>
              </div>
            )}
            <Link href={"#content"}>
              <Button className="md:hidden">Buka Undangan</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* RIGHT SIDE (Mobile / Scrollable Content) */}
      <section
        id="content"
        className="mt-[800px] md:mt-0 relative z-30 w-full md:w-2/3 min-h-screen bg-white"
      >
        {/* HERO SECTION (Mobile) - Simplified version of Left Side */}
        <div className="flex flex-col justify-center items-center min-h-screen p-6 text-center bg-slate-50 relative ">
          <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="mt-20 z-10 w-full space-y-6">
            <span className="mb-4 font-serif">The Wedding Of</span>
            <div className="font-serif text-5xl text-slate-800 space-y-2">
              <div>{data.groomName}</div>
              <div className="text-xl text-slate-800">&</div>
              <div>{data.brideName}</div>
            </div>

            <p>{toLocaleDate(core.eventDate)}</p>
          </div>
        </div>

        {/* MAIN CONTENT CONTAINER */}
        <div className="flex flex-col gap-10 p-6 md:p-10 pb-20">
          {/* COUNTDOWN SECTION */}
          <div className="space-y-6 text-center">
            <h2 className="text-sm uppercase tracking-widest text-slate-500">
              Menuju Hari Bahagia
            </h2>
            <div className="text-lg font-medium text-slate-700">
              {toLocaleDate(core.eventDate)}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Hari", value: "51" },
                { label: "Jam", value: "20" },
                { label: "Menit", value: "03" },
                { label: "Detik", value: "45" },
              ].map((item, i) => (
                <Card key={i} className="border-slate-200 shadow-sm">
                  <CardContent className="p-3 flex flex-col items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold text-slate-800">
                      {item.value}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500">
                      {item.label}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              className="w-full rounded-full gap-2 transition-all hover:scale-105"
              size="lg"
            >
              <CalendarHeart className="w-4 h-4" /> Simpan Tanggal
            </Button>
          </div>

          <Separator />

          {/* QUOTES SECTION */}
          <div className="text-center space-y-6 py-6">
            <Quote className="w-8 h-8 text-slate-300 mx-auto" />
            <blockquote className="italic text-slate-600 font-serif text-lg leading-relaxed">
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
              pasangan-pasangan untukmu dari jenismu sendiri, agar kamu
              cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di
              antaramu rasa kasih dan sayang."
            </blockquote>
            <p className="font-semibold text-slate-800 text-sm tracking-widest uppercase">
              (Ar-Rum: 21)
            </p>
          </div>

          <Separator />

          {/* COUPLE DETAILS */}
          <div className="space-y-8">
            <h2 className="text-center text-2xl font-serif text-slate-800">
              Mempelai
            </h2>

            <Card className="overflow-hidden border-none shadow-md">
              <div className="h-2 bg-slate-800 w-full" />
              <CardHeader className="text-center pb-2">
                <CardTitle className="font-serif text-2xl">
                  {data.groomName}
                </CardTitle>
                <CardDescription>
                  Putra dari Bpk. Fulan & Ibu Fulanah
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <p className="text-sm text-slate-500 italic">
                  "Mencintai bukan berarti saling memandang, tetapi memandang ke
                  arah yang sama."
                </p>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center w-full">
              <Heart className="w-8 h-8 text-rose-400 fill-rose-100 animate-pulse" />
            </div>

            <Card className="overflow-hidden border-none shadow-md">
              <div className="h-2 bg-rose-400 w-full" />
              <CardHeader className="text-center pb-2">
                <CardTitle className="font-serif text-2xl">
                  {data.brideName}
                </CardTitle>
                <CardDescription>
                  Putri dari Bpk. Fulan & Ibu Fulanah
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <p className="text-sm text-slate-500 italic">
                  "Pernikahan adalah ibadah terpanjang dan terindah seumur
                  hidup."
                </p>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* EVENTS */}
          <div className="space-y-6">
            <h2 className="text-center text-2xl font-serif text-slate-800">
              Rangkaian Acara
            </h2>

            {data.events.map((event, idx) => (
              <Card
                key={idx}
                className="overflow-hidden group hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                  <CardTitle className="text-xl text-center md:text-left text-slate-800">
                    {event.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-slate-100 rounded-full text-slate-600">
                      <CalendarDays className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Tanggal</p>
                      <p className="text-slate-600">
                        {toLocaleDate(event.date || core.eventDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-slate-100 rounded-full text-slate-600">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Waktu</p>
                      <p className="text-slate-600">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-slate-100 rounded-full text-slate-600">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Lokasi</p>
                      <p className="text-slate-600">
                        {event.venueName || "Lokasi belum ditentukan"}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50/50 p-4 pt-0">
                  <Button
                    variant="outline"
                    className="w-full gap-2 mt-4 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    <MapPin className="w-4 h-4" /> Buka Google Maps
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Separator />

          {/* GALLERY */}
          {data.photos && data.photos.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-center text-2xl font-serif text-slate-800">
                Galeri Kami
              </h2>
              <Carousel className="w-full max-w-xs mx-auto">
                <CarouselContent>
                  {data.photos.map((src, idx) => (
                    <CarouselItem key={idx}>
                      <div className="p-1">
                        <Card className="border-0 shadow-none">
                          <CardContent className="flex aspect-square items-center justify-center p-0 rounded-xl overflow-hidden">
                            <img
                              src={src}
                              alt={`Gallery ${idx}`}
                              className="object-cover w-full h-full"
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>
          )}

          {/* LOVE STORY */}
          <div className="space-y-6">
            <h2 className="text-center text-2xl font-serif text-slate-800">
              Kisah Cinta
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {loveStories.map((story, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-slate-800 hover:text-rose-500 hover:no-underline px-2">
                    {story.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 italic px-4 pb-4">
                    {story.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <Separator />

          {/* GIFT SECTION */}
          <div className="text-center space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-serif text-slate-800">
                Tanda Kasih
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
                Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat
                memberi kado secara cashless.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { bank: "BCA", acc: "1234567890", name: data.groomName },
                { bank: "MANDIRI", acc: "0987654321", name: data.brideName },
              ].map((item, idx) => (
                <Card
                  key={idx}
                  className="relative overflow-hidden border-slate-200"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-slate-800"></div>
                  <CardContent className="p-6 flex flex-col items-center gap-2">
                    <h3 className="font-bold text-lg text-slate-800">
                      {item.bank}
                    </h3>
                    <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg">
                      <code className="text-lg font-mono text-slate-700">
                        {item.acc}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-white hover:shadow-sm"
                        onClick={() => navigator.clipboard.writeText(item.acc)}
                      >
                        <Copy className="w-4 h-4 text-slate-500" />
                      </Button>
                    </div>
                    <p className="text-sm text-slate-500">a.n {item.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* RSVP FORM */}
          <div className="space-y-6">
            <h2 className="text-center text-2xl font-serif text-slate-800">
              Konfirmasi Kehadiran
            </h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input id="name" placeholder="Masukkan nama anda" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor WhatsApp</Label>
                  <Input id="phone" type="tel" placeholder="08xxxxxxxxxx" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests">Jumlah Tamu</Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="5"
                    placeholder="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Konfirmasi</Label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 hover:bg-slate-100 hover:text-slate-900 border-slate-200"
                    >
                      Hadir
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 hover:bg-slate-100 hover:text-slate-900 border-slate-200"
                    >
                      Maaf, Tidak Bisa
                    </Button>
                  </div>
                </div>
                <Button className="w-full mt-2">Kirim Konfirmasi</Button>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* WISHES FORM */}
          <div className="space-y-6">
            <h2 className="text-center text-2xl font-serif text-slate-800">
              Kirim Ucapan
            </h2>
            <Card>
              <CardContent className="p-6 space-y-4 form-group">
                <div className="space-y-2">
                  <Label htmlFor="wish-name">Nama</Label>
                  <Input id="wish-name" placeholder="Nama anda" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wish-message">Ucapan & Doa</Label>
                  <Textarea
                    id="wish-message"
                    placeholder="Tuliskan ucapan dan doa restu..."
                    className="min-h-[100px]"
                  />
                </div>
                <Button className="w-full">
                  <HeartHandshake className="w-4 h-4 mr-2" /> Kirim Ucapan
                </Button>
              </CardContent>
            </Card>

            {/* List of Wishes (Dummy) */}
            <div className="space-y-4 mt-8 h-64 overflow-y-auto pr-2 custom-scrollbar">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="bg-slate-50 p-4 rounded-xl border border-slate-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-slate-800">
                      Teman SD
                    </span>
                    <span className="text-[10px] text-slate-400">
                      2 jam yang lalu
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    "Selamat menempuh hidup baru! Semoga menjadi keluarga yang
                    sakinah, mawaddah, warahmah."
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* FOOTER */}
          <footer className="text-center space-y-2 py-8">
            <p className="text-xl font-serif text-slate-800">
              {data.groomName} & {data.brideName}
            </p>
            <div className="text-xs text-slate-400">
              <p>Copyright © 2025 Wedding Template</p>
              <p className="mt-1">Dibuat dengan penuh ❤️</p>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
