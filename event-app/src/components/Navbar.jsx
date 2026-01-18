'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const navLinks = [
        { href: '/', label: 'Create Event' },
        { href: '/events', label: 'Events' },
        { href: '/login', label: 'Sign In' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
            <div className="container-custom flex items-center justify-between h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform duration-300">
                        E
                    </div>
                    <span className="text-xl font-bold gradient-text hidden sm:block">
                        EventHub
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`
                  relative px-3 py-2 sm:px-4 rounded-lg text-sm sm:text-base font-medium
                  transition-all duration-300 ease-out
                  ${isActive
                                        ? 'text-white bg-indigo-500/20 shadow-lg shadow-indigo-500/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }
                `}
                            >
                                {link.label}
                                {isActive && (
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
