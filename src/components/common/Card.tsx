import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  headerIcon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  action,
  headerIcon,
}) => {
  return (
    <div
      className={`bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-md transition-all ${className}`}
    >
      {(title || subtitle || action || headerIcon) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            {headerIcon && <div className="text-indigo-400 shrink-0">{headerIcon}</div>}
            <div>
              {title && <h3 className="text-base font-semibold text-slate-100">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
            </div>
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};
