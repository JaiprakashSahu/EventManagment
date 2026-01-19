'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getUserEvents } from '@/lib/eventService';
import { getUserStats, formatEventDate, formatMemberDate } from '@/lib/statsService';
import UserMenu from '@/components/UserMenu';
import StatsCard from '@/components/StatsCard';
import MobileNav from '@/components/MobileNav';

export default function EventsPage() {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');

    // Stats state
    const [stats, setStats] = useState({
        totalEvents: 0,
        eventsThisMonth: 0,
        latestEventDate: null,
        memberSince: null
    });
    const [statsLoading, setStatsLoading] = useState(true);

    const filters = ['All', 'Upcoming', 'Completed', 'Draft'];

    // Get filtered events based on selected filter
    const getFilteredEvents = () => {
        if (activeFilter === 'All') {
            return events;
        }

        const now = new Date();

        return events.filter(event => {
            if (activeFilter === 'Upcoming') {
                // Events with future dates
                if (!event.date) return false;
                const eventDate = new Date(event.date);
                return eventDate >= now;
            } else if (activeFilter === 'Completed') {
                // Events with past dates
                if (!event.date) return false;
                const eventDate = new Date(event.date);
                return eventDate < now;
            } else if (activeFilter === 'Draft') {
                // Events without a date set
                return !event.date;
            }
            return true;
        });
    };

    const filteredEvents = getFilteredEvents();

    useEffect(() => {
        async function fetchData() {
            if (!user) return;

            setIsLoading(true);
            setStatsLoading(true);

            // Fetch events
            const result = await getUserEvents(user.uid);
            if (result.success) {
                setEvents(result.events);
            } else {
                setError(result.error || 'Failed to load events');
            }
            setIsLoading(false);

            // Fetch stats
            const statsResult = await getUserStats(user.uid);
            if (statsResult.success) {
                setStats(statsResult.stats);
            }
            setStatsLoading(false);
        }

        fetchData();
    }, [user]);

    const placeholderImages = [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop',
    ];

    return (
        <div className="min-h-screen" style={{ background: '#f0f4f3' }}>
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <MobileNav />
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/events" className="text-gray-700 hover:text-gray-900 text-sm">Browse Events</Link>
                            <Link href="/" className="text-gray-700 hover:text-gray-900 text-sm">Create an Event</Link>
                            <Link href="/community" className="text-gray-700 hover:text-gray-900 text-sm">Community</Link>
                            <Link href="/about" className="text-gray-700 hover:text-gray-900 text-sm">About</Link>
                        </div>
                        <UserMenu />
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
                <div className="max-w-2xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Manage your events in one place
                    </h1>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Create, organize, and track all your events effortlessly. From planning to execution, everything you build stays securely connected to your account.
                    </p>

                    {/* Filter Tags */}
                    <div className="flex flex-wrap gap-3 mb-8">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === filter
                                    ? 'bg-teal-500 text-white'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    <StatsCard
                        label="Total Events Created"
                        value={stats.totalEvents}
                        isLoading={statsLoading}
                    />
                    <StatsCard
                        label="Events This Month"
                        value={stats.eventsThisMonth}
                        isLoading={statsLoading}
                    />
                    <StatsCard
                        label="Latest Event Created"
                        value={formatEventDate(stats.latestEventDate)}
                        isLoading={statsLoading}
                    />
                    <StatsCard
                        label="Member Since"
                        value={formatMemberDate(stats.memberSince)}
                        isLoading={statsLoading}
                    />
                </div>

                {/* Events Grid */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-600">Loading events...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Events</h3>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 rounded-lg font-medium text-white bg-teal-500 hover:bg-teal-600 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : filteredEvents.length === 0 ? (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            {activeFilter === 'All' ? 'No events yet' : `No ${activeFilter.toLowerCase()} events`}
                        </h3>
                        <p className="text-gray-600 mb-8">
                            {activeFilter === 'All'
                                ? 'Create your first event to get started'
                                : activeFilter === 'Draft'
                                    ? 'All your events have dates set'
                                    : `You don't have any ${activeFilter.toLowerCase()} events`
                            }
                        </p>
                        <Link href="/">
                            <button className="px-8 py-4 rounded-lg font-semibold text-white bg-teal-500 hover:bg-teal-600 transition-colors">
                                Create Your First Event
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.map((event, index) => (
                            <div key={event.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
                                {/* Event Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={placeholderImages[index % placeholderImages.length]}
                                        alt={event.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%2314b8a6" width="400" height="300"/%3E%3C/svg%3E';
                                        }}
                                    />
                                </div>

                                {/* Event Details */}
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                                        {event.title}
                                    </h3>

                                    {/* Date and Location */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>{event.date || 'Date not set'} • {event.time || 'Time not set'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>{event.location || 'Location not set'}</span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button className="w-full px-4 py-3 rounded-lg font-medium text-gray-700 bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors">
                                        See Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
