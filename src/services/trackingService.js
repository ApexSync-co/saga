/**
 * Tracking Service
 * 
 * Handles order tracking with DTDC via our Vercel Backend.
 */

const DELIVERY_BACKEND_URL = import.meta.env.VITE_DELIVERY_BACKEND_URL || 'http://localhost:5001';

/**
 * Call the Vercel track-order endpoint for DTDC tracking results.
 * @param {string} awbNumber - 9-digit AWB tracking number (e.g., 'V01197967')
 * @returns {Promise<Object>} - Detailed tracking data from DTDC.
 */
export async function trackOrder(awbNumber) {
  try {
    const response = await fetch(`${DELIVERY_BACKEND_URL}/track-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ awbNumber }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Tracking request failed');
    }

    return await response.json();
  } catch (error) {
    console.error("Error calling Vercel trackOrder:", error);
    throw error;
  }
}
