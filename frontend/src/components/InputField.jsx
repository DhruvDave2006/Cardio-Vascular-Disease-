import React from 'react';

export default function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  unit = '',
  error = '',
  required = true,
  min,
  max,
  step,
  className = '',
  ...props
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex justify-between items-center">
        <label htmlFor={name} className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {unit && (
          <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
            {unit}
          </span>
        )}
      </div>

      <div className="relative rounded-xl shadow-xs">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-150 focus:outline-none focus:ring-2 ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50/20'
              : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100 bg-white hover:border-slate-400'
          }`}
          {...props}
        />
      </div>

      {error && (
        <p className="text-xs font-medium text-red-600 flex items-center gap-1 animate-fadeIn">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
}
