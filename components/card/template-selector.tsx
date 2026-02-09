'use client';

interface TemplateSelectorProps {
  value: string;
  onChange: (template: 'neon-cyber' | 'clean-minimal' | 'valorant-classic') => void;
}

const templates = [
  {
    id: 'neon-cyber' as const,
    name: 'Neon Cyber',
    description: 'Neon/cyberpunk style',
    preview: 'linear-gradient(135deg, #0a0a1a, #1a0a2e)',
    accent: '#00ffff',
  },
  {
    id: 'clean-minimal' as const,
    name: 'Clean Minimal',
    description: 'Clean minimal style',
    preview: 'linear-gradient(135deg, #0f0f0f, #1a1a1a)',
    accent: '#ffffff',
  },
  {
    id: 'valorant-classic' as const,
    name: 'Valorant Classic',
    description: 'Official Valorant feel',
    preview: 'linear-gradient(135deg, #111111, #1a1a2e)',
    accent: '#FF4655',
  },
];

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  return (
    <div className="flex gap-3">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`flex-1 p-3 rounded-lg border transition-all duration-200 text-left ${
            value === t.id
              ? 'border-[#FF4655] bg-[#FF4655]/5'
              : 'border-white/10 bg-white/5 hover:border-white/20'
          }`}
        >
          <div
            className="w-full h-8 rounded mb-2"
            style={{ background: t.preview }}
          />
          <div className="text-sm font-semibold text-white">{t.name}</div>
          <div className="text-xs text-gray-500">{t.description}</div>
        </button>
      ))}
    </div>
  );
}
