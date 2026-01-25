import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ChatWidget from "@/features/chat/components/ChatWidget";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mejor Academia de MMA en Guadalajara - Blackbird House | Visita GRATIS",
  description: "Entrena Artes Marciales Mixtas en Guadalajara. Clases de Jiu-Jitsu, Muay Thai y Boxeo para todos los niveles. ¡Reserva tu visita gratuita hoy!",
  keywords: "MMA Guadalajara, Jiu Jitsu Guadalajara, Muay Thai Guadalajara, boxeo Guadalajara, artes marciales mixtas Guadalajara, entrenamiento MMA, Blackbird House",
  openGraph: {
    title: "Blackbird House - Academia de MMA en Guadalajara",
    description: "Domina el combate y transforma tu físico. Primera visita gratuita en la mejor academia de Guadalajara.",
    type: "website",
    locale: "es_MX",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-['Poppins']`}>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
