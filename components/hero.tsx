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
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
      </video>
      <Image
        src="/placeholder.svg"
        alt="Latar belakang cinematic kisahdetik"
        fill
        priority
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.1)_0%,rgba(10,10,10,0.8)_100%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-[#C9A227]">Wedding • Event • Graduation Content Creator</p>
          <h1 className="font-serif text-4xl leading-tight text-[#F5F5F5] sm:text-5xl lg:text-7xl">
            Setiap Detik Berharga, Setiap Momen Memiliki Kisah.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[#F5F5F5]/85 sm:text-xl">
            Jasa Fotografi & Konten Kreator Profesional untuk Wedding, Event, dan Kelulusan di Palembang, Banyuasin & Muba.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full px-6 py-3 text-base">
              <Link href="#contact">Konsultasi Gratis & Cek Ketersediaan</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6 py-3 text-base">
              <Link href="#gallery">Lihat Portofolio</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-3 pt-3 text-sm text-[#F5F5F5]/80">
            {['Palembang', 'Banyuasin', 'Muba'].map((location) => (
              <span key={location} className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">
                <MapPin size={14} className="text-[#C9A227]" />
                {location}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <Link href="#about" aria-label="Scroll ke section berikutnya" className="animate-bounce rounded-full border border-white/20 p-3 text-[#C9A227]">
            <ChevronDown size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
