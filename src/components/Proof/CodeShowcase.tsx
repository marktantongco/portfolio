import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';
import { codeTabs } from '@/lib/data';

export default function CodeShowcase() {
  const [activeTab, setActiveTab] = useState(codeTabs[0].id);
  const [copied, setCopied] = useState(false);

  const active = codeTabs.find((t) => t.id === activeTab) || codeTabs[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(active.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex gap-2 mb-4">
        {codeTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-3 py-2 text-xs font-bold uppercase min-h-[44px]"
            style={{
              background: activeTab === tab.id ? 'var(--brutal-cyan)' : 'var(--brutal-void)',
              color: activeTab === tab.id ? 'var(--brutal-void)' : 'var(--brutal-text-muted)',
              border: 'var(--border-thin)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code block */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative"
        >
          <div className="relative" style={{ background: 'var(--brutal-void)', border: 'var(--border-thin)' }}>
            <Highlight theme={themes.nightOwl} code={active.code.trim()} language={active.language}>
              {({ style, tokens, getLineProps, getTokenProps }) => (
                <pre className="p-4 overflow-x-auto text-xs md:text-sm" style={{ ...style, background: 'transparent' }}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })} className="flex">
                      <span className="select-none inline-block w-8 text-right mr-4" style={{ color: 'var(--brutal-text-muted)' }}>
                        {i + 1}
                      </span>
                      <span>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-2"
              style={{ background: 'var(--brutal-surface)', border: 'var(--border-thin)' }}
              aria-label="Copy code to clipboard"
            >
              {copied ? <Check size={16} style={{ color: 'var(--brutal-green)' }} /> : <Copy size={16} />}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
