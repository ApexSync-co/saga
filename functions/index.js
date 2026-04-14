const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();

/**
 * Cloud Function to track DTDC orders.
 * This function should be deployed to Firebase Functions.
 *
 * Steps for the DTDC Tracking API:
 * 1. Authenticate to get an access token.
 * 2. Use the token to fetch tracking data.
 */
exports.trackOrder = functions.https.onCall(async (data, context) => {
  // 1. Check for the AWB number in the request
  const awbNumber = data.awbNumber;
  if (!awbNumber) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The "awbNumber" parameter is required.'
    );
  }

  // Use environment variables for DTDC credentials (set via `firebase functions:config:set dtdc.username="..." dtdc.password="..."`)
  const username = functions.config().dtdc?.username || 'YOUR_DTDC_USERNAME'; 
  const password = functions.config().dtdc?.password || 'YOUR_DTDC_PASSWORD';

  try {
    // Phase 1: Authentication Request
    const authUrl = `https://blktracksvc.dtdc.com/dtdc-api/api/dtdc/authenticate?username=${username}&password=${password}`;
    const authResponse = await axios.get(authUrl);

    // Assuming DTDC returns the token in the response data as a string (adjust as per actual DTDC response structure)
    // Most DTDC Auth APIs return the token as a string or in { "token": "..." }
    const token = authResponse.data;

    if (!token) {
      throw new Error('Failed to obtain DTDC access token.');
    }

    // Phase 2: Tracking Data Request
    const trackingUrl = 'https://blktracksvc.dtdc.com/dtdc-api/rest/JSONCnTrk/getTrackDetails';
    const payload = {
      trkType: 'cnno',
      strcnno: awbNumber,
      addtnlDtl: 'Y',
    };

    const trackingResponse = await axios.post(trackingUrl, payload, {
      headers: {
        'X-Access-Token': token,
        'Content-Type': 'application/json',
      },
    });

    const dtdcData = trackingResponse.data;
    
    // Normalize DTDC response for SAGA Luxury UI
    // DTDC typically returns an array of scans in 'details' or similar
    const scans = dtdcData?.details || [];
    const latestScan = scans[0] || {};

    return {
      status: latestScan.scanStatus || 'In Transit',
      location: latestScan.scanLocation || 'Processing Hub',
      eta: dtdcData.expectedDeliveryDate || '4-5 Days',
      lastUpdated: latestScan.scanDate || new Date().toISOString(),
      raw: dtdcData, // Keep raw for debugging/extended logs
      history: scans.map(s => ({
        status: s.scanStatus,
        location: s.scanLocation,
        time: s.scanDate
      }))
    };

  } catch (error) {
    console.error('DTDC Tracking Error:', error?.response?.data || error.message);
    throw new functions.https.HttpsError(
      'internal',
      'An error occurred while tracking the order with DTDC.'
    );
  }
});
