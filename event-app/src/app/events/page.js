'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getUserEvents } from '@/lib/eventService';
import EventCard from '@/components/EventCard';

export default function EventsPage() {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchEvents() {
            if (!user) return;

            setIsLoading(true);
            const result = await getUserEvents(user.uid);

            if (result.success) {
                setEvents(result.events);
            } else {
                setError(result.error || 'Failed to load events');
            }
            setIsLoading(false);
        }

        fetchEvents();
    }, [user]);

    return (
        <div className="min-h-screen" style={{ background: '#1a1f2e' }}>
            {/* Top Navigation Bar */}
            <nav className="border-b border-gray-800">
                <div className="container-custom max-w-7xl px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex flex-col leading-tight">
                            <span className="text-2xl font-bold text-red-500">events</span>
                            <span className="text-2xl font-bold text-red-500">in minutes</span>
                        </Link>

                        {/* Navigation Links */}
                        <div className="hidden lg:flex items-center gap-8">
                            <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
                                Find events
                            </Link>
                            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                                Create events
                            </Link>
                            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                                List your service
                            </Link>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-4">
                            {/* Dark Mode Toggle */}
                            <button className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            </button>

                            {/* Sign In Button */}
                            {user ? (
                                <div className="px-4 py-2 rounded-lg border border-gray-600 text-white text-sm">
                                    {user.displayName || user.email}
                                </div>
                            ) : (
                                <Link href="/login">
                                    <button className="px-6 py-2 rounded-lg border border-gray-600 text-white hover:bg-gray-800 transition-colors text-sm">
                                        <span className="flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Sign in
                                        </span>
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Search and Filters Section */}
            <div className="border-b border-gray-800" style={{ background: '#141824' }}>
                <div className="container-custom max-w-7xl px-4 py-6">
                    {/* Event Type Toggle */}
                    <div className="flex items-center gap-4 mb-6">
                        <button className="px-6 py-2.5 rounded-full bg-green-500 text-white font-medium hover:bg-green-600 transition-colors">
                            Corporate Event
                        </button>
                        <button className="px-6 py-2.5 rounded-full bg-gray-700 text-gray-300 font-medium hover:bg-gray-600 transition-colors">
                            Personal Event
                        </button>
                    </div>

                    {/* Filters Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                        {/* Search Bar */}
                        <div className="lg:col-span-4 relative">
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search by Artist, Events"
                                className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
                            />
                        </div>

                        {/* Location */}
                        <div className="lg:col-span-2 relative">
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <select className="w-full pl-12 pr-10 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white appearance-none focus:outline-none focus:border-gray-600">
                                <option>Location</option>
                                <option>New York</option>
                                <option>Los Angeles</option>
                                <option>Online</option>
                            </select>
                        </div>

                        {/* Activity Dropdown */}
                        <select className="lg:col-span-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 appearance-none focus:outline-none focus:border-gray-600">
                            <option>Activity</option>
                        </select>

                        {/* Date Dropdown */}
                        <select className="lg:col-span-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 appearance-none focus:outline-none focus:border-gray-600">
                            <option>Date</option>
                        </select>

                        {/* Budget Dropdown */}
                        <select className="lg:col-span-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 appearance-none focus:outline-none focus:border-gray-600">
                            <option>Budget</option>
                        </select>

                        {/* Duration Dropdown */}
                        <select className="lg:col-span-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 appearance-none focus:outline-none focus:border-gray-600">
                            <option>Duration</option>
                        </select>

                        {/* Group Size Dropdown */}
                        <select className="lg:col-span-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 appearance-none focus:outline-none focus:border-gray-600">
                            <option>Group Size</option>
                        </select>

                        {/* Search Button */}
                        <button className="lg:col-span-1 px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative overflow-hidden" style={{ background: '#1a1f2e' }}>
                <div className="container-custom max-w-7xl px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Left Content */}
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                Plan your next<br />
                                event in a minute
                            </h1>
                            <p className="text-gray-400 text-lg mb-8">
                                Curated Vendors, Exceptional Events, Effortless Booking
                            </p>

                            {/* Navigation Arrows */}
                            <div className="flex gap-4 mb-12">
                                <button className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Partner Logos */}
                            <div className="flex items-center gap-8 opacity-40">
                                <span className="text-white text-xl font-semibold">Meta</span>
                                <span className="text-white text-xl font-semibold">LinkedIn</span>
                                <span className="text-white text-xl font-semibold">Uber</span>
                                <span className="text-white text-xl font-semibold">Google</span>
                            </div>
                        </div>

                        {/* Right Hero Image */}
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop"
                                alt="Event celebration"
                                className="rounded-2xl w-full h-auto shadow-2xl"
                                onError={(e) => {
                                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect fill="%23667eea" width="600" height="400"/%3E%3C/svg%3E';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container-custom max-w-7xl px-4 py-12">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <svg className="animate-spin w-12 h-12 text-red-600 mb-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <p className="text-gray-400">Loading events...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <h3 className="text-xl font-bold text-white mb-2">Error Loading Events</h3>
                        <p className="text-gray-400 mb-6">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : events.length === 0 ? (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-bold text-white mb-3">No events yet</h3>
                        <p className="text-gray-400 mb-8">Create your first event to get started</p>
                        <Link href="/">
                            <button className="px-8 py-4 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors">
                                Create Your First Event
                            </button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Spotlight Events</h2>
                            <p className="text-gray-400">Your created events</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {events.map((event, index) => (
                                <EventCard key={event.id} event={event} index={index} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
