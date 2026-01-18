'use client';

export default function Textarea({
    label,
    placeholder,
    value,
    onChange,
    name,
    required = false,
    disabled = false,
    error,
    rows = 4,
    className = '',
    ...props
}) {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-300 mb-2"
                >
                    {label}
                    {required && <span className="text-pink-500 ml-1">*</span>}
                </label>
            )}
            <textarea
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                rows={rows}
                className={`
          w-full px-4 py-3 rounded-xl
          bg-[#1a1a24] border border-[#2a2a3a]
          text-white placeholder-gray-500
          transition-all duration-300
          hover:border-indigo-500/50
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
          disabled:opacity-50 disabled:cursor-not-allowed
          resize-none
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
        `}
                {...props}
            />
            {error && (
                <p className="mt-2 text-sm text-red-400">{error}</p>
            )}
        </div>
    );
}
