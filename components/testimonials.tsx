import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[#C9A227]">Testimoni</p>
        <h2 className="mt-3 font-serif text-3xl text-[#F5F5F5] sm:text-4xl">
          Apa Kata Mereka yang Telah Mempercayai Kami.
        </h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((item) => (
          <Card key={item.name} className="border-[#C9A227]/20 p-2">
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Image src={item.image} alt={item.name} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <h3 className="font-serif text-lg text-[#F5F5F5]">{item.name}</h3>
                  <p className="text-sm text-[#F5F5F5]/70">{item.event}</p>
                </div>
              </div>
              <p className="font-serif text-lg italic leading-8 text-[#F5F5F5]/85">“{item.quote}”</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
