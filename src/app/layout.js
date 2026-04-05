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
  title: "Rozie Nails | Professional Nail Care by Rozie Gurung",
  description:
    "Professional nail care services including manicure, pedicure, and nail art by Rozie Gurung. Affordable, quality nail services from a cozy home studio.",
  keywords: "nails, manicure, pedicure, nail art, nail technician, Rozie Gurung, home salon",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
