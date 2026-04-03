import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

const demoTabs = [
  { id: 'breakthrough', label: 'BREAKTHROUGH' },
  { id: 'powerup', label: 'POWERUP' },
  { id: 'scaffold', label: 'SCAFFOLD' },
  { id: 'sentient', label: 'SENTIENT' },
];

const colorModes = [
  { name: 'Neon Void', from: '#FFEA00', to: '#00ffff', bg: '#0a0a0a' },
  { name: 'Sunset Burn', from: '#FF6B00', to: '#FF0033', bg: '#111111' },
  { name: 'Matrix Green', from: '#00FF66', to: '#00ff00', bg: '#000000' },
  { name: 'Cyber Pink', from: '#FF0080', to: '#ccff00', bg: '#0a0a0a' },
  { name: 'Arctic Blue', from: '#00ffff', to: '#FFFFFF', bg: '#0a0a0a' },
];

const templates = [
  'Create a brutalist landing page',
  'Design a dashboard layout',
  'Build a portfolio section',
  'Prototype a contact form',
];

const constraints = [
  { label: 'Mobile First', score: 20 },
  { label: 'Accessible', score: 25 },
  { label: 'Performance', score: 30 },
  { label: 'SEO Optimized', score: 15 },
  { label: 'Dark Mode', score: 10 },
];

