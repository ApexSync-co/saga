/**
 * Shipping Service
 * 
 * Handles DTDC shipping rate calculations based on:
 * - Location (Kerala vs Outside)
 * - Weight (500g slabs)
 * - Payment Mode (Prepaid vs COD)
 */

// Location Classification Constants
export const REGIONS = {
  KERALA: 'Kerala',
  ZONE: 'South',
  METRO: ['Mumbai', 'Delhi', 'Kolkata', 'Ahmedabad', 'Pune'],
  ROI_B: ['Jammu & Kashmir', 'Himachal Pradesh', 'Guwahati', 'Assam'],
  SPECIAL: ['Tripura', 'Port Blair', 'Andaman & Nicobar', 'North East'],
};

// Rates Configuration
const RATES = {
  SURFACE: { // Kerala Only
    BASE: 48,
    ADDITIONAL: 26
  },
  AIR: { // Outside Kerala
    REGION: { BASE: 57, ADDITIONAL: 29 },
    ZONE: { BASE: 64, ADDITIONAL: 38 },
    METRO: { BASE: 91, ADDITIONAL: 69 },
    ROI_A: { BASE: 93.6, ADDITIONAL: 75 },
    ROI_B: { BASE: 97.5, ADDITIONAL: 78 },
    SPECIAL: { BASE: 114, ADDITIONAL: 93.6 }
  }
};

/**
 * Determine the location category for Air Mode
 */
const getLocationCategory = (state, city) => {
  const normalizedState = state.trim().toLowerCase();
  const normalizedCity = city.trim().toLowerCase();

  // 1. Metro check (City based)
  const metros = ['mumbai', 'delhi', 'kolkata', 'ahmedabad', 'pune'];
  if (metros.some(m => normalizedCity.includes(m))) {
    return 'METRO';
  }

  // 2. Special Destination (State/City based)
  // Special Destination: North East (including Tripura & Port Blair)
  const specialStates = ['tripura', 'andaman', 'nicobar', 'port blair', 'nagaland', 'manipur', 'mizoram', 'arunachal'];
  if (specialStates.some(s => normalizedState.includes(s) || normalizedCity.includes(s))) {
    return 'SPECIAL';
  }

  // 3. ROI B
  // ROI B: Jammu & Kashmir, Himachal Pradesh & Guwahati
  const roiBStates = ['jammu', 'kashmir', 'himachal', 'guwahati'];
  if (roiBStates.some(s => normalizedState.includes(s) || normalizedCity.includes(s))) {
    return 'ROI_B';
  }

  // 4. Zone (South India check)
  // Zone: South
  const southStates = ['tamil nadu', 'karnataka', 'andhra pradesh', 'telangana', 'puducherry'];
  if (southStates.some(s => normalizedState.includes(s))) {
    return 'ZONE';
  }

  // 5. Region (Within Kerala - though Surface handles it, Air Region exists in rates)
  if (normalizedState === 'kerala') return 'REGION';

  // 6. Default ROI A (North, East, West & Central India)
  return 'ROI_A';
};

/**
 * Calculate Shipping and COD charges
 * 
 * @param {Object} params
 * @param {string} params.state - Destination state
 * @param {string} params.city - Destination city
 * @param {number} params.weight - Total weight in grams (default 500g)
 * @param {number} params.orderValue - Total cart value (for COD calculation)
 * @param {boolean} params.isCOD - If payment mode is Cash on Delivery
 */
export const calculateShipping = ({ state, city, weight = 500, orderValue = 0, isCOD = false }) => {
  if (!state || !city) return { shipping: 0, cod: 0, total: 0 };

  const isKerala = state.trim().toLowerCase() === 'kerala';
  let shippingCharge = 0;
  let codCharge = 0;

  // Calculate Slabs (Round up to nearest 500g)
  // Base slab is 500g. Additional slabs are (weight - 500) / 500
  const totalSlabs = Math.ceil(weight / 500);
  const additionalSlabs = Math.max(0, totalSlabs - 1);

  if (isKerala) {
    // SURFACE MODE
    shippingCharge = RATES.SURFACE.BASE + (additionalSlabs * RATES.SURFACE.ADDITIONAL);
  } else {
    // AIR MODE
    const category = getLocationCategory(state, city);
    const rateConfig = RATES.AIR[category];
    shippingCharge = rateConfig.BASE + (additionalSlabs * rateConfig.ADDITIONAL);
  }

  return {
    shippingCharge,
    codCharge: 0,
    totalDeliveryCharge: shippingCharge,
    mode: isKerala ? 'Surface (Smart Express)' : 'Air (Priority)',
    slabs: totalSlabs
  };
};
