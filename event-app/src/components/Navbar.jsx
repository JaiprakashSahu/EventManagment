'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const pathname = usePathname();
    const { user, signOut, loading } = useAuth();

    const handleSignOut = async () => {
        await signOut();
    };

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
                    {/* Main nav links - only show when authenticated */}
                    {user && (
                        <>
                            <Link
                                href="/"
                                className={`
                  relative px-3 py-2 sm:px-4 rounded-lg text-sm sm:text-base font-medium
                  transition-all duration-300 ease-out
                  ${pathname === '/'
                                        ? 'text-white bg-indigo-500/20 shadow-lg shadow-indigo-500/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }
                `}
                            >
                                Create Event
                                {pathname === '/' && (
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                                )}
                            </Link>
                            <Link
                                href="/events"
                                className={`
                  relative px-3 py-2 sm:px-4 rounded-lg text-sm sm:text-base font-medium
                  transition-all duration-300 ease-out
                  ${pathname === '/events'
                                        ? 'text-white bg-indigo-500/20 shadow-lg shadow-indigo-500/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }
                `}
                            >
                                Events
                                {pathname === '/events' && (
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                                )}
                            </Link>
                        </>
                    )}

                    {/* Auth section */}
                    {!loading && (
                        <>
                            {user ? (
                                <div className="flex items-center gap-3">
                                    {/* User avatar */}
                                    <div className="hidden sm:flex items-center gap-2">
                                        {user.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt={user.displayName || 'User'}
                                                className="w-8 h-8 rounded-full border-2 border-indigo-500/50"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                                                {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                                            </div>
                                        )}
                                        <span className="text-sm text-gray-300 max-w-[100px] truncate">
                                            {user.displayName || user.email}
                                        </span>
                                    </div>

                                    {/* Sign out button */}
                                    <button
                                        onClick={handleSignOut}
                                        className="px-3 py-2 sm:px-4 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className={`
                    relative px-3 py-2 sm:px-4 rounded-lg text-sm sm:text-base font-medium
                    transition-all duration-300 ease-out
                    ${pathname === '/login'
                                            ? 'text-white bg-indigo-500/20 shadow-lg shadow-indigo-500/20'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }
                  `}
                                >
                                    Sign In
                                    {pathname === '/login' && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                                    )}
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
