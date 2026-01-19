'use client';

import Link from 'next/link';
import UserMenu from '@/components/UserMenu';

export default function AboutPage() {
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
                            <Link href="/community" className="text-gray-700 hover:text-gray-900 text-sm">Community</Link>
                            <Link href="/about" className="text-gray-700 hover:text-gray-900 text-sm font-medium">About</Link>
                        </div>
                        <UserMenu />
                    </div>
                </div>
            </nav>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-6 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">About EventHub</h1>
                    <p className="text-xl text-gray-600">
                        Simplifying event management for creators and communities
                    </p>
                </div>

                {/* Mission */}
                <div className="bg-white rounded-2xl p-12 border border-gray-200 mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
                    <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
                        To empower event organizers with intuitive tools that transform event planning from a complex
                        task into a seamless experience. We believe that creating memorable gatherings should be
                        accessible to everyone, whether you're organizing a small meetup or a large-scale conference.
                    </p>
                </div>

                {/* What We Offer */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Offer</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 border border-gray-200">
                            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Event Creation</h3>
                            <p className="text-gray-600">
                                Create and manage events in minutes with our streamlined interface. Set dates, times,
                                locations, and manage guest lists all in one place.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 border border-gray-200">
                            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Guest Management</h3>
                            <p className="text-gray-600">
                                Invite guests via email, track RSVPs, and communicate with attendees seamlessly.
                                Keep everyone informed with automated notifications.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 border border-gray-200">
                            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Notifications</h3>
                            <p className="text-gray-600">
                                Never miss an important update with customizable reminders via email and Slack.
                                Keep your team and attendees informed automatically.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 border border-gray-200">
                            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Event Analytics</h3>
                            <p className="text-gray-600">
                                Track your events' performance with detailed insights. Understand attendance patterns
                                and improve future events with data-driven decisions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Technology Stack */}
                <div className="bg-white rounded-2xl p-12 border border-gray-200 mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Built with Modern Technology</h2>
                    <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
                        EventHub is built using cutting-edge web technologies to ensure a fast, reliable, and
                        secure experience for all users.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-900 rounded-lg mx-auto mb-3 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">N</span>
                            </div>
                            <p className="font-semibold text-gray-900">Next.js</p>
                            <p className="text-sm text-gray-600">Framework</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">R</span>
                            </div>
                            <p className="font-semibold text-gray-900">React</p>
                            <p className="text-sm text-gray-600">UI Library</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-orange-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">F</span>
                            </div>
                            <p className="font-semibold text-gray-900">Firebase</p>
                            <p className="text-sm text-gray-600">Backend</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-cyan-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">T</span>
                            </div>
                            <p className="font-semibold text-gray-900">Tailwind</p>
                            <p className="text-sm text-gray-600">Styling</p>
                        </div>
                    </div>
                </div>

                {/* Project Context */}
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-12 text-white mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-center">Academic Excellence</h2>
                    <p className="text-center text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
                        This project represents a comprehensive full-stack web development assignment, showcasing
                        modern web technologies, authentication systems, real-time database management, and
                        responsive UI/UX design principles. Built as part of an advanced web development
                        curriculum to demonstrate practical application of industry-standard tools and best practices.
                    </p>
                </div>

                {/* Get Started */}
                <div className="text-center bg-white rounded-2xl p-12 border border-gray-200">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Creating Today</h2>
                    <p className="text-gray-600 mb-6 text-lg">
                        Join our growing community of event organizers and bring your ideas to life
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link
                            href="/"
                            className="px-8 py-4 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors"
                        >
                            Create an Event
                        </Link>
                        <Link
                            href="/events"
                            className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transition-colors"
                        >
                            Browse Events
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
