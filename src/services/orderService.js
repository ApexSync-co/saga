/**
 * Order Service
 * 
 * Handles saving and fetching user orders in Firestore.
 */

import { db } from './firebase';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  writeBatch,
  doc,
  increment,
  onSnapshot
} from 'firebase/firestore';

const ORDERS_COLLECTION = 'orders';

/**
 * Save a new order to Firestore and simultaneously reduce product stock
 * @param {Object} orderData - { userId, items, total, address, paymentId, orderId }
 */
export async function saveOrder(orderData) {
  try {
    const batch = writeBatch(db);
    
    // 1. Create a reference for the new order document
    const orderRef = doc(collection(db, ORDERS_COLLECTION));
    batch.set(orderRef, {
      ...orderData,
      status: 'Processing',
      createdAt: serverTimestamp(),
    });

    // 2. Queue up stock reductions for each product in the order
    const items = orderData.items || [];
    for (const item of items) {
      if (item.id) {
        const productRef = doc(db, 'products', item.id);
        batch.update(productRef, {
          stock: increment(-(item.quantity || 1))
        });
      }
    }

    // 3. Commit the batch atomically (both order creation & stock reduction happen together)
    await batch.commit();

    return { id: orderRef.id, ...orderData };
  } catch (error) {
    console.error("Error saving order and reducing stock:", error);
    throw error;
  }
}

/**
 * Fetch orders for a specific user (one-time)
 * @param {string} userId
 */
export async function fetchUserOrders(userId) {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().createdAt?.toDate().toLocaleDateString() || 'Recently',
    }));
  } catch (error) {
    console.error("Error fetching user orders:", error);
    // If it's an index error, fallback to un-ordered fetch
    try {
        const q = query(
            collection(db, ORDERS_COLLECTION),
            where('userId', '==', userId)
          );
          const snapshot = await getDocs(q);
          return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            date: doc.data().createdAt?.toDate().toLocaleDateString() || 'Recently',
          }));
    } catch {
        return [];
    }
  }
}

/**
 * Subscribe to real-time order updates for a specific user.
 * Returns an unsubscribe function to stop listening.
 * @param {string} userId
 * @param {function} onOrdersUpdate - callback receiving the updated orders array
 * @param {function} onError - optional error callback
 * @returns {function} unsubscribe function
 */
export function subscribeToUserOrders(userId, onOrdersUpdate, onError) {
  // Try with ordering first
  const q = query(
    collection(db, ORDERS_COLLECTION),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const unsubscribe = onSnapshot(q, 
    (snapshot) => {
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt?.toDate().toLocaleDateString() || 'Recently',
      }));
      onOrdersUpdate(orders);
    },
    (error) => {
      console.error("Real-time orders listener error:", error);
      // Fallback: try without orderBy (index might not exist)
      const fallbackQuery = query(
        collection(db, ORDERS_COLLECTION),
        where('userId', '==', userId)
      );
      const fallbackUnsub = onSnapshot(fallbackQuery,
        (snapshot) => {
          const orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            date: doc.data().createdAt?.toDate().toLocaleDateString() || 'Recently',
          }));
          onOrdersUpdate(orders);
        },
        (fallbackError) => {
          console.error("Fallback listener also failed:", fallbackError);
          if (onError) onError(fallbackError);
        }
      );
      // Replace the unsubscribe reference (caller still has the original)
      unsubscribe._fallback = fallbackUnsub;
    }
  );

  // Return a wrapper that cleans up both listeners
  return () => {
    unsubscribe();
    if (unsubscribe._fallback) unsubscribe._fallback();
  };
}
