'use client';

export default function EventCard({ event, index = 0 }) {
    const { title, description, date, attendees, category } = event;

    const categoryColors = {
        'Tech': 'from-blue-500 to-cyan-400',
        'Music': 'from-pink-500 to-rose-400',
        'Business': 'from-amber-500 to-orange-400',
        'Sports': 'from-green-500 to-emerald-400',
        'Art': 'from-purple-500 to-violet-400',
        'Default': 'from-indigo-500 to-purple-400',
    };

    const gradientClass = categoryColors[category] || categoryColors['Default'];

    return (
        <div
            className="group relative bg-[#1a1a24] rounded-2xl overflow-hidden border border-[#2a2a3a] hover:border-indigo-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1"
            style={{
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
                animation: 'fadeInUp 0.6s ease-out forwards'
            }}
        >
            {/* Gradient accent bar */}
            <div className={`h-1 bg-gradient-to-r ${gradientClass}`} />

            <div className="p-6">
                {/* Category badge */}
                <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${gradientClass} bg-opacity-20 text-white`}>
                        {category || 'General'}
                    </span>
                    <span className="text-sm text-gray-500">
                        {date}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300 line-clamp-1">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[#2a2a3a]">
                    <div className="flex items-center gap-2">
                        {/* Attendee avatars placeholder */}
                        <div className="flex -space-x-2">
                            {[...Array(Math.min(attendees || 3, 3))].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-2 border-[#1a1a24] flex items-center justify-center text-xs text-white font-medium"
                                >
                                    {String.fromCharCode(65 + i)}
                                </div>
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">
                            {attendees || '0'} attending
                        </span>
                    </div>

                    {/* View button */}
                    <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-300 flex items-center gap-1 group/btn">
                        View
                        <svg
                            className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none" />
        </div>
    );
}
