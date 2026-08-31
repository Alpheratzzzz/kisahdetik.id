import Link from "next/link";
import { ChevronDown, MapPin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-screen overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video/hero.mp4" type="video/mp4" />{" "}
      </video>
      <Image
        src="/placeholder.svg"
        alt="Latar belakang cinematic kisahdetik"
        fill
        priority
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.85)_0%,rgba(10,10,10,0.55)_45%,rgba(10,10,10,0.85)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.25),transparent_40%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex w-fit items-center rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-3 py-2 text-[11px] uppercase tracking-[0.35em] text-[#F6D36A] sm:text-xs">
            Wedding • Event • Graduation Content Creator
          </div>
          <h1 className="max-w-3xl font-serif text-4xl leading-[1.05] text-[#F5F5F5] sm:text-5xl lg:text-7xl">
            Setiap Detik Berharga, Setiap Momen Memiliki Kisah.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[#F5F5F5]/85 sm:text-lg lg:text-xl">
            Jasa Konten Kreator Profesional untuk Wedding, Event, dan Kelulusan
            di Palembang, Banyuasin & Muba.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="rounded-full px-6 py-3 text-base shadow-[0_0_30px_rgba(201,162,39,0.2)]"
            >
              <Link href="#contact">Konsultasi Gratis & Cek Ketersediaan</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/20 px-6 py-3 text-base backdrop-blur-sm"
            >
              <Link href="#gallery">Lihat Album</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-3 pt-3 text-sm text-[#F5F5F5]/80">
            {["Palembang", "Banyuasin", "Muba"].map((location) => (
              <span
                key={location}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm"
              >
                <MapPin size={14} className="text-[#C9A227]" />
                {location}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <Link
            href="#about"
            aria-label="Scroll ke section berikutnya"
            className="animate-bounce rounded-full border border-white/20 bg-white/5 p-3 text-[#C9A227] backdrop-blur-sm"
          >
            <ChevronDown size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
