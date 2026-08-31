"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import api from "@/lib/api";

const filters = ["All", "Wedding", "Event", "Grad"] as const;

type GalleryItem = {
  title?: string;
  category?: string;
  image?: string;
  video?: string;
};

const apiOrigin = (
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"
).replace(/\/api$/, "");

function getVideoMimeType(videoUrl: string | undefined) {
  if (!videoUrl) return undefined;
  const ext = videoUrl.split(".").pop()?.split("?")[0]?.toLowerCase();
  if (ext === "mp4") return "video/mp4";
  if (ext === "webm") return "video/webm";
  if (ext === "ogg") return "video/ogg";
  return undefined;
}

function getMediaUrl(url?: string) {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/storage/")) return `${apiOrigin}${url}`;
  return url;
}

type Filter = (typeof filters)[number];

export function Gallery() {
  const [active, setActive] = useState<Filter>("All");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    api
      .get("/public/gallery-items")
      .then((res) => setGalleryItems(res.data))
      .catch(() => setGalleryItems([]));
  }, []);

  const visibleItems = useMemo(() => {
    if (active === "All") return galleryItems;
    const category = active === "Grad" ? "Grad" : active;
    return galleryItems.filter((item) => item.category === category);
  }, [active, galleryItems]);

  return (
    <section
      id="gallery"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[#C9A227] sm:text-sm">
            Album
          </p>
          <h2 className="mt-3 font-serif text-2xl leading-tight text-[#F5F5F5] sm:text-3xl lg:text-4xl">
            Jelajahi Kisah yang Telah Kami Abadikan.
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {filters.map((filter) => {
            const isActive = active === filter;
            return (
              <button
                key={filter}
                onClick={() => setActive(filter)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm transition sm:h-12 sm:w-12 ${isActive ? "border-[#C9A227] bg-[#C9A227]/10 text-[#C9A227] ring-2 ring-[#C9A227]/20" : "border-white/10 text-[#F5F5F5]/70"}`}
                aria-label={`Filter ${filter}`}
              >
                {filter === "All" ? "All" : filter[0]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item, index) => (
          <Card
            key={`${item.title}-${index}`}
            className="group overflow-hidden border-white/10"
          >
            <div className="overflow-hidden">
              {item.video ? (
                <video
                  controls
                  playsInline
                  className="w-full aspect-[9/16] object-cover"
                  poster={getMediaUrl(item.image) || "/placeholder.svg"}
                >
                  <source
                    src={getMediaUrl(item.video)}
                    type={getVideoMimeType(item.video) || "video/mp4"}
                  />
                </video>
              ) : (
                <Image
                  src={getMediaUrl(item.image) || "/placeholder.svg"}
                  alt={item.title || "Gallery item"}
                  width={800}
                  height={1200}
                  unoptimized
                  className="w-full aspect-[9/16] object-cover transition duration-500 group-hover:scale-105"
                />
              )}
            </div>
            <div className="p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-[#C9A227]">
                {item.category}
              </p>
              <h3 className="mt-1 font-serif text-base text-[#F5F5F5] sm:text-lg">
                {item.title}
              </h3>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="https://www.instagram.com/kisahdetik.id?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-[#C9A227] px-5 py-2.5 text-sm text-[#F5F5F5] transition hover:bg-[#C9A227]/10 sm:px-6 sm:py-3"
        >
          Cek Lebih Banyak di Instagram Kami
        </Link>
      </div>
    </section>
  );
}
