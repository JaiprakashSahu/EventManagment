import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    serverTimestamp,
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';
import { db } from './firebase';

const EVENTS_COLLECTION = 'events';

/**
 * Create a new event in Firestore
 * @param {Object} eventData - Event data (title, description)
 * @param {string} userId - The ID of the user creating the event
 * @returns {Promise<{success: boolean, id?: string, error?: string}>}
 */
export async function createEvent(eventData, userId) {
    try {
        const docRef = await addDoc(collection(db, EVENTS_COLLECTION), {
            title: eventData.title,
            description: eventData.description,
            userId: userId,
            createdAt: serverTimestamp(),
        });

        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error creating event:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get all events for a specific user
 * @param {string} userId - The ID of the user
 * @returns {Promise<{success: boolean, events?: Array, error?: string}>}
 */
export async function getUserEvents(userId) {
    try {
        const eventsRef = collection(db, EVENTS_COLLECTION);
        const q = query(
            eventsRef,
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const events = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            events.push({
                id: doc.id,
                ...data,
                // Convert Firestore timestamp to readable date
                createdAt: data.createdAt?.toDate?.()
                    ? data.createdAt.toDate().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })
                    : 'Just now'
            });
        });

        return { success: true, events };
    } catch (error) {
        console.error('Error fetching events:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Delete an event from Firestore
 * @param {string} eventId - The ID of the event to delete
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function deleteEvent(eventId) {
    try {
        await deleteDoc(doc(db, EVENTS_COLLECTION, eventId));
        return { success: true };
    } catch (error) {
        console.error('Error deleting event:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Update an event in Firestore
 * @param {string} eventId - The ID of the event to update
 * @param {Object} updateData - The data to update
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function updateEvent(eventId, updateData) {
    try {
        await updateDoc(doc(db, EVENTS_COLLECTION, eventId), {
            ...updateData,
            updatedAt: serverTimestamp(),
        });
        return { success: true };
    } catch (error) {
        console.error('Error updating event:', error);
        return { success: false, error: error.message };
    }
}
