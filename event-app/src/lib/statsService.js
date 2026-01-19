import { collection, query, where, getDocs, orderBy, limit, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const EVENTS_COLLECTION = 'events';
const USERS_COLLECTION = 'users';

/**
 * Get user-specific statistics
 * @param {string} userId - The user's UID
 * @returns {Promise<Object>} Statistics object
 */
export async function getUserStats(userId) {
    try {
        // Query all events for this user
        const eventsQuery = query(
            collection(db, EVENTS_COLLECTION),
            where('userId', '==', userId)
        );

        const eventsSnapshot = await getDocs(eventsQuery);
        const allEvents = eventsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // 1. Total Events Created
        const totalEvents = allEvents.length;

        // 2. Events Created This Month
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const eventsThisMonth = allEvents.filter(event => {
            if (!event.createdAt) return false;
            const eventDate = event.createdAt.toDate();
            return eventDate.getMonth() === currentMonth &&
                eventDate.getFullYear() === currentYear;
        }).length;

        // 3. Latest Event Created
        let latestEventDate = null;
        if (allEvents.length > 0) {
            const sortedEvents = allEvents
                .filter(event => event.createdAt)
                .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());

            if (sortedEvents.length > 0) {
                latestEventDate = sortedEvents[0].createdAt.toDate();
            }
        }

        // 4. Member Since
        let memberSince = null;
        const userDocRef = doc(db, USERS_COLLECTION, userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.createdAt) {
                memberSince = userData.createdAt.toDate();
            }
        }

        return {
            success: true,
            stats: {
                totalEvents,
                eventsThisMonth,
                latestEventDate,
                memberSince
            }
        };
    } catch (error) {
        console.error('Error fetching user stats:', error);
        return {
            success: false,
            error: error.message,
            stats: {
                totalEvents: 0,
                eventsThisMonth: 0,
                latestEventDate: null,
                memberSince: null
            }
        };
    }
}

/**
 * Format date to "MMM DD, YYYY" format
 * @param {Date} date 
 * @returns {string}
 */
export function formatEventDate(date) {
    if (!date) return '—';
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Format date to "MMM YYYY" format
 * @param {Date} date 
 * @returns {string}
 */
export function formatMemberDate(date) {
    if (!date) return '—';
    const options = { month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}
