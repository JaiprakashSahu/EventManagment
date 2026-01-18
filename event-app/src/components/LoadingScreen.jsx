'use client';

import { useAuth } from '@/context/AuthContext';

export default function LoadingScreen() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f0f14]">
            <div className="text-center">
                {/* Animated Logo */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-purple-500/30 animate-pulse">
                    E
                </div>

                {/* Loading spinner */}
                <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5 text-indigo-500" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span className="text-gray-400">Loading...</span>
                </div>
            </div>
        </div>
    );
}

export function AuthGuard({ children }) {
    const { loading } = useAuth();

    if (loading) {
        return <LoadingScreen />;
    }

    return children;
}
