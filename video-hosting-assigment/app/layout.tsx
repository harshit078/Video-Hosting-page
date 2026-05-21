import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const title = "Video Hosting — Stream, Manage, Deliver";
const description =
  "Reliable, scalable video hosting for modern teams. Upload, transcode, and stream video with a single platform.";

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
    siteName: "Streamly",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", inter.variable)}
    >
      <body className="relative">{children}</body>
    </html>
  );
}
