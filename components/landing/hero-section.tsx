import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="py-20">
      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 lg:px-0">
        <div className="relative text-center">
          <Logo className="mx-auto" />
          <h1 className="mx-auto mt-16 max-w-xl text-balance text-5xl font-medium">
            Solusi Digital Pernikahan Impian
          </h1>

          <p className="text-muted-foreground mx-auto mb-6 mt-4 text-balance text-xl">
            Solusi digital pernikahan impian dengan fitur-fitur yang lengkap.
          </p>

          <div className="flex flex-col items-center gap-2 *:w-full sm:flex-row sm:justify-center sm:*:w-auto">
            <Button asChild variant="default">
              <Link href="#link">
                <span className="text-nowrap">Buat Sekarang</span>
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="#link">
                <span className="text-nowrap">Lihat Demo</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const Logo = ({ className }: { className?: string }) => (
  <div
    aria-hidden
    className={cn(
      "border-background bg-linear-to-b rounded-lg relative flex size-9 translate-y-0.5 items-center justify-center border from-blue-300 to-blue-600 shadow-lg shadow-black/20 ring-1 ring-black/10",
      className
    )}
  >
    <Heart className="mask-b-from-25% size-6 fill-white stroke-white drop-shadow-sm" />
    <Heart className="absolute inset-0 m-auto size-6 fill-white stroke-white opacity-65 drop-shadow-sm" />
    <div className="z-1 h-4.5 absolute inset-2 m-auto w-px translate-y-px rounded-full bg-black/10"></div>
  </div>
);
