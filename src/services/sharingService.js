import { db } from './firebase';
import { collection, addDoc, getDoc, doc, serverTimestamp } from 'firebase/firestore';

/**
 * Saves a cart configuration to Firestore and returns a shareable ID.
 * @param {Array} items - The cart items to share
 * @returns {Promise<string>} - The document ID
 */
export const shareCart = async (items) => {
    try {
        const docRef = await addDoc(collection(db, 'shared_carts'), {
            items,
            createdAt: serverTimestamp(),
            // Expire after 30 days (logic handled client-side or via TTL if enabled in Firestore)
        });
        return docRef.id;
    } catch (error) {
        console.error("Error sharing cart:", error);
        throw error;
    }
};

/**
 * Fetches a shared cart by its ID.
 * @param {string} shareId - The ID of the shared cart
 * @returns {Promise<Array|null>} - The cart items or null if not found
 */
export const getSharedCart = async (shareId) => {
    try {
        const docRef = doc(db, 'shared_carts', shareId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            return docSnap.data().items;
        }
        return null;
    } catch (error) {
        console.error("Error fetching shared cart:", error);
        return null;
    }
};
