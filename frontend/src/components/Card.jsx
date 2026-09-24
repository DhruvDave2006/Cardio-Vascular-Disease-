import React from 'react';

export default function Card({
  children,
  className = '',
  hoverEffect = false,
  padding = 'p-6 sm:p-8',
  ...props
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/90 shadow-sm ${
        hoverEffect ? 'transition-card' : ''
      } ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
