import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const helvetica = localFont({
  src: [
    { path: "../fonts/HelveticaNeueThin.otf", weight: "100", style: "normal" },
    { path: "../fonts/HelveticaNeueLight.otf", weight: "300", style: "normal" },
    { path: "../fonts/HelveticaNeueRoman.otf", weight: "400", style: "normal" },
    { path: "../fonts/HelveticaNeueMedium.otf", weight: "500", style: "normal" },
    { path: "../fonts/HelveticaNeueBold.otf", weight: "700", style: "normal" },
    { path: "../fonts/HelveticaNeueHeavy.otf", weight: "800", style: "normal" },
    { path: "../fonts/HelveticaNeueBlack.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-helvetica",
  display: "swap",
});

const yapari = localFont({
  src: [
    { path: "../fonts/YapariTrial-Thin.ttf", weight: "100", style: "normal" },
    { path: "../fonts/YapariTrial-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../fonts/YapariTrial-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/YapariTrial-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/YapariTrial-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/YapariTrial-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/YapariTrial-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/YapariTrial-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../fonts/YapariTrial-Ultra.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-yapari",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Davaajargal Lodonjamts — Full Stack Developer",
  description:
    "Building digital experiences that people remember. Full stack developer portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${helvetica.variable} ${yapari.variable} antialiased`}
    >
      <body className="bg-[#050505] text-[#F5F5F5] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
