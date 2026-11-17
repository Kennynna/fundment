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
  title: "Фаворит-групп — фундаменты под ключ в Московской области",
  description:
    "Фундаменты под ключ и дренаж для частных домов в Московской области. 17 лет на рынке, более 32 реализованных объектов. От планировки участка до сдачи объекта.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" data-type="service" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
