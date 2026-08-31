import Link from "next/link";
import { Camera, MessageCircle, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0A]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-3">
          <p className="font-serif text-2xl text-[#F5F5F5]">kisahdetik.id</p>
          <p className="max-w-sm text-sm leading-7 text-[#F5F5F5]/70">
            Abadikan Setiap Detik, Jadikan Kisah.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm uppercase tracking-[0.25em] text-[#C9A227]">
            Navigasi
          </h3>
          <ul className="space-y-2 text-sm text-[#F5F5F5]/70">
            <li>
              <Link href="#about" className="transition hover:text-[#C9A227]">
                About
              </Link>
            </li>
            <li>
              <Link
                href="#services"
                className="transition hover:text-[#C9A227]"
              >
                Layanan
              </Link>
            </li>
            <li>
              <Link href="#gallery" className="transition hover:text-[#C9A227]">
                Album
              </Link>
            </li>
            <li>
              <Link href="#contact" className="transition hover:text-[#C9A227]">
                Kontak
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm uppercase tracking-[0.25em] text-[#C9A227]">
            Sosial
          </h3>
          <div className="flex gap-3">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-white/10 p-3 text-[#F5F5F5] transition hover:border-[#C9A227] hover:text-[#C9A227]"
            >
              <Camera size={18} />
            </Link>
            <Link
              href="https://www.tiktok.com"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="rounded-full border border-white/10 p-3 text-[#F5F5F5] transition hover:border-[#C9A227] hover:text-[#C9A227]"
            >
              <Send size={18} />
            </Link>
            <Link
              href="mailto:hello@kisahdetik.id"
              aria-label="Email"
              className="rounded-full border border-white/10 p-3 text-[#F5F5F5] transition hover:border-[#C9A227] hover:text-[#C9A227]"
            >
              <MessageCircle size={18} />
            </Link>
          </div>
          <p className="text-sm text-[#F5F5F5]/70">hello@kisahdetik.id</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-6 text-center text-sm text-[#F5F5F5]/50">
        © 2026 kisahdetik.id. All rights reserved.
      </div>
    </footer>
  );
}
