'use client';

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    onClick,
    type = 'button',
    icon,
    className = ''
}) {
    const baseStyles = `
    relative inline-flex items-center justify-center gap-2
    font-semibold rounded-xl
    transition-all duration-300 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f0f14]
  `;

    const variants = {
        primary: `
      bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
      text-white hover:shadow-lg hover:shadow-purple-500/30
      hover:scale-[1.02] active:scale-[0.98]
      focus:ring-purple-500
    `,
        secondary: `
      bg-white/5 border border-white/10
      text-white hover:bg-white/10 hover:border-white/20
      hover:shadow-lg hover:shadow-white/5
      focus:ring-white/50
    `,
        google: `
      bg-white text-gray-800
      hover:bg-gray-100 hover:shadow-lg
      hover:scale-[1.02] active:scale-[0.98]
      focus:ring-gray-300
    `,
        ghost: `
      bg-transparent text-gray-400
      hover:text-white hover:bg-white/5
      focus:ring-white/30
    `,
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
        >
            {icon && <span className="w-5 h-5">{icon}</span>}
            {children}
        </button>
    );
}
