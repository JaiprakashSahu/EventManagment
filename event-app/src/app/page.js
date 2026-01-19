'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { createEvent } from '@/lib/eventService';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showDescription, setShowDescription] = useState(false);
  const [date, setDate] = useState('Jul 14, 2021');
  const [time, setTime] = useState('02:00 PM');
  const [duration, setDuration] = useState('1h 45m');
  const [location, setLocation] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guests, setGuests] = useState([]);
  const [notificationEmail, setNotificationEmail] = useState(true);
  const [notificationSlack, setNotificationSlack] = useState(false);
  const [reminder, setReminder] = useState('1 hour before event');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleAddGuest = () => {
    if (guestEmail && guestEmail.includes('@')) {
      setGuests([...guests, { email: guestEmail, avatar: `https://ui-avatars.com/api/?name=${guestEmail}&background=random` }]);
      setGuestEmail('');
    }
  };

  const handleRemoveGuest = (index) => {
    setGuests(guests.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!user) {
      setError('You must be logged in to create an event');
      setIsSubmitting(false);
      return;
    }

    const result = await createEvent({ title, description }, user.uid);

    if (result.success) {
      router.push('/events');
    } else {
      setError(result.error || 'Failed to create event');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: '#6b6b6b' }}>
      {/* Create Event Card */}
      <div className="w-full max-w-2xl rounded-2xl p-8" style={{ background: '#3a3a3a' }}>
        {/* Header */}
        <h1 className="text-3xl font-bold text-white mb-6 pb-6 border-b border-gray-600">
          Create Event
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Section */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">Title</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Event title"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
                style={{ background: '#2a2a2a' }}
              />
              <button
                type="button"
                onClick={() => setShowDescription(!showDescription)}
                className="px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-colors text-sm flex items-center gap-2"
                style={{ background: '#2a2a2a' }}
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
                className="mt-3 w-full px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
                style={{ background: '#2a2a2a' }}
              />
            )}
          </div>

          {/* Date, Time, Duration Row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-3">Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-700 text-white focus:outline-none focus:border-gray-600"
                style={{ background: '#2a2a2a' }}
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-3">Time</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-700 text-white focus:outline-none focus:border-gray-600"
                style={{ background: '#2a2a2a' }}
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-3">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-700 text-white focus:outline-none focus:border-gray-600"
                style={{ background: '#2a2a2a' }}
              />
            </div>
          </div>

          {/* Info Message */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>This event will take place on the {date} from {time} until 03:45 PM</span>
          </div>

          {/* Location Section */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">Location</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="flex-1 px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
                style={{ background: '#2a2a2a' }}
              />
              <button
                type="button"
                className="px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-colors text-sm flex items-center gap-2"
                style={{ background: '#2a2a2a' }}
              >
                <span>+</span>
                Set meeting room
              </button>
            </div>
          </div>

          {/* Add Guests Section */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">Add guests</label>
            <div className="flex items-center gap-3 mb-4">
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddGuest())}
                placeholder="Guest email"
                className="flex-1 px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
                style={{ background: '#2a2a2a' }}
              />
              <button
                type="button"
                onClick={handleAddGuest}
                className="px-6 py-3 rounded-lg bg-[#2a2a2a] border border-gray-700 text-white hover:border-gray-600 transition-colors text-sm"
                style={{ background: '#2a2a2a' }}
              >
                Add
              </button>
            </div>

            {/* Guest Avatars */}
            {guests.length > 0 && (
              <div className="flex items-center gap-2">
                {guests.map((guest, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={guest.avatar}
                      alt={guest.email}
                      className="w-12 h-12 rounded-full border-2 border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveGuest(index)}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gray-700 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {guests.length > 0 && (
                  <span className="text-gray-400 text-sm ml-2">+{guests.length}</span>
                )}
              </div>
            )}
          </div>

          {/* Notification and Reminder Row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Notification */}
            <div>
              <label className="block text-white text-sm font-medium mb-3">Notification</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setNotificationEmail(!notificationEmail)}
                  className={`px-4 py-2 rounded-lg border transition-colors text-sm ${notificationEmail
                      ? 'bg-white text-gray-900 border-white'
                      : 'bg-[#2a2a2a] text-gray-400 border-gray-700 hover:border-gray-600'
                    }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setNotificationSlack(!notificationSlack)}
                  className={`px-4 py-2 rounded-lg border transition-colors text-sm ${notificationSlack
                      ? 'bg-white text-gray-900 border-white'
                      : 'bg-[#2a2a2a] text-gray-400 border-gray-700 hover:border-gray-600'
                    }`}
                >
                  Slack
                </button>
              </div>
            </div>

            {/* Set Reminder */}
            <div>
              <label className="block text-white text-sm font-medium mb-3">Set reminder</label>
              <select
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] border border-gray-700 text-white focus:outline-none focus:border-gray-600"
                style={{ background: '#2a2a2a' }}
              >
                <option>1 hour before event</option>
                <option>30 minutes before event</option>
                <option>1 day before event</option>
                <option>1 week before event</option>
              </select>
            </div>
          </div>

          {/* Create Button */}
          <div className="pt-6 border-t border-gray-600">
            <button
              type="submit"
              disabled={isSubmitting || !title}
              className="w-full px-6 py-4 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg"
            >
              {isSubmitting ? 'Creating...' : 'Create event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
