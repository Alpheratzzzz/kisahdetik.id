import Image from "next/image";
import { MapPin } from "lucide-react";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-[#C9A227]">About</p>
          <h2 className="font-serif text-3xl leading-tight text-[#F5F5F5] sm:text-4xl">
            Dari Palembang Hingga Muba: Kami Mengubah Momen Menjadi Kenangan Abadi.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-[#F5F5F5]/75">
            kisahdetik.id hadir sebagai pasangan visual untuk momen besar Anda. Dari wedding yang penuh emosi, acara spesial, hingga graduation yang penuh pencapaian, kami mengeksekusi setiap adegan dengan sentuhan cinematic dan kejelian storytelling.
          </p>
          <div className="flex flex-wrap gap-3">
            {['Palembang', 'Banyuasin', 'Muba'].map((location) => (
              <span key={location} className="flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-[#161616] px-3 py-2 text-sm text-[#F5F5F5]">
                <MapPin size={14} className="text-[#C9A227]" />
                {location}
              </span>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-4xl border border-[#C9A227]/30" />
          <Image
            src="/placeholder.svg"
            alt="Fotografi sinematik kisahdetik"
            width={900}
            height={1200}
            className="h-full w-full rounded-4xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
