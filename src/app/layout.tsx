import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const glacial = localFont({
  src: [
    {
      path: "./fonts/GlacialIndifference-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/GlacialIndifference-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-glacial",
});

export const metadata: Metadata = {
  title: "DreamSpace Realties | Premium Gated Plotted Communities Jamshedpur",
  description:
    "Explore verified premium residential villa plots and gated layout communities for sale in Jamshedpur. Premium layouts with clear titles and standard infrastructure in Pardih, Dimna, Mango, Sakchi, and Bistupur.",
  keywords: ["plots for sale Jamshedpur", "residential plots Dimna", "Mango gated community plots", "plots in Jamshedpur", "Bistupur real estate", "Pardih plotting layout", "real estate developer Jamshedpur"],
  openGraph: {
    title: "DreamSpace Realties | Premium Gated Plotted Communities Jamshedpur",
    description: "Verified premium villa plots and gated layout developments in Jamshedpur's growth corridors.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${glacial.variable} font-sans antialiased bg-[#faf9f6] text-slate-800`}
      >
        {children}
      </body>
    </html>
  );
}
