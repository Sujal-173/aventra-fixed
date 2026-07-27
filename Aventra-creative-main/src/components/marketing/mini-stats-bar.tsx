import { Award, Clock, Gauge, HeadphonesIcon, Layers } from "lucide-react";

const STATS = [
  { icon: Layers, value: "10+", label: "Projects Completed" },
  { icon: Award, value: "100%", label: "Client Satisfaction" },
  { icon: Clock, value: "3+", label: "Years Experience" },
  { icon: Gauge, value: "95+", label: "PageSpeed Score" },
  { icon: HeadphonesIcon, value: "24/7", label: "Support Available" },
];

export function MiniStatsBar() {
  return (
    <div className="card grid grid-cols-2 gap-6 p-6 sm:grid-cols-3 lg:grid-cols-5 lg:p-8">
      {STATS.map((s) => (
        <div key={s.label} className="flex items-center gap-3">
          <s.icon className="h-5 w-5 shrink-0" style={{ color: "var(--primary)" }} />
          <div>
            <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold leading-tight text-[var(--ink)]">
              {s.value}
            </p>
            <p className="text-[11px] leading-tight text-[var(--ink-muted)]">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
