import { useEffect, useState } from 'react';
import { ChevronDown, Lock, Cpu } from 'lucide-react';
import { generatePasswords } from '../lib/generator.js';
import { DEFAULT_SAFE_CONFIG } from '../lib/charsets.js';

const DEMO_PASSWORDS = [
  "Kx7n-PqmR4v-Yw9jZt2-Lc5s",
  "Mv3f-Nq8bH2-Xr6dWp4-Ks1j",
  "Rp9t-Vc4mJ7-Zq2nBk8-Fx5h",
];

export default function Hero() {
  const [displayed, setDisplayed] = useState(DEMO_PASSWORDS[0]);
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        const next = generatePasswords({ ...DEFAULT_SAFE_CONFIG, count: 1 });
        setDisplayed(next[0] ?? DEMO_PASSWORDS[(idx + 1) % DEMO_PASSWORDS.length]);
        setIdx((i) => i + 1);
        setFading(false);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, [idx]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 bg-grid overflow-hidden">
      {/* ambient glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-700/6 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/6 text-orange-400 text-xs font-medium mb-8">
          <Cpu className="w-3 h-3" />
          100% client-side · No tracking · No storage
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-none">
          <span className="text-white">Secure</span>
          <br />
          <span className="text-gradient-orange">Passwords</span>
          <br />
          <span className="text-white/70 text-4xl md:text-5xl font-semibold">in seconds.</span>
        </h1>

        <p className="text-white/45 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
          Cryptographically secure. Fully configurable. Nothing leaves your device.
        </p>

        {/* live password preview */}
        <div
          className="glass rounded-2xl px-8 py-6 mb-10 mx-auto max-w-xl glow-orange transition-opacity duration-400"
          style={{ opacity: fading ? 0 : 1 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-3.5 h-3.5 text-orange-400/60" />
            <span className="text-white/30 text-xs">Live preview</span>
          </div>
          <p className="font-mono text-orange-300 text-xl md:text-2xl tracking-widest break-all select-all">
            {displayed}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#generator"
            className="px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold text-base transition-colors glow-orange-hover"
          >
            Open Generator
          </a>
          <a
            href="https://github.com/Arava-0/my-pass-generator/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-xl border border-white/10 text-white/60 hover:text-white/90 hover:border-white/20 font-medium text-base transition-colors"
          >
            Download CLI
          </a>
        </div>
      </div>

      <a
        href="#generator"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 hover:text-orange-400/60 transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </a>
    </section>
  );
}
