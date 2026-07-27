// Generates a lightweight "browser mockup" SVG data URI for a project card.
// Used as a stand-in for a real product screenshot: instead of a flat
// gradient rectangle with a name stamped on it, this renders an actual
// mini website layout (nav, headline, CTA, result badge, screenshot panel)
// using the project's own brand colors — reads like a real case-study
// thumbnail rather than a placeholder tile.

function extractColors(gradientCss: string): string[] {
  const matches = gradientCss.match(/#[0-9a-fA-F]{3,8}/g);
  return matches && matches.length >= 2 ? matches : ["#4338ca", "#6366f1", "#818cf8"];
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function wrapTitle(name: string): string[] {
  const words = name.split(" ");
  if (words.length <= 2) return [name];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

export function projectMockupDataUri(opts: {
  name: string;
  category: string;
  result: string;
  year: string;
  keyFeatures: string[];
  gradient: string;
}): string {
  const colors = extractColors(opts.gradient);
  const c0 = colors[0];
  const c1 = colors[Math.min(1, colors.length - 1)];
  const c2 = colors[colors.length - 1];
  const domain = opts.name.toLowerCase().replace(/[^a-z0-9]+/g, "") + ".com";
  const titleLines = wrapTitle(opts.name);
  const baseY = titleLines.length === 2 ? 368 : 340;
  const chips = opts.keyFeatures.slice(0, 3);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
<defs>
  <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${c0}"/>
    <stop offset="0.55" stop-color="${c1}"/>
    <stop offset="1" stop-color="${c2}"/>
  </linearGradient>
</defs>
<rect width="1200" height="900" fill="#f4f5fa"/>
<rect x="0" y="0" width="1200" height="58" fill="#ffffff"/>
<rect x="0" y="57" width="1200" height="1" fill="#e5e7f0"/>
<circle cx="36" cy="29" r="6" fill="#dfe1ec"/>
<circle cx="60" cy="29" r="6" fill="#dfe1ec"/>
<circle cx="84" cy="29" r="6" fill="#dfe1ec"/>
<rect x="140" y="16" width="340" height="26" rx="13" fill="#eef0f7"/>
<text x="160" y="34" font-size="14" fill="#9298ac" font-family="Arial, sans-serif">${domain}</text>

<text x="60" y="150" font-size="18" letter-spacing="2" fill="${c2}" font-family="Arial, sans-serif" font-weight="700">${escapeXml(opts.category.toUpperCase())}</text>
${titleLines
  .map(
    (line, i) =>
      `<text x="60" y="${titleLines.length === 2 ? 246 + i * 70 : 270}" font-size="56" fill="#12142b" font-family="Arial, sans-serif" font-weight="800">${escapeXml(line)}</text>`
  )
  .join("\n")}
<rect x="60" y="${baseY}" width="380" height="10" rx="5" fill="#d9dbe8"/>
<rect x="60" y="${baseY + 26}" width="300" height="10" rx="5" fill="#d9dbe8"/>

<rect x="60" y="${baseY + 70}" width="158" height="46" rx="23" fill="${c2}"/>
<text x="139" y="${baseY + 99}" font-size="15" fill="#ffffff" font-family="Arial, sans-serif" font-weight="700" text-anchor="middle">View Project</text>
<rect x="234" y="${baseY + 70}" width="130" height="46" rx="23" fill="none" stroke="#d9dbe8" stroke-width="1.5"/>
<text x="299" y="${baseY + 99}" font-size="15" fill="#4a4f66" font-family="Arial, sans-serif" font-weight="600" text-anchor="middle">Live Site</text>

<rect x="60" y="${baseY + 140}" width="${Math.min(380, 100 + opts.result.length * 8)}" height="36" rx="18" fill="#ffffff" stroke="${c2}" stroke-opacity="0.35"/>
<circle cx="82" cy="${baseY + 158}" r="8" fill="${c2}"/>
<text x="82" y="${baseY + 162}" font-size="11" fill="#ffffff" font-family="Arial, sans-serif" font-weight="700" text-anchor="middle">OK</text>
<text x="100" y="${baseY + 163}" font-size="14" fill="#2b2e3f" font-family="Arial, sans-serif" font-weight="700">${escapeXml(opts.result)}</text>

<rect x="640" y="110" width="500" height="560" rx="28" fill="url(#grad)"/>
<rect x="676" y="146" width="428" height="42" rx="10" fill="rgba(255,255,255,0.16)"/>
<rect x="676" y="204" width="300" height="14" rx="7" fill="rgba(255,255,255,0.35)"/>
<rect x="676" y="230" width="220" height="14" rx="7" fill="rgba(255,255,255,0.22)"/>
<rect x="676" y="284" width="428" height="260" rx="16" fill="rgba(255,255,255,0.12)"/>
<rect x="676" y="576" width="140" height="60" rx="14" fill="rgba(255,255,255,0.22)"/>
<rect x="828" y="576" width="140" height="60" rx="14" fill="rgba(255,255,255,0.22)"/>
<rect x="980" y="576" width="124" height="60" rx="14" fill="rgba(255,255,255,0.22)"/>
<rect x="660" y="640" width="220" height="30" rx="15" fill="rgba(10,10,20,0.28)"/>
<text x="672" y="660" font-size="13" fill="#ffffff" font-family="Arial, sans-serif" font-weight="600">${escapeXml(opts.category)} · ${escapeXml(opts.year)}</text>

${chips
  .map(
    (f, i) =>
      `<circle cx="${76 + i * 370}" cy="800" r="6" fill="${c2}"/>\n<text x="${96 + i * 370}" y="805" font-size="15" fill="#4a4f66" font-family="Arial, sans-serif" font-weight="600">${escapeXml(f)}</text>`
  )
  .join("\n")}
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
