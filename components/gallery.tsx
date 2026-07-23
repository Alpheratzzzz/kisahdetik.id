"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { galleryItems } from "@/lib/data";

const filters = ["All", "Wedding", "Event", "Grad"] as const;

type Filter = (typeof filters)[number];

export function Gallery() {
  const [active, setActive] = useState<Filter>("All");

  const visibleItems = useMemo(() => {
    if (active === "All") return galleryItems;
    const category = active === "Grad" ? "Grad" : active;
    return galleryItems.filter((item) => item.category === category);
  }, [active]);

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-[#C9A227]">Portofolio</p>
          <h2 className="mt-3 font-serif text-3xl text-[#F5F5F5] sm:text-4xl">
            Jelajahi Kisah yang Telah Kami Abadikan.
          </h2>
        </div>
        <div className="flex gap-3">
          {filters.map((filter) => {
            const isActive = active === filter;
            return (
              <button
                key={filter}
                onClick={() => setActive(filter)}
                className={`h-12 w-12 rounded-full border text-sm transition ${isActive ? "border-[#C9A227] ring-2 ring-[#C9A227]/20" : "border-white/10 text-[#F5F5F5]/70"}`}
                aria-label={`Filter ${filter}`}
              >
                {filter === "All" ? "All" : filter[0]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visibleItems.map((item, index) => (
          <Card key={`${item.title}-${index}`} className="group overflow-hidden border-white/10">
            <div className="overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                width={900}
                height={900}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-[#C9A227]">{item.category}</p>
              <h3 className="mt-1 font-serif text-lg text-[#F5F5F5]">{item.title}</h3>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="https://instagram.com" target="_blank" rel="noreferrer" className="rounded-full border border-[#C9A227] px-6 py-3 text-sm text-[#F5F5F5] transition hover:bg-[#C9A227]/10">
          Cek Lebih Banyak di Instagram Kami
        </Link>
      </div>
    </section>
  );
}
