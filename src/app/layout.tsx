export const metadata = {
  title: process.env.NEXT_PUBLIC_STATION_NAME ?? "Live Radio",
  description: process.env.NEXT_PUBLIC_TAGLINE ?? "24/7 online radio",
  manifest: "/manifest.webmanifest",
  themeColor: "#0f172a",
  icons: [
    { rel: "icon", url: "/icons/icon-48.png" },
    { rel: "apple-touch-icon", url: "/icons/icon-192.png" },
  ],
};

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const name = process.env.NEXT_PUBLIC_STATION_NAME ?? "Live Radio";
  return (
    <html lang="en">
      <body className="min-h-dvh bg-slate-950 text-slate-100 antialiased">
        <header className="mx-auto w-full max-w-4xl px-4 py-6">
          <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
          <p className="text-slate-400 text-sm">
            {process.env.NEXT_PUBLIC_TAGLINE ?? "Streaming now"}
          </p>
        </header>
        <main className="mx-auto w-full max-w-4xl px-4 pb-20">{children}</main>
        <footer className="mx-auto w-full max-w-4xl px-4 py-10 text-xs text-slate-400">
          © {new Date().getFullYear()} {name}
        </footer>
      </body>
    </html>
  );
}
