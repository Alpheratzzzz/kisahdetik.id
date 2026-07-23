"use client";

import { FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const phone = "6288269352957";

export function Booking() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString() ?? "";
    const date = formData.get("date")?.toString() ?? "";
    const type = formData.get("eventType")?.toString() ?? "";
    const message = formData.get("message")?.toString() ?? "";
    const text = `Halo kisahdetik.id, saya ${name}. Tanggal acara: ${date}. Jenis acara: ${type}. Pesan: ${message}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-8 rounded-4xl border border-[#C9A227]/20 bg-[#161616] p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-[#C9A227]">Booking</p>
          <h2 className="font-serif text-3xl text-[#F5F5F5] sm:text-4xl">
            Siap Mengabadikan Momen Anda?
          </h2>
          <p className="max-w-xl text-base leading-8 text-[#F5F5F5]/75">
            Mari diskusikan konsep visual untuk acara Anda. Kami siap membantu dari tahap konsultasi hingga pengiriman hasil akhir.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full px-6 py-3">
              <Link href="https://wa.me/6288269352957" target="_blank" rel="noreferrer">WhatsApp</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6 py-3">
              <Link href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</Link>
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-[28px] border border-white/10 bg-[#0A0A0A] p-6">
          <Input name="name" placeholder="Nama" required />
          <Input name="date" type="date" required />
          <Select name="eventType" defaultValue="" required>
            <option value="" disabled>Jenis Acara</option>
            <option value="Wedding">Wedding</option>
            <option value="Event">Event</option>
            <option value="Graduation">Graduation</option>
          </Select>
          <Textarea name="message" placeholder="Pesan" required />
          <Button type="submit" className="w-full rounded-full">Kirim</Button>
        </form>
      </div>
    </section>
  );
}
