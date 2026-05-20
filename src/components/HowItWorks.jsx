import { Terminal } from 'lucide-react';

const EXAMPLES = [
  {
    desc: "Default — safe mode, 44 chars, split into blocks of 11",
    cmd: "my-pass-generator",
    out: "Kx7nPqmR4vYw-9jZt2Lc5s-Mv3fNq8b-H2Xr6dWp4",
  },
  {
    desc: "Generate 5 passwords, 20 chars, raw mode",
    cmd: "my-pass-generator --raw -l 20 -c 5",
    out: "Mv3f$Nq8bH#2Xr6dWp4K\nRp9t!Vc4mJ@7Zq2nBk8F\n...",
  },
  {
    desc: "Uppercase + digits only, 16 chars, no ambiguous",
    cmd: "my-pass-generator -l 16 -L -S --exclude-ambiguous",
    out: "K7N4Q8V2Y9J3M5P6",
  },
  {
    desc: "Custom symbol set, block size 8",
    cmd: 'my-pass-generator --symbol-set "@!-" --block-size 8',
    out: "Kx7nPqmR-4vYw9jZ-t2Lc5sMv",
  },
];

export default function HowItWorks() {
  return (
    <section id="cli" className="py-24 px-6 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Use the <span className="text-gradient-orange">CLI</span>
          </h2>
          <p className="text-white/40 text-base max-w-lg mx-auto">
            Prefer the terminal? Download the standalone binary and run it anywhere — no runtime required.
          </p>
        </div>

        <div className="space-y-4">
          {EXAMPLES.map(({ desc, cmd, out }, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
                <Terminal className="w-3.5 h-3.5 text-orange-400/60" />
                <span className="text-xs text-white/35">{desc}</span>
              </div>
              <div className="px-5 py-4 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-orange-500/60 font-mono text-sm select-none mt-0.5">$</span>
                  <code className="font-mono text-orange-200 text-sm">{cmd}</code>
                </div>
                <div className="flex items-start gap-2 opacity-50">
                  <span className="font-mono text-white/30 text-xs select-none mt-0.5">→</span>
                  <code className="font-mono text-white/60 text-xs whitespace-pre">{out}</code>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 glass rounded-2xl p-6">
          <p className="text-xs text-white/30 font-mono mb-3">All flags</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 font-mono text-xs">
            {[
              ["-l <n>", "Password length (default: 44)"],
              ["-c <n>", "Number of passwords"],
              ["--raw", "Raw mode (32 chars, all symbols)"],
              ["-U / -L / -D / -S", "Disable uppercase/lower/digits/symbols"],
              ["--symbol-set <str>", "Custom symbol characters"],
              ["--exclude <str>", "Characters to exclude"],
              ["--exclude-ambiguous", "Exclude 0/O, 1/l/I, etc."],
              ["--block-size <n>", "Split output into blocks of N"],
              ["--block-sep <str>", "Block separator (default: -)"],
              ["--no-require-each", "Don't force one char per category"],
            ].map(([flag, desc]) => (
              <div key={flag} className="flex flex-col sm:flex-row sm:gap-3 py-1.5 border-b border-white/4 last:border-0">
                <span className="text-orange-400/80 sm:shrink-0 sm:w-40">{flag}</span>
                <span className="text-white/30">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="#download"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 font-medium text-base transition-colors"
          >
            Download the binary ↓
          </a>
        </div>
      </div>
    </section>
  );
}
