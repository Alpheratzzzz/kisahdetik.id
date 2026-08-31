"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/lib/api";

type TestimonialItem = {
  name?: string;
  image?: string;
  event?: string;
  quote?: string;
};

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);

  useEffect(() => {
    api
      .get("/public/testimonials")
      .then((res) => setTestimonials(res.data))
      .catch(() => setTestimonials([]));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mb-8 max-w-2xl sm:mb-10">
        <p className="text-xs uppercase tracking-[0.35em] text-[#C9A227] sm:text-sm">
          Testimoni
        </p>
        <h2 className="mt-3 font-serif text-2xl leading-tight text-[#F5F5F5] sm:text-3xl lg:text-4xl">
          Apa Kata Mereka yang Telah Mempercayai Kami.
        </h2>
      </div>
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item) => (
          <Card key={item.name} className="border-[#C9A227]/20 p-2 sm:p-3">
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name || "Testimonial author"}
                  width={56}
                  height={56}
                  className="h-12 w-12 rounded-full object-cover sm:h-14 sm:w-14"
                />
                <div>
                  <h3 className="font-serif text-base text-[#F5F5F5] sm:text-lg">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#F5F5F5]/70">{item.event}</p>
                </div>
              </div>
              <p className="font-serif text-base italic leading-7 text-[#F5F5F5]/85 sm:text-lg sm:leading-8">
                “{item.quote}”
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
