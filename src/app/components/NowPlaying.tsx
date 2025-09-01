"use client";

import { useEffect, useState } from "react";

type NP = {
  ok: boolean;
  artist?: string;
  title?: string;
  listeners?: number | null;
  bitrate?: number | null;
  codec?: string | null;
  mount?: string | null;
  stream_start?: string | null;
  reason?: string;
};

export default function NowPlaying() {
  const [np, setNp] = useState<NP | null>(null);

  async function load() {
    try {
      const res = await fetch("/api/now-playing", { cache: "no-store" });
      setNp(await res.json());
    } catch {
      setNp({ ok: false, reason: "Network error" });
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 15000); // poll every 15s
    return () => clearInterval(id);
  }, []);

  const title = np?.title?.trim();
  const artist = np?.artist?.trim();

  return (
    <div className="mb-3 flex flex-wrap items-center gap-3">
      <div className="rounded-xl bg-slate-800/60 px-4 py-2">
        <span className="text-sm text-slate-300">Now Playing: </span>
        <span className="font-medium">
          {title || artist ? `${artist ? artist + " — " : ""}${title ?? ""}` : "…"}
        </span>
      </div>

      {typeof np?.listeners === "number" && (
        <div className="rounded-xl bg-slate-800/60 px-3 py-1 text-xs text-slate-300">
          👥 {np.listeners} listeners
        </div>
      )}

      {np && !np.ok && (
        <div className="text-xs text-red-300">Now Playing unavailable: {np.reason}</div>
      )}
    </div>
  );
}
