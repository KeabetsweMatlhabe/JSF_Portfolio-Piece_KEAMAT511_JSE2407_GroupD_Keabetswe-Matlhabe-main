
import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';

export const useCartStore = defineStore('cart', {
  state: () => ({
    allCartItems: JSON.parse(localStorage.getItem('cart')) || [],
    isLoggedIn: !!localStorage.getItem('jwt'),
  }),

  getters: {
    cartItems: (state) => {
      const userId = getCurrentUserId();
      return userId ? Object.values(state.allCartItems).filter(item => item.userId === userId) : [];
    },
    cartCount: (state) => {
      return state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    },
    totalItems: (state) => {
      return state.cartItems.length;
    },
    totalCost: (state) => {
      return Number(state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
    },
  },

  actions: {
    addToCart(product) {
      if (!this.isLoggedIn) {
        alert('Please log in to add items to the cart');
        return;
      }
      const userId = getCurrentUserId();
      if (!userId) return;

      const existingProduct = this.cartItems.find(
        (item) => item.id === product.id && item.userId === userId
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.allCartItems.push({ ...product, quantity: 1, userId });
      }
      
      this.updateLocalStorage();
    },

    removeFromCart(productId) {
      const userId = getCurrentUserId();
      if (!userId) return;
      this.allCartItems = this.allCartItems.filter(
        (item) => !(item.id === productId && item.userId === userId)
      );
      this.updateLocalStorage();
    },

    updateCart(productId, quantity) {
      const userId = getCurrentUserId();
      if (!userId) return;
      const product = this.cartItems.find(
        (item) => item.id === productId && item.userId === userId
      );
      if (product) {
        product.quantity = parseInt(quantity);
        this.updateLocalStorage();
      }
    },

    clearCart() {
      const userId = getCurrentUserId();
      if (!userId) return;
      this.allCartItems = this.allCartItems.filter(item => item.userId !== userId);
      this.updateLocalStorage();
    },

    updateLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.allCartItems));
    },

    login(jwt) {
      localStorage.setItem('jwt', jwt);
      this.isLoggedIn = true;
    },

    logout() {
      localStorage.removeItem('jwt');
      this.isLoggedIn = false;
      this.clearCart();
    },
  },
});

function getCurrentUserId() {
  const jwt = localStorage.getItem('jwt');
  if (!jwt) return null;
  try {
    return jwtDecode(jwt).sub;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}