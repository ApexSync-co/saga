import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { db } from '../services/firebase';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Initial load from localStorage (works for both guests and logged-in users during hydration)
    const savedCart = localStorage.getItem('saga_cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (error) {
        console.error("Failed to parse local cart data", error);
      }
    }
    return [];
  });
  const [authAlert, setAuthAlert] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Load cart from Firestore when user logs in
  useEffect(() => {
    if (!user) return;

    // If user exists and has a UID, listen to Firestore updates
    if (user && user.uid) {
      const cartRef = doc(db, 'carts', user.uid);
      const unsubscribe = onSnapshot(cartRef, (docSnap) => {
        if (docSnap.exists()) {
          const cloudItems = docSnap.data().items || [];
          setCartItems(cloudItems);
          // Also update localStorage so it's ready on next refresh
          localStorage.setItem('saga_cart', JSON.stringify(cloudItems));
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  // Sync cart to Cloud (Firestore) and LocalStorage
  useEffect(() => {
    // Always save to localStorage for persistence on refresh
    localStorage.setItem('saga_cart', JSON.stringify(cartItems));

    if (user && user.uid) {
      const syncToCloud = async () => {
        try {
          const cartRef = doc(db, 'carts', user.uid);
          await setDoc(cartRef, { 
            items: cartItems,
            updatedAt: new Date()
          }, { merge: true });
        } catch (error) {
          console.error("Error syncing cart to cloud:", error);
        }
      };
      syncToCloud();
    }
  }, [cartItems, user]);

  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
        const cleanPrice = price.replace(/[^0-9.]/g, ''); // Remove non-numeric chars except dot
        return parseFloat(cleanPrice) || 0;
    }
    return 0;
  };

  const addToCart = (product) => {
    if (!user) {
      setAuthAlert(true);
      return;
    }

    setCartItems(prevItems => {
      // Check for existing item by ID and Name to avoid collision if IDs are reused across categories
      const existingItem = prevItems.find(item => item.id === product.id && item.name === product.name);
      
      if (existingItem) {
        return prevItems.map(item =>
          (item.id === product.id && item.name === product.name)
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId, productName) => {
     // Use both ID and Name for removal to match addToCart logic
    setCartItems(prevItems => prevItems.filter(item => !(item.id === productId && item.name === productName)));
  };

  const updateQuantity = (productId, productName, newQuantity) => {
    if (newQuantity < 1) {
        removeFromCart(productId, productName);
        return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        (item.id === productId && item.name === productName) ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const importCart = (items) => {
    setCartItems(items);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
        const price = parsePrice(item.price);
        return total + (price * item.quantity);
    }, 0);
  };
  
  const getCartCount = () => {
      return cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  const handleAuthAlertClose = () => {
    setAuthAlert(false);
    navigate('/signin');
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      getCartTotal,
      getCartCount,
      importCart
    }}>
      {children}
      {authAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-[Poppins]">
          <div className="bg-[#111] border border-white/10 rounded-sm p-6 w-full max-w-sm shadow-2xl text-center transform transition-all animate-in fade-in zoom-in duration-300">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-light text-white mb-2">Authentication Required</h3>
            <p className="text-white/60 text-sm mb-6">Please sign in before adding products to your cart.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setAuthAlert(false)} 
                className="flex-1 py-2 px-4 border border-white/10 hover:bg-white/5 text-white text-sm tracking-wider uppercase transition-colors rounded-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleAuthAlertClose} 
                className="flex-1 py-2 px-4 bg-primary hover:bg-orange-600 text-white text-sm font-medium tracking-wider uppercase transition-colors rounded-sm"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};
