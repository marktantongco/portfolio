import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, GripVertical } from 'lucide-react';
import { demoConfigs, cinematicModes, promptTemplates } from '@/lib/data';

const tabs = demoConfigs;

// ─── BREAKTHROUGH: Cinematic Vision Analyzer ───
function BreakthroughDemo() {
  const [activeMode, setActiveMode] = useState(cinematicModes[0]);

  return (
    <div className="space-y-4">
      <h3 className="subheading-h3" style={{ color: 'var(--brutal-magenta)' }}>
        Cinematic Vision Analyzer
      </h3>

      {/* Mode selector */}
      <div className="flex flex-wrap gap-2">
        {cinematicModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode)}
            className="px-3 py-2 text-xs font-bold uppercase transition-all min-h-[44px]"
            style={{
              background: activeMode.id === mode.id ? 'var(--brutal-magenta)' : 'var(--brutal-void)',
              color: activeMode.id === mode.id ? 'var(--brutal-void)' : 'var(--brutal-text-muted)',
              border: 'var(--border-thin)',
            }}
          >
            {mode.name}
          </button>
        ))}
      </div>

      {/* Gradient preview */}
      <div
        className="h-24 w-full"
        style={{ background: activeMode.gradient, border: 'var(--border-thin)' }}
        role="img"
        aria-label={`${activeMode.name} color grading preview`}
      />

      {/* Specs panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {activeMode.specs.map((spec) => (
          <div key={spec.label} className="p-3" style={{ background: 'var(--brutal-void)', border: 'var(--border-thin)' }}>
            <span className="label-text block mb-1" style={{ color: 'var(--brutal-text-muted)' }}>
              {spec.label}
            </span>
            <span className="text-lg font-bold" style={{ color: 'var(--brutal-magenta)' }}>
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── POWERUP: AI Prompt Builder ───
function PowerUpDemo() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(() => {
    if (!prompt.trim()) return;
    setLoading(true);
    setOutput('');
    setTimeout(() => {
      const sampleOutputs = [
        `[System Analysis Complete]\n\nPrompt Score: 94/100\nComplexity: Advanced\nEstimated Tokens: 847\n\nOptimized Prompt:\n"${prompt.trim()}, with emphasis on precision, clarity, and actionable output structure. Maintain brand voice consistency throughout."]\n\nRecommendations:\n- Add specificity constraints for better output control\n- Consider few-shot examples for consistency\n- Temperature 0.7 recommended for this use case`,
        `[Generation Pipeline Ready]\n\nInput Quality: Excellent\nOutput Type: Creative / Strategic\nEstimated Latency: 1.2s\n\nRefined Output:\n"Based on your input, I recommend a multi-pass approach:\n1. First pass: Broad creative exploration\n2. Second pass: Constraint-based refinement\n3. Third pass: Brand alignment verification\n\n${prompt.trim()}"\n\nConfidence: 96%`,
      ];
      setOutput(sampleOutputs[Math.floor(Math.random() * sampleOutputs.length)]);
      setLoading(false);
    }, 2000);
  }, [prompt]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <h3 className="subheading-h3" style={{ color: 'var(--brutal-cyan)' }}>
        AI Prompt Builder
      </h3>

      {/* Template buttons */}
      <div className="flex flex-wrap gap-2">
        {promptTemplates.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => setPrompt(tpl.template)}
            className="px-3 py-1.5 text-xs font-bold uppercase min-h-[44px]"
            style={{ background: 'var(--brutal-void)', border: 'var(--border-thin)', color: 'var(--brutal-text-muted)' }}
          >
            {tpl.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt or select a template above..."
        rows={4}
        className="w-full p-3 text-sm resize-none"
        style={{ background: 'var(--brutal-void)', border: 'var(--border-thin)', color: 'var(--brutal-border)' }}
      />

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="brutal-btn text-xs px-6 py-2 disabled:opacity-50"
      >
        {loading ? 'GENERATING...' : 'GENERATE'}
      </button>

      {/* Output */}
      <AnimatePresence>
        {(output || loading) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative"
          >
            <div
              className="p-4 text-sm font-mono whitespace-pre-wrap min-h-[200px]"
              style={{ background: 'var(--brutal-void)', border: 'var(--border-thin)', color: 'var(--brutal-green)' }}
            >
              {loading ? (
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Processing prompt parameters...
                </motion.span>
              ) : (
                output
              )}
            </div>
            {!loading && output && (
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2"
                style={{ background: 'var(--brutal-surface)', border: 'var(--border-thin)' }}
                aria-label="Copy output to clipboard"
              >
                {copied ? <Check size={16} style={{ color: 'var(--brutal-green)' }} /> : <Copy size={16} />}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── SCAFFOLD: Physics-First Builder ───
function ScaffoldDemo() {
  const allConstraints = [
    'Temperature', 'Top-P', 'Frequency Penalty', 'Max Tokens',
    'Presence Penalty', 'Stop Sequences', 'System Prompt', 'Output Schema',
  ];
  const [available, setAvailable] = useState(allConstraints);
  const [active, setActive] = useState<string[]>([]);

  const confidence = Math.min(100, Math.round((active.length / allConstraints.length) * 100));
  const confidenceColor = confidence < 40 ? 'var(--brutal-red)' : confidence < 70 ? 'var(--brutal-yellow)' : 'var(--brutal-green)';

  const handleDrag = (constraint: string) => {
    if (available.includes(constraint)) {
      setAvailable(available.filter((c) => c !== constraint));
      setActive([...active, constraint]);
    } else {
      setActive(active.filter((c) => c !== constraint));
      setAvailable([...available, constraint]);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="subheading-h3" style={{ color: 'var(--brutal-lime)' }}>
        Physics-First Builder
      </h3>

      {/* Confidence score */}
      <div className="flex items-center gap-4">
        <span className="label-text" style={{ color: 'var(--brutal-text-muted)' }}>CONFIDENCE</span>
        <div className="flex-1 h-4 relative" style={{ background: 'var(--brutal-void)', border: 'var(--border-thin)' }}>
          <motion.div
            className="h-full"
            style={{ background: confidenceColor }}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 0.5 }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color: 'var(--brutal-void)' }}>
            {confidence}%
          </span>
        </div>
      </div>

      {/* Available constraints */}
      <div>
        <span className="label-text block mb-2" style={{ color: 'var(--brutal-text-muted)' }}>AVAILABLE CONSTRAINTS</span>
        <div className="flex flex-wrap gap-2 min-h-[60px] p-3" style={{ background: 'var(--brutal-void)', border: 'var(--border-thin)' }}>
          {available.map((c) => (
            <button
              key={c}
              onClick={() => handleDrag(c)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold cursor-grab active:cursor-grabbing min-h-[44px]"
              style={{ background: 'var(--brutal-surface)', border: 'var(--border-thin)', color: 'var(--brutal-border)' }}
            >
              <GripVertical size={12} style={{ color: 'var(--brutal-text-muted)' }} />
              {c}
            </button>
          ))}
          {available.length === 0 && (
            <span className="text-xs" style={{ color: 'var(--brutal-text-muted)' }}>All constraints activated</span>
          )}
        </div>
      </div>

      {/* Active constraints */}
      <div>
        <span className="label-text block mb-2" style={{ color: 'var(--brutal-green)' }}>ACTIVE CONSTRAINTS</span>
        <div className="flex flex-wrap gap-2 min-h-[60px] p-3" style={{ background: 'var(--brutal-surface)', border: 'var(--border-thin)' }}>
          {active.map((c) => (
            <button
              key={c}
              onClick={() => handleDrag(c)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold cursor-grab active:cursor-grabbing min-h-[44px]"
              style={{ background: 'var(--brutal-void)', border: '1px solid var(--brutal-green)', color: 'var(--brutal-green)' }}
            >
              <GripVertical size={12} />
              {c}
            </button>
          ))}
          {active.length === 0 && (
            <span className="text-xs" style={{ color: 'var(--brutal-text-muted)' }}>Click constraints above to activate</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SENTIENT: Design Token System ───
function SentientDemo() {
  const [color, setColor] = useState('var(--brutal-yellow)');
  const [spacing, setSpacing] = useState('8');
  const [fontSize, setFontSize] = useState('16');
  const [borderWidth, setBorderWidth] = useState('2');

  const cssOutput = `:root {
  --color-primary: ${color};
  --spacing-base: ${spacing}px;
  --font-size-base: ${fontSize}px;
  --border-width: ${borderWidth}px;
}`;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <h3 className="subheading-h3" style={{ color: 'var(--brutal-gold)' }}>
        Design Token System
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Color picker */}
        <div>
          <label className="label-text block mb-1" style={{ color: 'var(--brutal-text-muted)' }}>COLOR</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10 cursor-pointer"
              style={{ border: 'var(--border-thin)', background: 'none' }}
              aria-label="Select color"
            />
            <span className="text-xs font-mono" style={{ color: 'var(--brutal-text-muted)' }}>{color}</span>
          </div>
        </div>

        {/* Spacing */}
        <div>
          <label className="label-text block mb-1" style={{ color: 'var(--brutal-text-muted)' }}>SPACING</label>
          <select
            value={spacing}
            onChange={(e) => setSpacing(e.target.value)}
            className="w-full p-2 text-xs"
            style={{ background: 'var(--brutal-void)', border: 'var(--border-thin)', color: 'var(--brutal-border)' }}
          >
            <option value="4">4px</option>
            <option value="8">8px</option>
            <option value="12">12px</option>
            <option value="16">16px</option>
          </select>
        </div>

        {/* Font size */}
        <div>
          <label className="label-text block mb-1" style={{ color: 'var(--brutal-text-muted)' }}>TYPOGRAPHY</label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="w-full p-2 text-xs"
            style={{ background: 'var(--brutal-void)', border: 'var(--border-thin)', color: 'var(--brutal-border)' }}
          >
            <option value="12">12px</option>
            <option value="14">14px</option>
            <option value="16">16px</option>
            <option value="18">18px</option>
          </select>
        </div>

        {/* Border width */}
        <div>
          <label className="label-text block mb-1" style={{ color: 'var(--brutal-text-muted)' }}>BORDER</label>
          <select
            value={borderWidth}
            onChange={(e) => setBorderWidth(e.target.value)}
            className="w-full p-2 text-xs"
            style={{ background: 'var(--brutal-void)', border: 'var(--border-thin)', color: 'var(--brutal-border)' }}
          >
            <option value="2">2px</option>
            <option value="4">4px</option>
          </select>
        </div>
      </div>

      {/* CSS Output */}
      <div className="relative">
        <pre
          className="p-4 text-sm font-mono overflow-x-auto"
          style={{ background: 'var(--brutal-void)', border: 'var(--border-thin)', color: 'var(--brutal-green)' }}
        >
          <code>{cssOutput}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2"
          style={{ background: 'var(--brutal-surface)', border: 'var(--border-thin)' }}
          aria-label="Copy CSS to clipboard"
        >
          {copied ? <Check size={16} style={{ color: 'var(--brutal-green)' }} /> : <Copy size={16} />}
        </button>
      </div>

      {/* Live preview */}
      <div
        className="p-4"
        style={{
          background: 'var(--brutal-void)',
          border: `${borderWidth}px solid ${color}`,
          padding: `${spacing}px`,
          fontSize: `${fontSize}px`,
        }}
      >
        <p style={{ color }}>Sample text with your design tokens applied.</p>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───
export default function InteractiveDemos() {
  const [activeDemo, setActiveDemo] = useState(tabs[0].id);

  return (
    <div>
      {/* Demo tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveDemo(tab.id)}
            className="px-3 py-2 text-xs font-bold uppercase min-h-[44px]"
            style={{
              background: activeDemo === tab.id ? tab.accent : 'var(--brutal-void)',
              color: activeDemo === tab.id ? 'var(--brutal-void)' : 'var(--brutal-text-muted)',
              border: 'var(--border-thin)',
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Demo content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          className="p-6 min-h-[350px]"
          style={{ background: 'var(--brutal-surface)', border: 'var(--border-thin)' }}
        >
          {activeDemo === 'breakthrough' && <BreakthroughDemo />}
          {activeDemo === 'powerup' && <PowerUpDemo />}
          {activeDemo === 'scaffold' && <ScaffoldDemo />}
          {activeDemo === 'sentient' && <SentientDemo />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
