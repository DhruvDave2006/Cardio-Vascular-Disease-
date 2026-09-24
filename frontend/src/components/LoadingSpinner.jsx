import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({
  message = 'Processing clinical prediction...',
  size = 'md',
}) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 space-y-3 animate-fadeIn">
      <Loader2 className={`${sizes[size] || sizes.md} text-blue-600 animate-spin`} />
      {message && <p className="text-sm font-medium text-slate-600">{message}</p>}
    </div>
  );
}
