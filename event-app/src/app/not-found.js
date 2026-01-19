'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#f0f4f3' }}>
            <div className="text-center max-w-2xl">
                {/* 404 Number */}
                <h1 className="text-9xl font-bold text-gray-900 mb-4">404</h1>
                
                {/* Error Message */}
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
                <p className="text-lg text-gray-600 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Navigation Links */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors"
                    >
                        Go Home
                    </Link>
                    <Link
                        href="/events"
                        className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transition-colors"
                    >
                        Browse Events
                    </Link>
                </div>
            </div>
        </div>
    );
}

