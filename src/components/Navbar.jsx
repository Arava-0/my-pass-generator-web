import { Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-orange-500/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-orange-500/15 border border-orange-500/25 flex items-center justify-center group-hover:bg-orange-500/25 transition-colors">
            <Shield className="w-4 h-4 text-orange-400" />
          </div>
          <span className="font-semibold text-base text-white/90">
            My Pass <span className="text-gradient-orange">Generator</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          <a href="#generator" className="text-sm text-white/50 hover:text-orange-400 transition-colors">Generator</a>
          <a href="#features" className="text-sm text-white/50 hover:text-orange-400 transition-colors">Features</a>
          <a href="#cli" className="text-sm text-white/50 hover:text-orange-400 transition-colors">CLI</a>
          <a
            href="https://github.com/Arava-0/my-pass-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-1.5 rounded-lg border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
