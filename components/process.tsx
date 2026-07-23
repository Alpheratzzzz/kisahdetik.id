import { CalendarDays, Camera, PenTool, Send } from "lucide-react";

const steps = [
  { title: "Konsultasi & Penjadwalan", description: "Diskusi kebutuhan, gaya, dan timeline acara.", icon: CalendarDays },
  { title: "Pengambilan Konten", description: "Dokumentasi momen secara cinematic dan detail.", icon: Camera },
  { title: "Editing Profesional", description: "Pemrosesan visual, warna, dan storytelling yang rapi.", icon: PenTool },
  { title: "Pengiriman Hasil Akhir", description: "Hasil siap dibagikan, dipakai, dan disimpan.", icon: Send },
];

export function Process() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[#C9A227]">Proses</p>
        <h2 className="mt-3 font-serif text-3xl text-[#F5F5F5] sm:text-4xl">
          Dari pertama bertemu hingga hasil akhir, kami jaga setiap langkah.
        </h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="relative rounded-3xl border border-white/10 bg-[#161616] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A227]/30 bg-[#0A0A0A] text-[#C9A227]">
                <Icon size={20} />
              </div>
              <div className="mb-4 text-3xl font-semibold text-[#C9A227]">0{index + 1}</div>
              <h3 className="font-serif text-lg text-[#F5F5F5]">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#F5F5F5]/75">{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
