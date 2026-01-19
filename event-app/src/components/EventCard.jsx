export default function EventCard({ event, index }) {
    // Generate a consistent placeholder image based on event index
    const placeholderImages = [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop', // Conference
        'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=250&fit=crop', // Meeting
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=250&fit=crop', // Party
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=250&fit=crop', // Event
        'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=250&fit=crop', // Business
        'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=250&fit=crop', // Networking
    ];

    const imageUrl = placeholderImages[index % placeholderImages.length];

    return (
        <div className="group cursor-pointer overflow-hidden" style={{
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
            {/* Image */}
            <div className="relative rounded-lg overflow-hidden mb-3" style={{
                transform: 'translateZ(0)', /* GPU acceleration */
            }}>
                <img
                    src={imageUrl}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                    style={{
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.08)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                    onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="250"%3E%3Crect fill="%23667eea" width="400" height="250"/%3E%3C/svg%3E';
                    }}
                />

                {/* Overlay gradient */}
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                    style={{
                        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                />
            </div>

            {/* Content */}
            <div>
                {/* Title */}
                <h3
                    className="text-white font-semibold text-base mb-2 line-clamp-2 group-hover:text-indigo-400"
                    style={{
                        transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    {event.title}
                </h3>

                {/* Meta info */}
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{event.createdAt}</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">Online Event</span>
                </div>
            </div>
        </div>
    );
}
