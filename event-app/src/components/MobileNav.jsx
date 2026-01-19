'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
            >
                <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
                    <div className="flex flex-col p-4 space-y-3">
                        <Link
                            href="/events"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors font-medium"
                        >
                            📋 Browse Events
                        </Link>
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors font-medium"
                        >
                            ✨ Create an Event
                        </Link>
                        <Link
                            href="/community"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors font-medium"
                        >
                            👥 Community
                        </Link>
                        <Link
                            href="/about"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors font-medium"
                        >
                            ℹ️ About
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
