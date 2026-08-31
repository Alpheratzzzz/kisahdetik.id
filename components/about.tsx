"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-[#C9A227] sm:text-sm">
            About
          </p>
          <h2 className="font-serif text-2xl leading-tight text-[#F5F5F5] sm:text-3xl lg:text-4xl">
            Dari Palembang Hingga Muba: Kami Mengubah Momen Menjadi Kenangan
            Abadi.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-[#F5F5F5]/75 sm:text-[15px]">
            kisahdetik.id hadir sebagai pasangan visual untuk momen besar Anda.
            Dari wedding yang penuh emosi, acara spesial, hingga graduation yang
            penuh pencapaian, kami mengeksekusi setiap adegan dengan sentuhan
            cinematic dan kejelian storytelling.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Palembang", "Banyuasin", "Muba"].map((location) => (
              <span
                key={location}
                className="flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-[#161616] px-3 py-2 text-sm text-[#F5F5F5]"
              >
                <MapPin size={14} className="text-[#C9A227]" />
                {location}
              </span>
            ))}
          </div>
        </div>
        <div className="relative min-h-[420px]">
          <div className="absolute inset-0 rounded-[2rem] border border-[#C9A227]/30" />
          <div className="absolute -left-3 -top-3 h-20 w-20 rounded-full bg-[#C9A227]/20 blur-3xl" />
          <Image
            src="/about-us.png"
            alt="About kisahdetik"
            width={1200}
            height={1600}
            className="h-full w-full rounded-[2rem] object-cover shadow-[0_25px_80px_rgba(0,0,0,0.35)]"
            onError={(event) => {
              const target = event.currentTarget as HTMLImageElement;
              target.src = "/window.svg";
            }}
          />
        </div>
      </div>
    </section>
  );
}
