import React from 'react';

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options = [],
  error = '',
  required = true,
  placeholder = 'Select an option',
  className = '',
  ...props
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex justify-between items-center">
        <label htmlFor={name} className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      </div>

      <div className="relative rounded-xl shadow-xs">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 transition-all duration-150 focus:outline-none focus:ring-2 appearance-none bg-white cursor-pointer ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50/20'
              : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100 hover:border-slate-400'
          }`}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => {
            const optVal = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={optVal} value={optVal}>
                {optLabel}
              </option>
            );
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>

      {error && (
        <p className="text-xs font-medium text-red-600 flex items-center gap-1 animate-fadeIn">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
}
