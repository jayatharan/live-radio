import NowPlaying from "./components/NowPlaying";
import RadioPlayer from "./components/RadioPlayer";
import Schedule from "./components/Schedule";

export default function Home() {
  const streamUrl = process.env.NEXT_PUBLIC_STREAM_URL!;
  const station = process.env.NEXT_PUBLIC_STATION_NAME ?? "Live Radio";

  return (
    <div className="grid gap-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
        <NowPlaying />
        <RadioPlayer streamUrl={streamUrl} station={station} />
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
        <h2 className="mb-3 text-lg font-semibold">Today’s Schedule</h2>
        <Schedule />
      </section>
    </div>
  );
}
