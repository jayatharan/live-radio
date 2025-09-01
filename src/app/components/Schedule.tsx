"use client";

const schedule = [
  { start: "00:00", end: "03:00", show: "Late Night Lounge" },
  { start: "03:00", end: "06:00", show: "Chill Dawn" },
  { start: "06:00", end: "10:00", show: "Morning Drive" },
  { start: "10:00", end: "14:00", show: "Midday Mix" },
  { start: "14:00", end: "18:00", show: "Afternoon Flow" },
  { start: "18:00", end: "22:00", show: "Prime Time" },
  { start: "22:00", end: "24:00", show: "Nightwave" },
];

export default function Schedule() {
  return (
    <div className="grid gap-2">
      {schedule.map((s) => (
        <div
          key={s.start}
          className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/30 px-4 py-2"
        >
          <span className="tabular-nums text-slate-300">
            {s.start}–{s.end}
          </span>
          <span className="font-medium">{s.show}</span>
        </div>
      ))}
    </div>
  );
}
