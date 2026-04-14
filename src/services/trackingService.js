/**
 * Tracking Service
 * 
 * Handles order tracking with DTDC via Firebase Cloud Functions.
 */

import { functions } from './firebase';
import { httpsCallable } from 'firebase/functions';

/**
 * Call the Firebase trackOrder function for DTDC tracking results.
 * @param {string} awbNumber - 9-digit AWB tracking number (e.g., 'V01197967')
 * @returns {Promise<Object>} - Detailed tracking data from DTDC.
 */
export async function trackOrder(awbNumber) {
  try {
    const trackOrderFunc = httpsCallable(functions, 'trackOrder');
    const result = await trackOrderFunc({ awbNumber });
    return result.data;
  } catch (error) {
    console.error("Error calling trackOrder function:", error);
    throw error;
  }
}
