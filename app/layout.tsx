import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "./fonts/Manrope-Variable.ttf",
  variable: "--font-manrope",
  weight: "200 800",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Фаворит-групп — фундаменты и дренаж",
  description:
    "Плитные, свайные, ленточные и столбчатые фундаменты. Точечный, линейный и глубинный дренаж. Фаворит-групп.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" data-type="service" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
