"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/lib/api";

type ServiceItem = {
  slug?: string;
  id?: number | string;
  title?: string;
  content?: string;
  image?: string;
  video?: string;
};

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
  return `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "") || "http://127.0.0.1:8000"}${url}`;
}

export function Services() {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    api
      .get("/public/posts")
      .then((res) => setServices(res.data))
      .catch(() => setServices([]));
  }, []);

  return (
    <section
      id="services"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mb-8 max-w-2xl sm:mb-10">
        <p className="text-xs uppercase tracking-[0.35em] text-[#C9A227] sm:text-sm">
          Layanan
        </p>
        <h2 className="mt-3 font-serif text-2xl leading-tight text-[#F5F5F5] sm:text-3xl lg:text-4xl">
          Visual yang Menyentuh dan Mengabadikan Makna.
        </h2>
      </div>
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <Card
            key={service.slug || service.id}
            className="group overflow-hidden border-[#C9A227]/20 transition duration-300 hover:-translate-y-1 hover:border-[#C9A227]"
          >
            <div className="overflow-hidden bg-[#111]">
              {service.video ? (
                <video
                  controls
                  playsInline
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                  poster={getMediaUrl(service.image) || "/placeholder.svg"}
                >
                  <source
                    src={getMediaUrl(service.video)}
                    type={getVideoMimeType(service.video) || "video/mp4"}
                  />
                </video>
              ) : (
                <Image
                  src={getMediaUrl(service.image) || "/placeholder.svg"}
                  alt={service.title || "Service image"}
                  width={800}
                  height={600}
                  loading="lazy"
                  unoptimized
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                  onError={(event) => {
                    const target = event.currentTarget as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              )}
            </div>
            <CardContent className="space-y-3">
              <h3 className="font-serif text-lg text-[#C9A227] sm:text-xl">
                {service.title}
              </h3>
              <p className="text-sm leading-7 text-[#F5F5F5]/75 sm:text-[15px]">
                {service.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
