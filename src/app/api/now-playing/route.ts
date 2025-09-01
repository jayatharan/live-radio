import { NextResponse } from "next/server";

export const revalidate = 0; // always fresh
export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.ICECAST_STATUS_URL;
  if (!url) {
    return NextResponse.json({ ok: false, reason: "ICECAST_STATUS_URL missing" }, { status: 500 });
  }

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();

    // Icecast returns { icestats: { source: {...} | [...] } }
    const src = data?.icestats?.source;
    const sources = Array.isArray(src) ? src : src ? [src] : [];
    const best = sources[0] ?? null;

    // Try to split "Artist - Title" if artist field missing
    const rawTitle: string = best?.title ?? "";
    const artist = best?.artist ?? (rawTitle.includes(" - ") ? rawTitle.split(" - ")[0] : "");
    const title =
      best?.artist ? best?.title ?? "" : rawTitle.includes(" - ") ? rawTitle.split(" - ").slice(1).join(" - ") : rawTitle;

    const payload = {
      ok: true,
      artist,
      title,
      listeners: best?.listeners ?? null,
      bitrate: best?.bitrate ?? null,
      codec: best?.server_type ?? best?.content_type ?? null,
      mount: best?.listenurl ?? null,
      stream_start: best?.stream_start_iso8601 ?? best?.stream_start ?? null,
    };

    return NextResponse.json(payload);
  } catch (e) {
    return NextResponse.json({ ok: false, reason: "Fetch failed" }, { status: 500 });
  }
}
