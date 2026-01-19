'use client';

import Link from 'next/link';
import UserMenu from '@/components/UserMenu';

export default function CommunityPage() {
    return (
        <div className="min-h-screen" style={{ background: '#f0f4f3' }}>
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-serif italic text-gray-900">
                        1.ook
                    </Link>
                    <div className="flex items-center gap-8">
                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/events" className="text-gray-700 hover:text-gray-900 text-sm">Browse Events</Link>
                            <Link href="/" className="text-gray-700 hover:text-gray-900 text-sm">Create an Event</Link>
                            <Link href="/community" className="text-gray-700 hover:text-gray-900 text-sm font-medium">Community</Link>
                            <Link href="/about" className="text-gray-700 hover:text-gray-900 text-sm">About</Link>
                        </div>
                        <UserMenu />
                    </div>
                </div>
            </nav>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-6 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Join Our Community</h1>
                    <p className="text-xl text-gray-600">
                        Connect with event organizers and attendees from around the world
                    </p>
                </div>

                {/* Community Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white rounded-2xl p-8 text-center border border-gray-200">
                        <div className="text-4xl font-bold text-teal-500 mb-2">3,193+</div>
                        <div className="text-gray-600">Events Hosted</div>
                    </div>
                    <div className="bg-white rounded-2xl p-8 text-center border border-gray-200">
                        <div className="text-4xl font-bold text-teal-500 mb-2">100+</div>
                        <div className="text-gray-600">Active Organizers</div>
                    </div>
                    <div className="bg-white rounded-2xl p-8 text-center border border-gray-200">
                        <div className="text-4xl font-bold text-teal-500 mb-2">50+</div>
                        <div className="text-gray-600">Countries Worldwide</div>
                    </div>
                </div>

                {/* Community Features */}
                <div className="space-y-12">
                    <div className="bg-white rounded-2xl p-8 border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Organizers Network</h2>
                        <p className="text-gray-600 mb-6">
                            Connect with fellow event creators, share best practices, and collaborate on amazing experiences.
                            Our platform brings together organizers from various backgrounds - from small local gatherings to
                            large-scale conferences.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-teal-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700">Share event management tips and tricks</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-teal-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700">Discover venue recommendations and vendor contacts</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-teal-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700">Collaborate on cross-promotional opportunities</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl p-8 border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Knowledge Hub</h2>
                        <p className="text-gray-600 mb-6">
                            Access a wealth of resources to improve your event planning skills. From beginner guides to
                            advanced strategies, our community-driven knowledge base has everything you need to create
                            successful events.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold text-gray-900 mb-2">Event Planning Guides</h3>
                                <p className="text-sm text-gray-600">Step-by-step tutorials for various event types</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold text-gray-900 mb-2">Marketing Templates</h3>
                                <p className="text-sm text-gray-600">Pre-designed materials for event promotion</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold text-gray-900 mb-2">Budget Calculators</h3>
                                <p className="text-sm text-gray-600">Tools to estimate and manage event costs</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold text-gray-900 mb-2">Success Stories</h3>
                                <p className="text-sm text-gray-600">Learn from real event case studies</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-8 border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Guidelines</h2>
                        <p className="text-gray-600 mb-6">
                            To maintain a welcoming and professional environment, we ask all community members to follow
                            these guidelines:
                        </p>
                        <ul className="space-y-3 text-gray-700">
                            <li>• Respect diverse perspectives and event types</li>
                            <li>• Share constructive feedback and support</li>
                            <li>• Protect confidential event information</li>
                            <li>• Give credit when sharing others' ideas</li>
                            <li>• Report any inappropriate behavior to moderators</li>
                        </ul>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 text-center bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-12 text-white">
                    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-lg mb-6 opacity-90">
                        Join thousands of event organizers making memorable experiences
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-8 py-4 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Create Your First Event
                    </Link>
                </div>
            </div>
        </div>
    );
}
