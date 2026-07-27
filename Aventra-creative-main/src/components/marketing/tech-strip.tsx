const CLIENTS = [
  "Shubham Traders Solar",
  "Yashraj Palace",
  "Shree Balaji Events",
  "Avdhut Visuals",
  "Varda Grow",
  "Its Delight",
  "& More Clients",
];

export function TechStrip() {
  // Duplicate the list so the track can loop seamlessly at -50%.
  const track = [...CLIENTS, ...CLIENTS];

  return (
    <div className="relative overflow-hidden border-b border-[var(--line)] bg-[var(--bg)] py-8">
      <div className="mx-auto mb-5 max-w-7xl px-6 lg:px-8">
        <p className="label-mono text-[var(--ink-faint)]">Trusted by 20+ businesses</p>
      </div>

      {/* Edge fade masks so the strip reads as continuous, not clipped */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--bg)] to-transparent lg:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--bg)] to-transparent lg:w-32" />

      <div
        className="marquee-track flex w-max items-center gap-12 pr-12"
        style={{ animationDuration: "28s" }}
      >
        {track.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="shrink-0 font-[family-name:var(--font-space-grotesk)] text-lg font-medium whitespace-nowrap text-[var(--ink-faint)] transition-colors hover:text-[var(--ink)]"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
