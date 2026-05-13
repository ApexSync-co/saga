/**
 * Address Service
 * 
 * Handles saving and fetching user delivery addresses in Firestore.
 */

import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';

const ADDRESSES_COLLECTION = 'addresses';
const LOCAL_ADDRESS_KEY = 'kamya_addresses';

/**
 * Validates address data for DTDC compatibility
 * @param {Object} address 
 * @returns {Array} List of validation errors
 */
export function validateAddressForDTDC(address) {
  const errors = [];
  if (!address.name || address.name.length < 3) errors.push("Full name is required (min 3 chars)");
  if (!address.phone || !/^\d{10}$/.test(address.phone.replace(/[^0-9]/g, ''))) {
    errors.push("Valid 10-digit phone number is required");
  }
  if (!address.pincode || !/^\d{6}$/.test(address.pincode)) {
    errors.push("Valid 6-digit pincode is required");
  }
  if (!address.addressLine1 || address.addressLine1.length < 5) {
    errors.push("Address Line 1 is required (min 5 chars)");
  }
  if (!address.city) errors.push("City is required");
  if (!address.state) errors.push("State is required");
  
  return errors;
}

/**
 * Normalizes address data for integration with Firebase and DTDC
 */
const normalizeAddress = (addressData) => ({
  name: addressData.name?.trim() || '',
  phone: addressData.phone?.replace(/[^0-9]/g, '') || '',
  addressLine1: addressData.addressLine1?.trim() || '',
  addressLine2: addressData.addressLine2?.trim() || '',
  landmark: addressData.landmark?.trim() || '',
  city: addressData.city?.trim() || '',
  state: addressData.state?.trim() || '',
  pincode: addressData.pincode?.trim() || '',
  type: addressData.type || 'Home',
  isDefault: !!addressData.isDefault,
});

export async function saveAddress(userId, addressData) {
  try {
    const normalized = normalizeAddress(addressData);
    
    // Save to Firestore (Primary)
    const docRef = await addDoc(collection(db, ADDRESSES_COLLECTION), {
      userId,
      ...normalized,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Mirror to LocalStorage (Efficient Cache)
    const localAddresses = JSON.parse(localStorage.getItem(LOCAL_ADDRESS_KEY) || '[]');
    localAddresses.push({ id: docRef.id, userId, ...normalized });
    localStorage.setItem(LOCAL_ADDRESS_KEY, JSON.stringify(localAddresses));

    return { id: docRef.id, ...normalized };
  } catch (error) {
    console.error("Error saving address:", error);
    throw error;
  }
}

export async function fetchUserAddresses(userId) {
  try {
    // Try LocalStorage first (Efficiency)
    const cached = localStorage.getItem(LOCAL_ADDRESS_KEY);
    if (cached) {
      const parsed = JSON.parse(cached).filter(addr => addr.userId === userId);
      if (parsed.length > 0) return parsed.sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0));
    }

    // Fallback to Firestore
    const q = query(
      collection(db, ADDRESSES_COLLECTION),
      where('userId', '==', userId)
    );
    const snapshot = await getDocs(q);
    const addresses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Update Cache
    localStorage.setItem(LOCAL_ADDRESS_KEY, JSON.stringify(addresses));

    return addresses.sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0));
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return [];
  }
}

export async function updateAddress(addressId, updates) {
  try {
    const normalized = normalizeAddress(updates);
    const docRef = doc(db, ADDRESSES_COLLECTION, addressId);
    await updateDoc(docRef, {
      ...normalized,
      updatedAt: new Date()
    });
    return true;
  } catch (error) {
    console.error("Error updating address:", error);
    throw error;
  }
}

/**
 * Sets an address as default and unsets others
 */
export async function setDefaultAddress(userId, addressId) {
  try {
    const addresses = await fetchUserAddresses(userId);
    const batch = [];
    
    for (const addr of addresses) {
      const docRef = doc(db, ADDRESSES_COLLECTION, addr.id);
      if (addr.id === addressId) {
        batch.push(updateDoc(docRef, { isDefault: true }));
      } else if (addr.isDefault) {
        batch.push(updateDoc(docRef, { isDefault: false }));
      }
    }
    
    await Promise.all(batch);
    return true;
  } catch (error) {
    console.error("Error setting default address:", error);
    throw error;
  }
}

export async function removeAddress(addressId) {
  try {
    const docRef = doc(db, ADDRESSES_COLLECTION, addressId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting address:", error);
    throw error;
  }
}
