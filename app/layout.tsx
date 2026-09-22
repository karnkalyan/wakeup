import type { Metadata } from "next";
import { Poppins, Roboto, Inter, Mukta } from "next/font/google";
import "./globals.css";
import { WhatsAppChat } from "@/components/site/WhatsAppChat";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const mukta = Mukta({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nepali",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "WakeUp Nepal Builders Pvt. Ltd. | विश्वास निर्माण, घर निर्माण", template: "%s | WakeUp Nepal Builders" },
  description: "Complete building construction, renovation, modern interior design, RCC structural works, MEP engineering, and verified construction materials supply in Kathmandu, Nepal. Contact: 9864033256 / 9851188296.",
  icons: { icon: "/logo/logo.png", apple: "/logo/logo.png" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto.variable} ${inter.variable} ${mukta.variable}`}>
      <body>
        {children}
        <WhatsAppChat />
      </body>
    </html>
  );
}

