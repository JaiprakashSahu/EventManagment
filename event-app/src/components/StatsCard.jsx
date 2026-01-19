export default function StatsCard({ label, value, isLoading }) {
    return (
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-teal-300 transition-colors">
            {isLoading ? (
                <div className="space-y-3">
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                </div>
            ) : (
                <>
                    <div className="text-3xl font-bold text-teal-600 mb-2">
                        {value}
                    </div>
                    <div className="text-sm text-gray-600">
                        {label}
                    </div>
                </>
            )}
        </div>
    );
}
