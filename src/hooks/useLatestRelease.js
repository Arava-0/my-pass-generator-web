import { useState, useEffect } from 'react';

const REPO = 'Arava-0/my-pass-generator';
const CACHE_KEY = 'my-pass-generator-release';
const CACHE_TTL = 3 * 60 * 1000;

const PLATFORMS = [
  { id: 'windows', label: 'Windows', sub: 'x64', artifact: 'passgen-windows-x64.exe' },
  { id: 'linux-x64', label: 'Linux', sub: 'x64', artifact: 'passgen-linux-x64' },
  { id: 'linux-arm64', label: 'Linux', sub: 'ARM64', artifact: 'passgen-linux-arm64' },
  { id: 'macos-x64', label: 'macOS', sub: 'Intel', artifact: 'passgen-macos-x64' },
  { id: 'macos-arm64', label: 'macOS', sub: 'Apple Silicon', artifact: 'passgen-macos-arm64' },
];

const FALLBACK_VERSION = 'v1.0.0';
const RELEASES_URL = `https://github.com/${REPO}/releases/latest`;

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return data;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch {}
}

function parseAssets(apiAssets, releaseUrl) {
  return PLATFORMS.map((p) => {
    const asset = apiAssets?.find((a) => a.name === p.artifact);
    return {
      ...p,
      url: asset?.browser_download_url ?? releaseUrl,
    };
  });
}

export function useLatestRelease() {
  const cached = readCache();
  const [release, setRelease] = useState(cached ?? null);
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    if (cached) return;

    fetch(`https://api.github.com/repos/${REPO}/releases/latest`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.tag_name) throw new Error('No release');
        const result = {
          version: data.tag_name,
          releaseUrl: data.html_url ?? RELEASES_URL,
          platforms: parseAssets(data.assets, data.html_url ?? RELEASES_URL),
        };
        writeCache(result);
        setRelease(result);
      })
      .catch(() =>
        setRelease({
          version: FALLBACK_VERSION,
          releaseUrl: RELEASES_URL,
          platforms: PLATFORMS.map((p) => ({ ...p, url: RELEASES_URL })),
        })
      )
      .finally(() => setLoading(false));
  }, []);

  return { release, loading };
}

export { PLATFORMS };
