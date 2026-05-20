import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-orange-500/15 border border-orange-500/25 flex items-center justify-center">
            <Shield className="w-3.5 h-3.5 text-orange-400" />
          </div>
          <span className="font-semibold text-sm text-white/50">
            My Pass <span className="text-gradient-orange">Generator</span>
          </span>
        </div>

        <p className="text-white/25 text-xs text-center">
          No data is collected or stored. All generation happens in your browser.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://dby-fly.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/25 hover:text-orange-400 transition-colors"
          >
            DBY FLY
          </a>
          <a
            href="https://github.com/Arava-0/my-pass-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/25 hover:text-orange-400 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
