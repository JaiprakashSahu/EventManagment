'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const { signInWithGoogle } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const result = await signInWithGoogle();

        if (!result.success) {
            setError(result.error || 'Failed to sign in. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{ background: '#7e7a9a' }}>
            {/* Main Container Card */}
            <div
                className="w-full max-w-5xl rounded-3xl overflow-hidden flex flex-col lg:flex-row animate-fade-in-up"
                style={{
                    background: '#2f2e47',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
            >
                {/* Left Panel - Image Section */}
                <div className="relative lg:w-1/2 min-h-[300px] lg:min-h-[600px] p-6 flex flex-col">
                    {/* Background Image Container */}
                    <div
                        className="absolute inset-4 rounded-2xl overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                        }}
                    >
                        {/* Overlay gradient for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Decorative elements */}
                        <div className="absolute inset-0 opacity-30">
                            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-500/40 blur-3xl" />
                            <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-indigo-500/40 blur-3xl" />
                        </div>

                        {/* Mountain/Desert silhouette effect */}
                        <svg
                            className="absolute bottom-0 left-0 right-0 w-full h-1/2"
                            viewBox="0 0 1440 320"
                            preserveAspectRatio="none"
                        >
                            <path
                                fill="rgba(20, 20, 30, 0.8)"
                                d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,224C840,245,960,267,1080,261.3C1200,256,1320,224,1380,208L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                            />
                            <path
                                fill="rgba(30, 30, 45, 0.9)"
                                d="M0,288L48,277.3C96,267,192,245,288,234.7C384,224,480,224,576,234.7C672,245,768,267,864,272C960,277,1056,267,1152,250.7C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            />
                        </svg>
                    </div>

                    {/* Content overlay */}
                    <div className="relative z-10 flex flex-col h-full justify-end p-4 pb-12">
                        {/* Tagline */}
                        <div>
                            <h2 className="text-white text-3xl sm:text-4xl font-semibold text-center leading-tight">
                                Create events.<br />
                                Manage with ease.
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Sign In Section */}
                <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                            Welcome to EventHub
                        </h1>
                        <p className="text-gray-400 text-base">
                            Sign in with your Google account to create and manage your events
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl flex items-center gap-3" style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                            <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-red-400 text-sm">{error}</span>
                        </div>
                    )}

                    {/* Google Sign-In Button */}
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        }}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                <span>Signing in...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span>Sign in with Google</span>
                            </>
                        )}
                    </button>

                    {/* Info text */}
                    <p className="text-center text-gray-500 text-xs mt-6">
                        By signing in, you agree to our{' '}
                        <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors underline">
                            Terms & Conditions
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
