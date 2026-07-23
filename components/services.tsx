import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/lib/data";

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[#C9A227]">Layanan</p>
        <h2 className="mt-3 font-serif text-3xl text-[#F5F5F5] sm:text-4xl">
          Visual yang Menyentuh dan Mengabadikan Makna.
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className="group overflow-hidden border-[#C9A227]/20 transition duration-300 hover:-translate-y-1 hover:border-[#C9A227]">
            <div className="overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                width={700}
                height={900}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <CardContent className="space-y-3">
              <h3 className="font-serif text-xl text-[#C9A227]">{service.title}</h3>
              <p className="text-sm leading-7 text-[#F5F5F5]/75">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
