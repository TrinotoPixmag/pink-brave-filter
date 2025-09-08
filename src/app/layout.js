import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pink Brave Filter – Efek Warna Pink Soft",
  description: "Coba Pink Brave Filter untuk memberikan efek warna pink soft yang elegan dan modern pada foto Anda",
  keywords: ["pink brave filter", "filter foto pink", "pink soft effect", "edit foto pink", "filter warna elegan"],
  openGraph: {
    title: "Pink Brave Filter – Efek Warna Pink Soft",
    description: "Gunakan Pink Brave Filter untuk mengubah foto dengan nuansa pink soft yang lebih elegan",
    url: "https://pink-brave-filter.vercel.app",
    images: [
      {
        url: "https://pink-brave-filter.vercel.app/pink-brave.jpg",
        width: 1200,
        height: 630,
        alt: "Contoh hasil foto dengan Pink Brave Filter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pink Brave Filter – Efek Warna Pink Soft",
    description: "Filter Pink Brave untuk hasil foto lebih elegan dengan nuansa pink soft",
    images: ["https://pink-brave-filter.vercel.app/pink-brave.jpg"],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
