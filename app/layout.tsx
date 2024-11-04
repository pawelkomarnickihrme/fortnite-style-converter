import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const fortniteFont = localFont({
  src: "../public/Bur.otf",
  variable: "--font-fortnite",
});
export const metadata: Metadata = {
  title: "Twoje zdjecie z Fortnite!",
  description: "Wygeneruj zdjecie w stylu Fortnite!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={fortniteFont.variable}>
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
