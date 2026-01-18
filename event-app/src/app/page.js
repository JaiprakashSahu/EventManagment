'use client';

import { useState } from 'react';
import { Button, Input, Textarea } from '@/components';

export default function Home() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission (no Firebase logic yet)
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ title: '', description: '' });

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          Create Your <span className="gradient-text">Event</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          Bring people together with an amazing event. Start by filling out the details below.
        </p>
      </div>

      {/* Form Card */}
      <div
        className="w-full max-w-lg glass-effect rounded-3xl p-8 sm:p-10 animate-fade-in-up hover-glow transition-all duration-500"
        style={{ animationDelay: '0.2s' }}
      >
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/50 flex items-center gap-3">
            <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-400 font-medium">Event created successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Title */}
          <Input
            label="Event Title"
            name="title"
            placeholder="Enter your event title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* Event Description */}
          <Textarea
            label="Event Description"
            name="description"
            placeholder="Describe your event, what attendees can expect..."
            value={formData.description}
            onChange={handleChange}
            rows={5}
            required
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={isSubmitting || !formData.title || !formData.description}
            className="mt-8"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Creating Event...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Event
              </>
            )}
          </Button>
        </form>

        {/* Footer note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Your event will be visible to everyone once published.
        </p>
      </div>

      {/* Decorative elements */}
      <div className="mt-12 flex items-center gap-4 text-gray-500 text-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Free to create
        </span>
        <span>•</span>
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
          Unlimited attendees
        </span>
      </div>
    </div>
  );
}
