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
  metadataBase: new URL("https://kisahdetik.id"),
  title: "kisahdetik.id | Wedding & Event Content Creator Palembang",
  description:
    "Jasa konten kreator profesional untuk wedding, event, dan graduation di Palembang, Banyuasin, dan Muba.",
  keywords: [
    "content creator",
    "wedding",
    "event",
    "graduation",
    "visual content",
    "palembang",
  ],
  openGraph: {
    title: "kisahdetik.id | Wedding & Event Content Creator Palembang",
    description:
      "Jasa konten kreator profesional untuk wedding, event, dan graduation di Palembang, Banyuasin, dan Muba.",
    type: "website",
    locale: "id_ID",
    siteName: "kisahdetik.id",
    images: ["/placeholder.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "kisahdetik.id | Wedding & Event Content Creator Palembang",
    description:
      "Jasa konten kreator profesional untuk wedding, event, dan graduation di Palembang, Banyuasin, dan Muba.",
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
