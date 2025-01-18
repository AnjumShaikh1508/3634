import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import axios from 'axios';

const firebaseConfig = {
  apiKey: "AIzaSyB_qEDfsH-UB3bqvDP8j8JJDG5qnISujS8",
  authDomain: "mit-marketplace-6e367.firebaseapp.com",
  databaseURL: "https://mit-marketplace-6e367-default-rtdb.firebaseio.com",
  projectId: "mit-marketplace-6e367",
  storageBucket: "mit-marketplace-6e367.firebasestorage.app",
  messagingSenderId: "95349881534",
  appId: "1:95349881534:web:890c4a9c42e19c8fb9fcef",
  measurementId: "G-DBB9YJTXQ2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const FirebaseContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Fetch user's cart and wishlist from realtime database
        try {
          const response = await axios.get(`https://mit-marketplace-6e367-default-rtdb.firebaseio.com/users/${user.uid}.json`);
          if (response.data) {
            setCart(response.data.cart || []);
            setWishlist(response.data.wishlist || []);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setCart([]);
        setWishlist([]);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Initialize user data in realtime database
      await axios.put(`https://mit-marketplace-6e367-default-rtdb.firebaseio.com/users/${userCredential.user.uid}.json`, {
        name,
        email,
        cart: [],
        wishlist: []
      });
      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  };

  const addToCart = async (product) => {
    if (!user) return;
    try {
      const newCart = [...cart, product];
      await axios.patch(`https://mit-marketplace-6e367-default-rtdb.firebaseio.com/users/${user.uid}.json`, {
        cart: newCart
      });
      setCart(newCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;
    try {
      const newCart = cart.filter(item => item.id !== productId);
      await axios.patch(`https://mit-marketplace-6e367-default-rtdb.firebaseio.com/users/${user.uid}.json`, {
        cart: newCart
      });
      setCart(newCart);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const addToWishlist = async (product) => {
    if (!user) return;
    try {
      const newWishlist = [...wishlist, product];
      await axios.patch(`https://mit-marketplace-6e367-default-rtdb.firebaseio.com/users/${user.uid}.json`, {
        wishlist: newWishlist
      });
      setWishlist(newWishlist);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user) return;
    try {
      const newWishlist = wishlist.filter(item => item.id !== productId);
      await axios.patch(`https://mit-marketplace-6e367-default-rtdb.firebaseio.com/users/${user.uid}.json`, {
        wishlist: newWishlist
      });
      setWishlist(newWishlist);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
};