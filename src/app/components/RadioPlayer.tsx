"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  streamUrl: string;
  station?: string;
};

export default function RadioPlayer({ streamUrl, station }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
  }, [volume]);

  useEffect(() => {
    const a = audioRef.current;
    if (a) a.muted = muted;
  }, [muted]);

  async function toggle() {
    const a = audioRef.current!;
    setError(null);
    try {
      if (a.paused) {
        await a.play();
        setPlaying(true);
      } else {
        a.pause();
        setPlaying(false);
      }
    } catch (e) {
      setError("Playback failed. Tap to try again.");
    }
  }

  function stop() {
    const a = audioRef.current!;
    a.pause();
    a.currentTime = 0;
    setPlaying(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <audio
        ref={audioRef}
        src={streamUrl}
        preload="none"
        crossOrigin="anonymous"
      />

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={toggle}
          className="rounded-xl bg-slate-100 px-5 py-3 font-medium text-slate-900 hover:opacity-90 active:scale-[.98]"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={stop}
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800"
        >
          Stop
        </button>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400">Volume</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
          <button
            onClick={() => setMuted((m) => !m)}
            className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:bg-slate-800"
          >
            {muted ? "Unmute" : "Mute"}
          </button>
        </div>

        {station && (
          <div className="ml-auto text-sm text-slate-400">📻 {station}</div>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <p className="text-xs text-slate-500">
        Note: Mobile browsers block autoplay—tap Play to start the stream.
      </p>
    </div>
  );
}
