import { Download as DownloadIcon, Monitor, Terminal, Cpu } from 'lucide-react';

const PLATFORM_ICONS = {
  windows: Monitor,
  'linux-x64': Terminal,
  'linux-arm64': Terminal,
  'macos-x64': Cpu,
  'macos-arm64': Cpu,
};

function detectPlatform() {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('win')) return 'windows';
  if (ua.includes('mac')) {
    // heuristic: Apple Silicon macs report arm via some UAs
    return ua.includes('arm') ? 'macos-arm64' : 'macos-x64';
  }
  if (ua.includes('linux')) return 'linux-x64';
  return null;
}

export default function Download({ release, loading }) {
  const detected = detectPlatform();

  const platforms = release?.platforms ?? [];
  const suggested = platforms.find((p) => p.id === detected);
  const others = platforms.filter((p) => p.id !== detected);

  return (
    <section id="download" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[800px] h-[350px] rounded-full bg-orange-600/6 blur-[130px] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Download the <span className="text-gradient-orange">CLI</span>
        </h2>
        <p className="text-white/40 text-base mb-10">
          Standalone binary — no runtime, no install. Just download and run.
        </p>

        {/* Suggested platform (big button) */}
        {suggested ? (
          <div className="mb-6">
            <a
              href={suggested.url}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white font-semibold text-lg transition-colors glow-orange-hover mb-3"
            >
              <DownloadIcon className="w-5 h-5" />
              Download for {suggested.label}
              <span className="text-orange-200/70 text-sm font-normal">{suggested.sub}</span>
            </a>
            <p className="text-white/25 text-xs">Detected: {suggested.label} {suggested.sub}</p>
          </div>
        ) : (
          <div className="mb-6">
            <a
              href={release?.releaseUrl ?? 'https://github.com/Arava-0/my-pass-generator/releases/latest'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white font-semibold text-lg transition-colors glow-orange-hover"
            >
              <DownloadIcon className="w-5 h-5" />
              {loading ? 'Loading…' : 'Latest Release'}
            </a>
          </div>
        )}

        {/* Other platforms */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {(suggested ? others : platforms).map((p) => {
            const Icon = PLATFORM_ICONS[p.id] ?? DownloadIcon;
            return (
              <a
                key={p.id}
                href={p.url}
                className="glass-card rounded-xl px-4 py-3 flex flex-col items-center gap-1.5 text-xs text-white/45 hover:text-orange-400 transition-colors group"
              >
                <Icon className="w-4 h-4 group-hover:text-orange-400 transition-colors" />
                <span className="font-medium">{p.label}</span>
                <span className="text-white/25">{p.sub}</span>
              </a>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-4 text-sm text-white/25 flex-wrap">
          <span className="font-mono">{loading ? '…' : (release?.version ?? '')}</span>
          <span>·</span>
          <a
            href={release?.releaseUrl ?? 'https://github.com/Arava-0/my-pass-generator/releases/latest'}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/50 transition-colors"
          >
            All releases on GitHub
          </a>
          <span>·</span>
          <span>MIT License</span>
        </div>
      </div>
    </section>
  );
}
