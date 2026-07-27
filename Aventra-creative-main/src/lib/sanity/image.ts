/**
 * Sanity's asset CDN (cdn.sanity.io) accepts resize/format query params directly
 * on the raw asset URL, so we don't need Next's server-side image optimizer to
 * get a right-sized, modern-format image. Building the URL this way and passing
 * `unoptimized` to next/image avoids Next re-fetching the image on the server,
 * which is what triggers "resolved to private ip" failures in dev environments
 * (WSL2/Docker) that route outbound DNS through NAT64.
 */
export function sanityImageUrl(
  url: string | undefined,
  { width, height, quality = 80 }: { width?: number; height?: number; quality?: number } = {},
) {
  if (!url) return undefined;
  const params = new URLSearchParams();
  if (width) params.set("w", String(width));
  if (height) params.set("h", String(height));
  params.set("q", String(quality));
  params.set("auto", "format");
  params.set("fit", "max");
  return `${url}?${params.toString()}`;
}
