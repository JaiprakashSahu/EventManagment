'use client';

import { useState } from 'react';
import { EventCard, Button } from '@/components';
import Link from 'next/link';

// Dummy static data for events
const dummyEvents = [
    {
        id: 1,
        title: 'Tech Conference 2026',
        description: 'Join us for the biggest tech conference of the year. Learn from industry leaders and network with peers.',
        date: 'Jan 25, 2026',
        attendees: 156,
        category: 'Tech'
    },
    {
        id: 2,
        title: 'Summer Music Festival',
        description: 'A weekend of amazing music, food, and fun. Featuring top artists from around the world.',
        date: 'Feb 10, 2026',
        attendees: 342,
        category: 'Music'
    },
    {
        id: 3,
        title: 'Startup Pitch Night',
        description: 'Watch innovative startups pitch their ideas to investors. Network and learn from entrepreneurs.',
        date: 'Jan 30, 2026',
        attendees: 89,
        category: 'Business'
    },
    {
        id: 4,
        title: 'City Marathon 2026',
        description: 'Run through the heart of the city in our annual marathon. All skill levels welcome!',
        date: 'Mar 5, 2026',
        attendees: 1250,
        category: 'Sports'
    },
    {
        id: 5,
        title: 'Digital Art Exhibition',
        description: 'Explore the intersection of technology and art. Featuring NFTs, AI art, and interactive installations.',
        date: 'Feb 15, 2026',
        attendees: 78,
        category: 'Art'
    },
    {
        id: 6,
        title: 'Developer Meetup',
        description: 'Monthly meetup for developers to share knowledge, discuss trends, and build community.',
        date: 'Jan 22, 2026',
        attendees: 45,
        category: 'Tech'
    }
];

const categories = ['All', 'Tech', 'Music', 'Business', 'Sports', 'Art'];

export default function EventsPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredEvents = dummyEvents.filter(event => {
        const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                        Discover <span className="gradient-text">Events</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-md mx-auto">
                        Find exciting events happening around you. Join the community!
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="mb-10 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-5 py-4 pl-12 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] text-white placeholder-gray-500 transition-all duration-300 hover:border-indigo-500/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                        />
                        <svg
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`
                  px-4 py-2 rounded-xl text-sm font-medium
                  transition-all duration-300
                  ${selectedCategory === category
                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                                        : 'bg-[#1a1a24] text-gray-400 border border-[#2a2a3a] hover:border-indigo-500/50 hover:text-white'
                                    }
                `}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Events Grid or Empty State */}
                {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.map((event, index) => (
                            <EventCard key={event.id} event={event} index={index} />
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-20 animate-fade-in-up">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#1a1a24] flex items-center justify-center">
                            <svg
                                className="w-12 h-12 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No events found</h3>
                        <p className="text-gray-400 mb-6 max-w-md mx-auto">
                            {searchQuery
                                ? `No events match "${searchQuery}". Try a different search term.`
                                : 'There are no events in this category yet. Be the first to create one!'
                            }
                        </p>
                        <Link href="/">
                            <Button variant="primary" size="lg">
                                Create an Event
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Load More Button (if there are events) */}
                {filteredEvents.length > 0 && (
                    <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        <Button variant="secondary" size="lg">
                            Load More Events
                        </Button>
                    </div>
                )}

                {/* Stats Section */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    {[
                        { value: '500+', label: 'Events Created' },
                        { value: '10K+', label: 'Happy Attendees' },
                        { value: '50+', label: 'Categories' },
                        { value: '100+', label: 'Cities' }
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="text-center p-6 rounded-2xl bg-[#1a1a24]/50 border border-[#2a2a3a]"
                        >
                            <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                                {stat.value}
                            </div>
                            <div className="text-gray-500 text-sm">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
