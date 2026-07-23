"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Layanan" },
  { href: "#gallery", label: "Portofolio" },
  { href: "#contact", label: "Kontak" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0A0A0A]/95 shadow-lg shadow-black/20" : "bg-transparent"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="#top" className="font-serif text-xl font-semibold tracking-wide text-[#F5F5F5]">
          kisahdetik.id
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-[#F5F5F5]/80 transition hover:text-[#C9A227]">
              {item.label}
            </Link>
          ))}
          <Button asChild className="rounded-full px-4 py-2">
            <Link href="#contact">Booking</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <Button asChild size="icon" variant="ghost" className="rounded-full p-2">
            <Link href="#contact">Book</Link>
          </Button>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-full border border-white/10 p-2 text-[#F5F5F5]"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#0A0A0A] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-[#F5F5F5]/80" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
