import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "Clase de MMA GRATUITA - Transforma tu Rendimiento | Blackbird House",
  description: "Descubre en 60 minutos lo que otros tardan meses en aprender. Clase gratuita de MMA con entrenadores certificados. Cupos limitados.",
  keywords: "clase MMA gratuita, entrenamiento MMA gratis, artes marciales Palermo, clase prueba MMA, Blackbird House",
  openGraph: {
    title: "Clase de MMA GRATUITA - Blackbird House",
    description: "Transforma tu rendimiento en solo una clase… y gratis. Cupos limitados.",
    type: "website",
    locale: "es_AR",
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
      </body>
    </html>
  );
}
