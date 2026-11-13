import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "remixicon/fonts/remixicon.css";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Limaware · Links",
  description:
    "Sites, apps e sistemas sob medida. Peça um orçamento, conheça a Limaware ou entre no grupo de ofertas.",
  openGraph: {
    title: "Limaware · Links",
    description: "Sites, apps e sistemas sob medida — do orçamento ao lançamento.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  // Espelha --color-bg (app/styles/tokens.css): metadata não lê variáveis CSS.
  themeColor: "#0b1a24",
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
