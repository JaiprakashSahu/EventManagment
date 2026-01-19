'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';

const AuthContext = createContext({});

// Routes that require authentication
const protectedRoutes = ['/', '/events'];
// Routes that should redirect to home if already authenticated
const authRoutes = ['/login'];

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Fetch user data from Firestore for firstName/lastName
                const userDocRef = doc(db, 'users', firebaseUser.uid);
                const userDoc = await getDoc(userDocRef);

                let firstName = '';
                let lastName = '';

                if (userDoc.exists()) {
                    const firestoreData = userDoc.data();
                    firstName = firestoreData.firstName || '';
                    lastName = firestoreData.lastName || '';
                }

                // User is signed in
                const userData = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: `${firstName} ${lastName}`.trim() || firebaseUser.displayName,
                    firstName: firstName,
                    lastName: lastName,
                    photoURL: firebaseUser.photoURL,
                };
                setUser(userData);
            } else {
                // User is signed out
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Handle route protection
    useEffect(() => {
        if (loading) return;

        const isProtectedRoute = protectedRoutes.includes(pathname);
        const isAuthRoute = authRoutes.includes(pathname);

        if (!user && isProtectedRoute) {
            // Redirect to login if accessing protected route while not authenticated
            router.push('/login');
        } else if (user && isAuthRoute) {
            // Redirect to home if accessing auth route while authenticated
            router.push('/');
        }
    }, [user, loading, pathname, router]);

    // Sign in with Google
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const firebaseUser = result.user;

            // Split displayName into firstName and lastName
            const nameParts = firebaseUser.displayName?.split(' ') || [];
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';

            // Check if user exists in Firestore
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                // Save new user to Firestore
                await setDoc(userDocRef, {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    firstName: firstName,
                    lastName: lastName,
                    photoURL: firebaseUser.photoURL,
                    createdAt: serverTimestamp(),
                    lastLoginAt: serverTimestamp(),
                });
            } else {
                // Update last login time
                await setDoc(userDocRef, {
                    lastLoginAt: serverTimestamp(),
                }, { merge: true });
            }

            // Redirect to home
            router.push('/');
            return { success: true };
        } catch (error) {
            console.error('Error signing in with Google:', error);
            return { success: false, error: error.message };
        }
    };

    // Sign out
    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            router.push('/login');
            return { success: true };
        } catch (error) {
            console.error('Error signing out:', error);
            return { success: false, error: error.message };
        }
    };

    const value = {
        user,
        loading,
        signInWithGoogle,
        signOut,
        logout: signOut, // Alias for convenience
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
