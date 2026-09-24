import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from './Button';

export default function ErrorMessage({
  title = 'Service Notice',
  message = 'An error occurred while communicating with the service.',
  onRetry = null,
}) {
  return (
    <div className="p-5 rounded-2xl bg-red-50/90 border border-red-200 text-red-900 shadow-sm animate-fadeIn">
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="text-sm font-bold text-red-900">{title}</h4>
          <p className="text-xs text-red-700 mt-1 leading-relaxed">{message}</p>
          {onRetry && (
            <div className="mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="bg-white hover:bg-red-50 text-red-700 border-red-300"
                icon={RefreshCw}
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
