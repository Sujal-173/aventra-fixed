const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-14";

export const sanityEnabled = Boolean(projectId && dataset);

/** Fetches published content from Sanity, returning the supplied local content during setup. */
export async function sanityFetch<T>(query: string, fallback: T): Promise<T> {
  if (!projectId || !dataset) return fallback;

  const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set("query", query);

  try {
    const response = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      next: { revalidate: 60 },
    });
    if (!response.ok) throw new Error(`Sanity returned ${response.status}`);

    const { result } = (await response.json()) as { result: T };
    return result == null || (Array.isArray(result) && result.length === 0) ? fallback : result;
  } catch (error) {
    // Local data keeps the public site fast and available if the CMS is
    // temporarily unreachable. Avoid noisy production logs for this expected
    // fallback while retaining useful diagnostics during local development.
    if (process.env.NODE_ENV === "development") {
      console.warn("Sanity fetch failed; using local content:", error);
    }
    return fallback;
  }
}
