// useCartStore.js
import { reactive, computed } from 'vue';
import { jwtDecode } from 'jwt-decode';

export function useCartStore() {
  const state = reactive({
    cartItems: JSON.parse(localStorage.getItem('cart')) || [],
  });

  const getCurrentUserId = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return null;
    return jwtDecode(jwt).userId;
  };

  const addToCart = (product) => {
    const userId = getCurrentUserId();
    if (!userId) {
      alert('Please log in to add items to the cart');
      return;
    }

    const existingProduct = state.cartItems.find(
      (item) => item.id === product.id && item.userId === userId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      state.cartItems.push({ ...product, quantity: 1, userId });
    }

    updateLocalStorage();
  };

  const removeFromCart = (productId) => {
    const userId = getCurrentUserId();
    if (!userId) return;

    state.cartItems = state.cartItems.filter(
      (item) => item.id !== productId || item.userId !== userId
    );

    updateLocalStorage();
  };

  const updateCart = (productId, quantity) => {
    const userId = getCurrentUserId();
    if (!userId) return;

    const product = state.cartItems.find(
      (item) => item.id === productId && item.userId === userId
    );
    if (product) {
      product.quantity = quantity;
      updateLocalStorage();
    }
  };

  const clearCart = () => {
    const userId = getCurrentUserId();
    if (!userId) return;

    state.cartItems = state.cartItems.filter(item => item.userId !== userId);
    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(state.cartItems));
  };

  const cartItems = computed(() => {
    const userId = getCurrentUserId();
    return userId ? state.cartItems.filter(item => item.userId === userId) : [];
  });

  const cartCount = computed(() => 
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const totalItems = computed(() => cartItems.value.length);

  const totalCost = computed(() => 
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  );

  const clearCartCount = () => {
    const userId = getCurrentUserId();
    if (!userId) return;

    state.cartItems = state.cartItems.filter(item => item.userId !== userId);
    updateLocalStorage();
  };

  return {
    addToCart,
    removeFromCart,
    updateCart,
    clearCart,
    cartItems,
    cartCount,
    totalItems,
    totalCost,
    clearCartCount,
  };
}