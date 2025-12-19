"use client";

import { CoreInvitationData } from "@/domain/invitation/types";
import { WeddingTemplateData } from "./types";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SlidingNumber } from "@/components/motion-primitives/sliding-number";
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
  CalendarHeart,
  MapPin,
  Copy,
  Heart,
  HeartHandshake,
  CalendarDays,
  HomeIcon,
  ImageIcon,
  MessageCircle,
  Instagram,
} from "lucide-react";
import {
  getDayName,
  getDayNumber,
  getMonthName,
  getYear,
  toLocaleDate,
} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

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
  const [showDock, setShowDock] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (data.photos && data.photos.length > 0) {
      setSelectedPhoto(data.photos[0]);
    }
  }, [data.photos]);

  useEffect(() => {
    const handleScroll = () => {
      // Show dock if scrolled down more than 200px
      if (window.scrollY > 200) {
        setShowDock(true);
      } else {
        setShowDock(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(core.eventDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [core.eventDate]);

  return (
    <main className="relative flex flex-col md:flex-row min-h-screen w-full bg-slate-50 font-sans text-slate-900">
      <Dock visible={showDock} />
      {/* Cover Section */}
      <section className="fixed top-0 w-full h-screen z-0 md:sticky md:top-0 md:flex md:w-1/2 md:h-screen md:overflow-hidden md:z-auto border-r">
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
            <div className="space-y-2">
              <p className="text-white text-md">
                Kami mengundang Anda ke Pernikahan
              </p>
              <h1 className="text-6xl font-bricolage text-white">
                {data.groomNickname} & {data.brideNickname}
              </h1>
            </div>

            {guestName && (
              <div className="mt-8 p-6 w-fit mx-auto  bg-black/20  rounded-xl shadow-sm">
                <p className="text-sm text-white mb-2  tracking-wide">
                  Kepada Yth. Bapak/Ibu/Saudara/i
                </p>
                <div className=" text-2xl  text-white wrap-break-word">
                  {guestName}
                </div>
                <p className="text-[10px] text-white mt-2 italic">
                  *Mohon maaf apabila ada kesalahan penulisan nama/gelar
                </p>
              </div>
            )}
            <Link href={"#content"}>
              <Button
                variant={"outline"}
                className="rounded-full md:hidden "
                size={"lg"}
              >
                Buka Undangan
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Scrollable Content */}
      <section
        id="content"
        className="mt-[800px] md:mt-0 md:w-1/2 relative z-30 w-full min-h-screen bg-white"
      >
        {/* Hero Section (Mobile) - Simplified version of Left Side */}
        <div className="flex flex-col justify-center items-center min-h-screen p-6 text-center bg-slate-50 relative ">
          <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="mt-20 z-10 space-y-6">
            <span className="mb-4 font-bricolage">We Are Getting Married</span>
            <div className="font-bricolage text-5xl text-slate-800 space-y-2">
              <div>
                {data.groomNickname} <span>&</span>
                {data.brideNickname}
              </div>
            </div>

            <div className="space-y-6 text-center">
              <div className="text-lg font-medium text-slate-700">
                {toLocaleDate(core.eventDate)}
              </div>

              {/* Countdown */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "Hari", value: timeLeft.days },
                  { label: "Jam", value: timeLeft.hours },
                  { label: "Menit", value: timeLeft.minutes },
                  { label: "Detik", value: timeLeft.seconds },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-3 flex flex-col items-center justify-center bg-muted"
                  >
                    <span className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center justify-center overflow-hidden">
                      <SlidingNumber value={item.value} padStart={true} />
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                className="w-full rounded-full gap-2 transition-all hover:scale-105"
                size="lg"
              >
                <CalendarHeart className="w-4 h-4" /> Simpan Tanggal
              </Button>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT CONTAINER */}
        <div className=" flex flex-col gap-10 p-6 md:p-10 pb-20">
          <div id="quotes" className="space-y-8 mt-24">
            <h2 className="text-center text-3xl  font-bricolage text-slate-800">
              Two souls interwined, <br /> a live that will bind
            </h2>
            <p className="text-center text-slate-800">
              They say that some souls are simply meant to find each other. Ours
              did, and with each shared moment, our connection has grown into a
              love that will forever bind us. We are so excited to celebrate
              this beautiful journey with you as we exchange our vows.
            </p>
          </div>

          {/* COUPLE DETAILS */}
          <div id="couple" className="space-y-8 mt-24">
            {/* <h2 className="text-center text-2xl font-bricolage text-slate-800">
              Mempelai
            </h2> */}
            <div className="flex flex-col items-center justify-center gap-4 ">
              <div className="overflow-hidden ">
                <div className="text-center gap-4 flex flex-col items-center">
                  <h2 className="font-bricolage text-5xl">
                    {data.groomNickname}
                  </h2>
                  {data.groomImage && (
                    <div className="mb-4 relative w-130 h-150 rounded overflow-hidden border-4  shadow-sm">
                      <Image
                        src={data.groomImage}
                        alt={data.groomNickname}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <p className="text-2xl font-bricolage mb-5">
                    {data.groomName}
                  </p>
                  <p>
                    Putra dari {data.groomParents?.father || "Bpk. Fulan"} &{" "}
                    {data.groomParents?.mother || "Ibu Fulanah"}
                  </p>
                  <Button>
                    <Instagram /> @{data.groomNickname}
                  </Button>
                </div>
              </div>

              <div className="overflow-hidden ">
                <div className="text-center gap-4 flex flex-col items-center">
                  <h2 className="font-bricolage text-5xl">
                    {data.brideNickname}
                  </h2>
                  {data.brideImage && (
                    <div className="mb-4 relative w-130 h-150 rounded overflow-hidden border-4 border-rose-100 shadow-sm">
                      <Image
                        src={data.brideImage}
                        alt={data.brideNickname}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <p className="text-2xl font-bricolage mb-5">
                    {data.brideName}
                  </p>
                  <p>
                    Putri dari {data.brideParents?.father || "Bpk. Fulan"} &{" "}
                    {data.brideParents?.mother || "Ibu Fulanah"}
                  </p>
                  <Button>
                    <Instagram /> @{data.brideNickname}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* EVENTS */}
          <div id="events" className="space-y-6 scroll-mt-24">
            <h2 className="text-center text-2xl font-bricolage text-slate-800">
              Rangkaian Acara
            </h2>
            <div className="flex flex-col gap-4">
              {data.events.map((event, idx) => (
                <Card key={idx} className="p-2  border rounded-3xl shadow-none">
                  <CardContent className="bg-muted rounded-2xl border w-full relative p-8  text-center space-y-6">
                    {/* Title */}
                    <CardTitle className="font- text-4xl font-script tracking-wide">
                      {event.name}
                    </CardTitle>

                    {/* Day name */}
                    <p className="text-xl font-medium">
                      {getDayName(event.date || core.eventDate[0])}
                    </p>

                    {/* Date section */}
                    <div className="flex items-center justify-center gap-6">
                      {/* Day number */}
                      <div className="text-5xl font-light">
                        {getDayNumber(event.date || core.eventDate[0])}
                      </div>

                      {/* Vertical divider */}
                      <div className="h-16 w-px bg-black" />

                      {/* Month & year */}
                      <div className="text-left leading-tight">
                        <p className="text-xl">
                          {getMonthName(event.date || core.eventDate[0])}
                        </p>
                        <p className="text-xl">
                          {getYear(event.date || core.eventDate[0])}
                        </p>
                      </div>
                    </div>

                    {/* Time */}
                    <p className="text-lg tracking-wide">{event.time}</p>
                  </CardContent>
                  <CardFooter className="text-left flex flex-col gap-2 pb-4">
                    {/* Venue */}
                    {event.venueName && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <p className="text-lg tracking-wide">
                          {event.venueName}
                        </p>
                      </div>
                    )}

                    {/* Venue Address */}
                    {event.venueAddress && (
                      <p className="text-lg tracking-wide">
                        {event.venueAddress}
                      </p>
                    )}
                    <Button className="w-full mt-4 rounded-full ">
                      Buka Google Maps
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* GALLERY */}
          {data.photos && data.photos.length > 0 && (
            <div id="gallery" className="space-y-6 scroll-mt-24">
              <h2 className="text-center text-2xl font-bricolage text-slate-800">
                Galeri Kami
              </h2>

              <div className="flex flex-col gap-4">
                {/* Main Selected Image */}
                <div className="relative w-full aspect-4/5 md:aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-100">
                  {selectedPhoto ? (
                    <Image
                      src={selectedPhoto}
                      alt="Selected gallery photo"
                      fill
                      className="object-cover transition-all duration-500 ease-in-out"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">
                      Pilih foto di bawah
                    </div>
                  )}
                </div>

                {/* Scrollable Thumbnail Strip */}
                <div className="w-full overflow-x-auto pb-4 pt-2 -mx-6 px-6 md:mx-0 md:px-0">
                  <div className="flex gap-3 w-max">
                    {data.photos.map((src, idx) => {
                      // Alternate ratios: even -> 16:9 (Wide), odd -> 9:16 (Tall)
                      // To make them look cool and align nicely, we can fix the height and let width adjust?
                      // The prompt specifically asked for ratio variations.
                      // Fixed height approach with aspect-ratio classes:
                      const isWide = idx % 2 === 0;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedPhoto(src)}
                          className={`relative group rounded-xl overflow-hidden transition-all duration-300 ${
                            selectedPhoto === src
                              ? "scale-95 shadow-md"
                              : "hover:scale-95 opacity-80 hover:opacity-100"
                          } ${
                            isWide
                              ? "w-48 aspect-video" // 16:9 equivalent
                              : "w-28 aspect-4/5" // 9:16 equivalent
                          }`}
                        >
                          <Image
                            src={src}
                            alt={`Thumbnail ${idx}`}
                            fill
                            className="object-cover"
                          />
                          {/* Overlay for unselected items */}
                          {selectedPhoto !== src && (
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Our Footage */}
          <div className="w-full space-y-6">
            <h2 className="text-center text-2xl font-bricolage text-slate-800">
              Our Footage
            </h2>

            <div className="w-full ">
              <HeroVideoDialog
                animationStyle="from-center"
                videoSrc="https://youtube.com/embed/_PxYkc0JWXs?si=0KrAYECzciQ95HS0"
                thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                thumbnailAlt="Dummy Video Thumbnail"
              />
            </div>
          </div>

          <Separator />

          {/* GIFT SECTION */}
          <div className="text-center space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bricolage text-slate-800">
                Wedding Gift
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Your prayers and presence are the best gift. However, if you
                want to give a gift weprovide a digital envelope to make it
                easier for you. Thank You
              </p>
            </div>

            <div className="space-y-4">
              {[
                { bank: "BCA", acc: "1234567890", name: data.groomNickname },
                {
                  bank: "MANDIRI",
                  acc: "0987654321",
                  name: data.brideNickname,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden border-slate-200"
                >
                  <div className="p-6 flex flex-col items-center gap-2">
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
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* RSVP FORM */}
          <div id="rsvp" className="space-y-6 scroll-mt-24">
            <h2 className="text-center text-2xl font-bricolage text-slate-800">
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
            <h2 className="text-center text-2xl font-bricolage text-slate-800">
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
            <p className="text-xl font-bricolage text-slate-800">
              {data.groomNickname} & {data.brideNickname}
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
const Dock = ({ visible }: { visible: boolean }) => {
  const items = [
    {
      icon: <HomeIcon className="w-5 h-5 text-white" />,
      label: "Home",
      href: "#",
    },
    {
      icon: <Heart className="w-5 h-5 text-white" />,
      label: "Mempelai",
      href: "#couple",
    },
    {
      icon: <CalendarDays className="w-5 h-5 text-white" />,
      label: "Acara",
      href: "#events",
    },
    {
      icon: <ImageIcon className="w-5 h-5 text-white" />,
      label: "Galeri",
      href: "#gallery",
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-white" />,
      label: "Ucapan",
      href: "#rsvp",
    },
  ];

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
      }`}
    >
      <div className="flex items-center gap-2 p-2 rounded-full bg-black backdrop-blur-lg border-3 border-white/20 shadow-2xl ring-1 ring-black/5">
        {items.map((item, idx) => (
          <Link key={idx} href={item.href}>
            <Button
              variant="default"
              size="icon"
              className="rounded-full w-12 h-12  hover:scale-110 transition-all duration-300 hover:shadow-md"
              title={item.label}
            >
              {item.icon}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};
