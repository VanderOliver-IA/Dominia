import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dominia — Aprenda IA de forma divertida e viciante",
  description:
    "Plataforma gamificada de aprendizado em Inteligência Artificial. Transformamos cada lição em um jogo. Aprenda no seu ritmo, no seu nível.",
  keywords: [
    "aprender IA",
    "inteligência artificial",
    "gamificação",
    "cursos de IA",
    "aprendizado adaptativo",
    "ChatGPT",
    "Midjourney",
    "automação",
  ],
  authors: [{ name: "Dominia" }],
  openGraph: {
    title: "Dominia — Aprenda IA de forma divertida e viciante",
    description:
      "Transformamos cada lição em um jogo. Aprenda IA no seu ritmo, no seu nível.",
    siteName: "Dominia",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-dvh bg-surface-950 text-surface-100 antialiased">
        {children}
      </body>
    </html>
  );
}
