import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <Link
      href="https://wa.me/6288269352957"
      target="_blank"
      rel="noreferrer"
      aria-label="Hubungi WhatsApp kisahdetik"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A227] text-[#0A0A0A] shadow-lg shadow-[#C9A227]/20 transition hover:scale-105"
    >
      <MessageCircle size={24} />
    </Link>
  );
}
