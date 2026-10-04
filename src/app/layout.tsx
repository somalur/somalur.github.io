import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Sumeet Omalur | Software Engineer",
  description:
    "Full-stack engineer focused on Web Development using PHP, Laravel and AWS, Machine Learning Algorithms with experience in onboarding automation, e-commerce experimentation, CI/CD, and reliable releases.",
  icons: {
    icon: "/code.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={body.variable}>
      <body>{children}</body>
    </html>
  );
}
