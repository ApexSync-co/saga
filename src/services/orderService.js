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
  onSnapshot,
  updateDoc
} from 'firebase/firestore';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const DELIVERY_BACKEND_URL = import.meta.env.VITE_DELIVERY_BACKEND_URL || 'http://localhost:5001';
const ORDERS_COLLECTION = 'orders';

/**
 * Save a new order to Firestore via Backend API (handles stock atomically)
 * @param {Object} orderData - { userId, items, total, address, paymentId, orderId }
 */
export async function saveOrder(orderData) {
  try {
    const response = await fetch(`${BACKEND_URL}/place-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to place order');
    }

    // Trigger DTDC Consignment if order was successfully placed
    // We keep this separate for now to allow order success even if shipping API is down
    if (result.orderId) {
        try {
            await fetch(`${DELIVERY_BACKEND_URL}/create-consignment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...orderData,
                    orderId: result.orderId
                })
            });
        } catch (e) {
            console.warn("Auto-consignment trigger failed, but order is saved:", e);
        }
    }

    return { id: result.orderId, ...orderData };
  } catch (error) {
    console.error("Error in saveOrder service:", error);
    throw error;
  }
}

/**
 * Fetch orders for a specific user via Backend API
 * @param {string} userId
 */
export async function fetchUserOrders(userId) {
  try {
    const response = await fetch(`${BACKEND_URL}/user-orders/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    
    const orders = await response.json();
    return orders.map(order => ({
      ...order,
      date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recently',
    }));
  } catch (error) {
    console.error("Error fetching user orders:", error);
    // Fallback to direct Firestore read if backend is down (Read-only is safer)
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

/**
 * Cancel an order by a customer
 * @param {string} orderId 
 */
export async function cancelOrder(orderId) {
  try {
    // Call backend to update status to Cancelled (which ensures consistency)
    const response = await fetch(`${BACKEND_URL}/update-order-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        status: 'Cancelled',
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Failed to cancel order');
    }

    return true;
  } catch (error) {
    console.error("Error cancelling order:", error);
    // Fallback: update status to Cancelled directly in Firestore if backend fails
    try {
      const docRef = doc(db, ORDERS_COLLECTION, orderId);
      await updateDoc(docRef, {
        status: 'Cancelled',
        updatedAt: new Date()
      });
      return true;
    } catch (dbError) {
      console.error("Firestore cancellation fallback failed:", dbError);
      throw error;
    }
  }
}
