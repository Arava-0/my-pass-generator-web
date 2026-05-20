import { useState, useCallback } from 'react';
import {
  RefreshCw, Copy, Check, ChevronDown, ChevronUp,
  Shield, Zap, Settings2
} from 'lucide-react';
import { generatePasswords } from '../lib/generator.js';
import { DEFAULT_SAFE_CONFIG, DEFAULT_RAW_CONFIG, UNSAFE_ENV } from '../lib/charsets.js';

function CopyButton({ text, className = "" }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={handleCopy}
      className={`p-2 rounded-lg border border-white/8 hover:border-orange-500/30 hover:bg-orange-500/8 text-white/40 hover:text-orange-400 transition-all ${className}`}
      title="Copy"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-start gap-2 cursor-pointer group select-none">
      <div
        className={`relative shrink-0 w-9 h-5 rounded-full transition-colors mt-0.5 ${checked ? 'bg-orange-500' : 'bg-white/10'}`}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-4' : ''}`}
        />
      </div>
      <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors min-w-0 leading-snug">{label}</span>
    </label>
  );
}

function CategoryButton({ active, onClick, label, char }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl border text-xs font-medium transition-all ${
        active
          ? 'border-orange-500/50 bg-orange-500/12 text-orange-300'
          : 'border-white/8 bg-white/3 text-white/35 hover:border-white/15 hover:text-white/55'
      }`}
    >
      <span className="font-mono text-lg leading-none">{char}</span>
      <span>{label}</span>
    </button>
  );
}

const CATEGORIES = [
  { id: 'upper', label: 'Upper', char: 'A' },
  { id: 'lower', label: 'Lower', char: 'a' },
  { id: 'digits', label: 'Digits', char: '9' },
  { id: 'symbols', label: 'Symbols', char: '#' },
];

export default function Generator() {
  const [mode, setMode] = useState('safe');
  const [count, setCount] = useState(1);
  const [length, setLength] = useState(44);
  const [categories, setCategories] = useState(['upper', 'lower', 'digits', 'symbols']);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(true);
  const [requireEach, setRequireEach] = useState(true);
  const [blockSize, setBlockSize] = useState(11);
  const [blockSeparator, setBlockSeparator] = useState('-');
  const [useBlocks, setUseBlocks] = useState(true);
  const [excludeChars, setExcludeChars] = useState(UNSAFE_ENV);
  const [customSymbols, setCustomSymbols] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [passwords, setPasswords] = useState([]);
  const [allCopied, setAllCopied] = useState(false);

  const applyMode = (m) => {
    setMode(m);
    if (m === 'safe') {
      setLength(44);
      setExcludeAmbiguous(true);
      setExcludeChars(UNSAFE_ENV);
      setUseBlocks(true);
      setBlockSize(11);
      setBlockSeparator('-');
      setRequireEach(true);
      setCategories(['upper', 'lower', 'digits', 'symbols']);
    } else {
      setLength(32);
      setExcludeAmbiguous(false);
      setExcludeChars('');
      setUseBlocks(false);
      setRequireEach(true);
      setCategories(['upper', 'lower', 'digits', 'symbols']);
    }
  };

  const handleGenerate = useCallback(() => {
    const config = {
      length,
      count,
      categories,
      symbolSet: customSymbols.trim() || null,
      excludeAmbiguous,
      exclude: excludeChars.trim() || null,
      requireEach,
      blockSize: useBlocks ? blockSize : null,
      blockSeparator,
    };
    const result = generatePasswords(config);
    setPasswords(result);
  }, [length, count, categories, customSymbols, excludeAmbiguous, excludeChars, requireEach, useBlocks, blockSize, blockSeparator]);

  const copyAll = async () => {
    await navigator.clipboard.writeText(passwords.join('\n'));
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 1800);
  };

  const toggleCategory = (id) => {
    setCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <section id="generator" className="py-24 px-6 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Password <span className="text-gradient-orange">Generator</span>
          </h2>
          <p className="text-white/40 text-base">All computation happens in your browser. Nothing is sent anywhere.</p>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8">
          {/* Mode selector */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => applyMode('safe')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${
                mode === 'safe'
                  ? 'border-orange-500/50 bg-orange-500/12 text-orange-300'
                  : 'border-white/8 text-white/40 hover:border-white/15 hover:text-white/60'
              }`}
            >
              <Shield className="w-4 h-4" />
              Safe mode
            </button>
            <button
              onClick={() => applyMode('raw')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${
                mode === 'raw'
                  ? 'border-orange-500/50 bg-orange-500/12 text-orange-300'
                  : 'border-white/8 text-white/40 hover:border-white/15 hover:text-white/60'
              }`}
            >
              <Zap className="w-4 h-4" />
              Raw mode
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left: settings */}
            <div className="space-y-6">
              {/* Count */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-white/60">Count</label>
                  <span className="text-sm font-mono text-orange-400">{count}</span>
                </div>
                <input
                  type="range" min="1" max="20" value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none bg-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-xs text-white/20 mt-1">
                  <span>1</span><span>20</span>
                </div>
              </div>

              {/* Length */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-white/60">Length</label>
                  <span className="text-sm font-mono text-orange-400">{length}</span>
                </div>
                <input
                  type="range" min="8" max="128" value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none bg-white/10 accent-orange-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-xs text-white/20 mt-1">
                  <span>8</span><span>128</span>
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="text-sm text-white/60 block mb-3">Character sets</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CATEGORIES.map(({ id, label, char }) => (
                    <CategoryButton
                      key={id}
                      active={categories.includes(id)}
                      onClick={() => toggleCategory(id)}
                      label={label}
                      char={char}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: toggles */}
            <div className="space-y-5">
              <Toggle
                checked={excludeAmbiguous}
                onChange={setExcludeAmbiguous}
                label="Exclude ambiguous chars (0, O, 1, l, I…)"
              />
              <Toggle
                checked={requireEach}
                onChange={setRequireEach}
                label="Require at least one char per category"
              />
              <Toggle
                checked={useBlocks}
                onChange={setUseBlocks}
                label="Split into blocks"
              />
              {useBlocks && (
                <div className="sm:pl-4 sm:border-l border-orange-500/15 space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs text-white/40">Block size</label>
                      <span className="text-xs font-mono text-orange-400">{blockSize}</span>
                    </div>
                    <input
                      type="range" min="4" max="20" value={blockSize}
                      onChange={(e) => setBlockSize(Number(e.target.value))}
                      className="w-full h-1 rounded-full appearance-none bg-white/10 accent-orange-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 block mb-1.5">Separator</label>
                    <input
                      type="text" maxLength={3} value={blockSeparator}
                      onChange={(e) => setBlockSeparator(e.target.value)}
                      className="w-20 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm font-mono focus:outline-none focus:border-orange-500/40"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Advanced */}
          <div className="mb-8">
            <button
              onClick={() => setShowAdvanced((v) => !v)}
              className="flex items-center gap-2 text-sm text-white/35 hover:text-orange-400 transition-colors"
            >
              <Settings2 className="w-3.5 h-3.5" />
              Advanced options
              {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showAdvanced && (
              <div className="mt-4 grid md:grid-cols-2 gap-4 sm:pl-4 sm:border-l border-orange-500/15">
                <div>
                  <label className="text-xs text-white/40 block mb-1.5">Exclude characters</label>
                  <input
                    type="text" value={excludeChars}
                    onChange={(e) => setExcludeChars(e.target.value)}
                    placeholder="e.g. $#!`\&"
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm font-mono focus:outline-none focus:border-orange-500/40 placeholder:text-white/20"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 block mb-1.5">Custom symbol set</label>
                  <input
                    type="text" value={customSymbols}
                    onChange={(e) => setCustomSymbols(e.target.value)}
                    placeholder="Leave empty for default"
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm font-mono focus:outline-none focus:border-orange-500/40 placeholder:text-white/20"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            className="w-full py-4 rounded-xl bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-semibold text-base transition-colors flex items-center justify-center gap-2 glow-orange-hover"
          >
            <RefreshCw className="w-4 h-4" />
            Generate
          </button>

          {/* Output */}
          {passwords.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/30">{passwords.length} password{passwords.length > 1 ? 's' : ''} generated</span>
                <button
                  onClick={copyAll}
                  className="flex items-center gap-1.5 text-xs text-white/40 hover:text-orange-400 transition-colors"
                >
                  {allCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {allCopied ? 'Copied!' : 'Copy all'}
                </button>
              </div>
              <div className="space-y-2">
                {passwords.map((pw, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-black/30 border border-white/5"
                  >
                    <span className="font-mono text-orange-200 text-sm tracking-wider break-all select-all flex-1">
                      {pw}
                    </span>
                    <CopyButton text={pw} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
