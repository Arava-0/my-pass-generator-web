import { ShieldCheck, Cpu, Sliders, Globe, EyeOff, Download } from 'lucide-react';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Cryptographically Secure",
    desc: "Uses the browser's native crypto.getRandomValues() — the same CSPRNG as your OS. Zero modulo bias thanks to rejection sampling.",
  },
  {
    icon: EyeOff,
    title: "100% Private",
    desc: "Nothing leaves your device. No server, no logs, no analytics. The page works entirely offline once loaded.",
  },
  {
    icon: Sliders,
    title: "Fully Configurable",
    desc: "Control length, character sets, blocks, separators, ambiguous exclusions, and more — exactly like the CLI.",
  },
  {
    icon: Cpu,
    title: "No Dependencies",
    desc: "Pure JavaScript using the Web Crypto API. No libraries, no external calls for generation.",
  },
  {
    icon: Globe,
    title: "Cross-Platform CLI",
    desc: "Download the standalone binary for Windows, Linux, or macOS — no runtime, no install needed.",
  },
  {
    icon: Download,
    title: "Open Source",
    desc: "Fully auditable source code on GitHub. Read exactly how your passwords are generated.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Why <span className="text-gradient-orange">My Pass Generator</span>?
          </h2>
          <p className="text-white/40 text-base max-w-lg mx-auto">
            Strong passwords shouldn't require trusting a service. This one doesn't.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-card rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-orange-500/12 border border-orange-500/20 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
