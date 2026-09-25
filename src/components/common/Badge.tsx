import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'amber' | 'cyan' | 'violet' | 'rose' | 'slate' | 'indigo';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles = {
  emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  amber: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  cyan: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  violet: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  rose: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  slate: 'bg-slate-800 text-slate-300 border-slate-700',
  indigo: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'slate',
  size = 'sm',
  className = '',
}) => {
  const sizeStyle = size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border transition-colors ${variantStyles[variant]} ${sizeStyle} ${className}`}
    >
      {children}
    </span>
  );
};
