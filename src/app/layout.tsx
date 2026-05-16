import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Velorix AI — AI Training Jobs That Shape Tomorrow",
  description:
    "Work on real-world AI systems. Flexible remote opportunities. Fair pay. Global contributors. Join 25K+ contributors shaping the future of AI.",
  keywords: "AI training jobs, machine learning, data labeling, AI annotation, remote AI work",
  openGraph: {
    title: "Velorix AI — AI Training Jobs",
    description: "Work on real-world AI systems. Flexible remote. Fair pay.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}