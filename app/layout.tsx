import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Projection | Clarifier votre activité",
  description:
    "Projection vous aide à visualiser une version plus claire, cohérente et engageante de votre activité.",
  robots: { index: false, follow: false }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <main className="bg-premium-gradient">{children}</main>
      </body>
    </html>
  );
}
