import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const title = site.name ? `${site.name} — ${site.role}` : "Portfolio";

export const metadata: Metadata = {
  title: {
    default: title,
    template: site.name ? `%s — ${site.name}` : "%s",
  },
  description: site.intro || "Machine Learning & Software Engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <div className="mx-auto flex min-h-dvh max-w-2xl flex-col px-6 py-16 sm:px-8 sm:py-24">
          <main className="flex-1">{children}</main>
          <footer className="mt-24 font-mono text-xs text-muted">
            {site.name ? `© ${new Date().getFullYear()} ${site.name}` : null}
          </footer>
        </div>
      </body>
    </html>
  );
}
