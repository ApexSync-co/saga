/**
 * Firebase Configuration
 * 
 * Initializes Firebase app with config from environment variables.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Debug: Check if Firebase config is loaded correctly
if (!firebaseConfig.projectId) {
  console.error("Firebase Project ID is missing. Please ensure your .env file is correctly configured with VITE_FIREBASE_PROJECT_ID.");
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const analytics = await isSupported() ? getAnalytics(app) : null;
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);

export default app;
