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
  increment
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
 * Fetch orders for a specific user
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