function BreakthroughDemo() {
  const [modeIndex, setModeIndex] = useState(0);
  const mode = colorModes[modeIndex];

  return (
    <div className="space-y-6">
      <div>
        <label
          className="block text-xs font-semibold tracking-[0.1em] uppercase mb-2"
          style={{ color: 'var(--brutal-text-muted)' }}
        >
          Color Mode
        </label>
        <select
          value={modeIndex}
          onChange={(e) => setModeIndex(Number(e.target.value))}
          className="w-full max-w-xs px-3 py-2 text-sm font-semibold outline-none cursor-pointer min-h-[44px]"
          style={{
            background: 'var(--brutal-surface)',
            color: 'var(--brutal-border)',
            border: 'var(--border-thin)',
          }}
        >
          {colorModes.map((m, i) => (
            <option key={m.name} value={i}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Preview */}
        <div
          className="brutal-card p-6 flex items-center justify-center min-h-[200px]"
          style={{ background: mode.bg }}
        >
          <div
            className="w-32 h-32"
            style={{
              background: `linear-gradient(135deg, ${mode.from}, ${mode.to})`,
              border: '4px solid var(--brutal-border)',
            }}
          />
        </div>

        {/* Specs */}
        <div className="brutal-card p-6">
          <h4
            className="font-bold text-sm tracking-wide uppercase mb-4"
            style={{ color: 'var(--brutal-yellow)' }}
          >
            Specifications
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span style={{ color: 'var(--brutal-text-muted)' }}>Mode</span>
              <span style={{ color: 'var(--brutal-border)' }}>{mode.name}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--brutal-text-muted)' }}>Primary</span>
              <span
                className="font-mono text-xs px-2"
                style={{
                  background: 'var(--brutal-void)',
                  color: mode.from,
                }}
              >
                {mode.from}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--brutal-text-muted)' }}>Secondary</span>
              <span
                className="font-mono text-xs px-2"
                style={{
                  background: 'var(--brutal-void)',
                  color: mode.to,
                }}
              >
                {mode.to}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--brutal-text-muted)' }}>Contrast</span>
              <span style={{ color: 'var(--brutal-green)' }}>AAA ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PowerupDemo() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const generate = useCallback(
    (template?: string) => {
      const text = template || input;
      if (!text.trim()) return;
      setOutput(
        `✦ ${text}\n\n→ Layout: Grid-based brutalist structure\n→ Typography: System fonts, weight 900 headings\n→ Colors: High contrast with accent pops\n→ Animation: Framer Motion transitions\n→ Status: READY TO BUILD`
      );
    },
    [input]
  );

  return (
    <div className="space-y-6">
      <div>
        <label
          className="block text-xs font-semibold tracking-[0.1em] uppercase mb-2"
          style={{ color: 'var(--brutal-text-muted)' }}
        >
          Describe your project
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your project description..."
          rows={4}
          className="w-full px-4 py-3 text-sm outline-none resize-none"
          style={{
            background: 'var(--brutal-surface)',
            color: 'var(--brutal-border)',
            border: 'var(--border-thin)',
          }}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {templates.map((t) => (
          <button
            key={t}
            onClick={() => generate(t)}
            className="px-3 py-1.5 text-xs font-semibold tracking-wide cursor-pointer transition-all duration-150 hover:translate-y-[2px] min-h-[44px] inline-flex items-center interactive-press"
            style={{
              background: 'var(--brutal-surface)',
              color: 'var(--brutal-cyan)',
              border: 'var(--border-thin)',
            }}
          >
            {t}
          </button>
        ))}
        <button
          onClick={() => generate()}
          className="px-4 py-1.5 text-xs font-bold tracking-wide cursor-pointer transition-all duration-150 hover:translate-y-[2px] min-h-[44px] inline-flex items-center interactive-press"
          style={{
            background: 'var(--brutal-yellow)',
            color: 'var(--brutal-void)',
            border: 'var(--border-thick)',
          }}
        >
          GENERATE
        </button>
      </div>

      {output && (
        <div
          className="brutal-card p-6"
          style={{ borderLeft: '4px solid var(--brutal-green)' }}
        >
          <pre
            className="text-sm whitespace-pre-wrap font-mono leading-relaxed"
            style={{ color: 'var(--brutal-border)' }}
          >
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

function ScaffoldDemo() {
  const [chips, setChips] = useState(constraints);

  const toggleChip = (index: number) => {
    setChips((prev) =>
      prev.map((c, i) =>
        i === index
          ? { ...c, score: c.score > 0 ? 0 : constraints[i].score }
          : c
      )
    );
  };

  const total = chips.reduce((sum, c) => sum + c.score, 0);

  return (
    <div className="space-y-6">
      <p
        className="text-sm"
        style={{ color: 'var(--brutal-text-muted)' }}
      >
        Click to toggle constraints and see the confidence score update in
        real-time.
      </p>

      <div className="flex flex-wrap gap-3">
        {chips.map((chip, i) => (
          <button
            key={chip.label}
            onClick={() => toggleChip(i)}
            className={cn(
              'px-4 py-2 text-xs font-semibold tracking-wide cursor-pointer transition-all duration-150 min-h-[44px] inline-flex items-center interactive-press'
            )}
            style={{
              background:
                chip.score > 0
                  ? 'var(--brutal-surface)'
                  : 'var(--brutal-void)',
              color:
                chip.score > 0
                  ? 'var(--brutal-border)'
                  : 'var(--brutal-text-muted)',
              border: chip.score > 0
                ? '2px solid var(--brutal-yellow)'
                : '2px solid var(--brutal-text-muted)',
              opacity: chip.score > 0 ? 1 : 0.4,
              textDecoration: chip.score > 0 ? 'none' : 'line-through',
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <div className="brutal-card p-6">
        <div className="flex justify-between items-center mb-3">
          <span
            className="text-sm font-semibold"
            style={{ color: 'var(--brutal-border)' }}
          >
            Confidence Score
          </span>
          <span
            className="text-2xl font-black font-mono"
            style={{
              color:
                total >= 80
                  ? 'var(--brutal-green)'
                  : total >= 50
                    ? 'var(--brutal-yellow)'
                    : 'var(--brutal-red)',
            }}
          >
            {total}%
          </span>
        </div>
        <div
          className="h-4 w-full"
          style={{ background: 'var(--brutal-void)' }}
        >
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${total}%`,
              background:
                total >= 80
                  ? 'var(--brutal-green)'
                  : total >= 50
                    ? 'var(--brutal-yellow)'
                    : 'var(--brutal-red)',
            }}
          />
        </div>
        <p
          className="text-xs mt-2 font-mono"
          style={{ color: 'var(--brutal-text-muted)' }}
        >
          {total === 100
            ? '✓ All constraints active — maximum confidence'
            : total === 0
              ? '✗ No constraints — no confidence'
              : `${chips.filter((c) => c.score > 0).length}/${chips.length} constraints active`}
        </p>
      </div>
    </div>
  );
}

function SentientDemo() {
  const [bgColor, setBgColor] = useState('#0a0a0a');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [borderStyle, setBorderStyle] = useState('solid');
  const [fontWeight, setFontWeight] = useState('900');
  const [padding, setPadding] = useState('24px');

  const cssOutput = `.brutal-element {
  background-color: ${bgColor};
  color: ${textColor};
  border: 4px ${borderStyle} var(--brutal-yellow);
  font-weight: ${fontWeight};
  padding: ${padding};
  box-shadow: 6px 6px 0px var(--brutal-yellow);
}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Controls */}
      <div className="space-y-4">
        <div>
          <label
            className="block text-xs font-semibold tracking-[0.1em] uppercase mb-2"
            style={{ color: 'var(--brutal-text-muted)' }}
          >
            Background Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-10 h-10 cursor-pointer"
              style={{ border: 'var(--border-thin)' }}
            />
            <span
              className="font-mono text-xs"
              style={{ color: 'var(--brutal-text-muted)' }}
            >
              {bgColor}
            </span>
          </div>
        </div>

        <div>
          <label
            className="block text-xs font-semibold tracking-[0.1em] uppercase mb-2"
            style={{ color: 'var(--brutal-text-muted)' }}
          >
            Text Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-10 h-10 cursor-pointer"
              style={{ border: 'var(--border-thin)' }}
            />
            <span
              className="font-mono text-xs"
              style={{ color: 'var(--brutal-text-muted)' }}
            >
              {textColor}
            </span>
          </div>
        </div>

        <div>
          <label
            className="block text-xs font-semibold tracking-[0.1em] uppercase mb-2"
            style={{ color: 'var(--brutal-text-muted)' }}
          >
            Border Style
          </label>
          <select
            value={borderStyle}
            onChange={(e) => setBorderStyle(e.target.value)}
            className="w-full max-w-xs px-3 py-2 text-sm font-semibold outline-none cursor-pointer min-h-[44px]"
            style={{
              background: 'var(--brutal-surface)',
              color: 'var(--brutal-border)',
              border: 'var(--border-thin)',
            }}
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
            <option value="double">Double</option>
          </select>
        </div>

        <div>
          <label
            className="block text-xs font-semibold tracking-[0.1em] uppercase mb-2"
            style={{ color: 'var(--brutal-text-muted)' }}
          >
            Font Weight
          </label>
          <select
            value={fontWeight}
            onChange={(e) => setFontWeight(e.target.value)}
            className="w-full max-w-xs px-3 py-2 text-sm font-semibold outline-none cursor-pointer min-h-[44px]"
            style={{
              background: 'var(--brutal-surface)',
              color: 'var(--brutal-border)',
              border: 'var(--border-thin)',
            }}
          >
            <option value="400">400 — Regular</option>
            <option value="600">600 — Semi Bold</option>
            <option value="700">700 — Bold</option>
            <option value="900">900 — Black</option>
          </select>
        </div>

        <div>
          <label
            className="block text-xs font-semibold tracking-[0.1em] uppercase mb-2"
            style={{ color: 'var(--brutal-text-muted)' }}
          >
            Padding
          </label>
          <select
            value={padding}
            onChange={(e) => setPadding(e.target.value)}
            className="w-full max-w-xs px-3 py-2 text-sm font-semibold outline-none cursor-pointer min-h-[44px]"
            style={{
              background: 'var(--brutal-surface)',
              color: 'var(--brutal-border)',
              border: 'var(--border-thin)',
            }}
          >
            <option value="8px">8px — Tight</option>
            <option value="16px">16px — Compact</option>
            <option value="24px">24px — Normal</option>
            <option value="32px">32px — Spacious</option>
            <option value="48px">48px — Generous</option>
          </select>
        </div>
      </div>

      {/* Output */}
      <div className="space-y-4">
        {/* Live preview */}
        <div
          className="flex items-center justify-center min-h-[120px]"
          style={{ background: 'var(--brutal-surface)' }}
        >
          <div
            style={{
              backgroundColor: bgColor,
              color: textColor,
              border: `4px ${borderStyle} var(--brutal-yellow)`,
              fontWeight: Number(fontWeight),
              padding: padding,
              boxShadow: '6px 6px 0px var(--brutal-yellow)',
              textTransform: 'uppercase' as const,
              letterSpacing: '0.05em',
              fontSize: '0.875rem',
            }}
          >
            BRUTAL ELEMENT
          </div>
        </div>

        {/* CSS output */}
        <div
          className="brutal-card p-4 overflow-x-auto"
          style={{ borderLeft: '4px solid var(--brutal-cyan)' }}
        >
          <pre
            className="text-xs font-mono leading-relaxed"
            style={{ color: 'var(--brutal-green)' }}
          >
            {cssOutput}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function InteractiveDemos() {
  const [activeDemo, setActiveDemo] = useState('breakthrough');

  return (
    <div>
      {/* Demo tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {demoTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveDemo(tab.id)}
            className={cn(
              'px-3 py-1.5 text-xs font-semibold tracking-wide uppercase cursor-pointer transition-all duration-150 min-h-[44px] inline-flex items-center interactive-press'
            )}
            style={{
              background:
                activeDemo === tab.id
                  ? 'var(--brutal-yellow)'
                  : 'transparent',
              color:
                activeDemo === tab.id
                  ? 'var(--brutal-void)'
                  : 'var(--brutal-border)',
              border: 'var(--border-thin)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Demo content */}
      <div
        className="brutal-card p-6"
        style={{ minHeight: 300 }}
      >
        {activeDemo === 'breakthrough' && <BreakthroughDemo />}
        {activeDemo === 'powerup' && <PowerupDemo />}
        {activeDemo === 'scaffold' && <ScaffoldDemo />}
        {activeDemo === 'sentient' && <SentientDemo />}
      </div>
    </div>
  );
}
