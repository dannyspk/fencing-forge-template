import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Providers } from "@/components/Providers";
import "@/index.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FenceCo — Precision-Built Boundaries",
  description:
    "Custom fencing solutions engineered for durability, security, and architectural harmony.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
