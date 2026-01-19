'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { createEvent } from '@/lib/eventService';
import UserMenu from '@/components/UserMenu';
import MobileNav from '@/components/MobileNav';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showDescription, setShowDescription] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!user) {
      setError('You must be logged in to create an event');
      setIsSubmitting(false);
      return;
    }


    const eventData = {
      title,
      description,
      date,
      time,
      duration,
      location,
      guests: guests.map(g => g.email),
      notificationEmail,
      notificationSlack,
      reminder
    };

    const result = await createEvent(eventData, user.uid);

    if (result.success) {
      router.push('/events');
    } else {
      setError(result.error || 'Failed to create event');
      setIsSubmitting(false);
    }
  };


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

      {/* Create Event Card */}
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-3 sm:px-4 py-8 sm:py-12">
        <div className="w-full max-w-2xl bg-white rounded-2xl p-4 sm:p-8 border border-gray-200 shadow-sm">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6 pb-6 border-b border-gray-200">
            Create Event
          </h1>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Section */}
            <div>
              <label className="block text-gray-900 text-sm font-medium mb-3">Title</label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Event title"
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowDescription(!showDescription)}
                  className="px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors text-sm flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>+</span>
                  Add description
                </button>
              </div>
              {showDescription && (
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Event description"
                  rows={3}
                  className="mt-3 w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              )}
            </div>

            {/* Date and Start Time Row */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 cursor-pointer text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-2">Start Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 cursor-pointer text-sm"
                />
              </div>
            </div>

            {/* End Time Row */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-2">End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 cursor-pointer text-sm"
                />
              </div>
              <div></div>
            </div>

            {/* Info Message - only show when date and time are set */}
            {date && time && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Event scheduled for {date} at {time}</span>
              </div>
            )}

            {/* Location Section */}
            <div>
              <label className="block text-gray-900 text-sm font-medium mb-3">Location</label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  className="flex-1 px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
                <button
                  type="button"
                  className="px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors text-sm flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>+</span>
                  Set meeting room
                </button>
              </div>
            </div>

            {/* Create Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting || !title}
                className="w-full px-6 py-4 rounded-lg bg-teal-500 text-white font-semibold hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg"
              >
                {isSubmitting ? 'Creating...' : 'Create event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
