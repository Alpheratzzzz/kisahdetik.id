import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "kisahdetik.id | Wedding & Event Content Creator Palembang",
  description:
    "Jasa fotografi dan konten kreator profesional untuk wedding, event, dan graduation di Palembang, Banyuasin, dan Muba.",
  openGraph: {
    title: "kisahdetik.id | Wedding & Event Content Creator Palembang",
    description:
      "Jasa fotografi dan konten kreator profesional untuk wedding, event, dan graduation di Palembang, Banyuasin, dan Muba.",
    type: "website",
    images: ["/placeholder.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0A0A0A] text-[#F5F5F5]">{children}</body>
    </html>
  );
}
