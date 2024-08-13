// useCartStore.js
import { reactive, computed } from 'vue';
import { jwtDecode } from 'jwt-decode';

export function useCartStore() {
  const state = reactive({
    cartItems: JSON.parse(localStorage.getItem('cart')) || [],
  });

  const addToCart = (product) => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      alert('Please log in to add items to the cart');
      return;
    }
    const userId = jwtDecode(jwt).userId;

    const existingProduct = state.cartItems.find(
      (item) => item.id === product.id && item.userId === userId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      state.cartItems.push({ ...product, quantity: 1, userId });
    }

    localStorage.setItem('cart', JSON.stringify(state.cartItems));
  };

  const removeFromCart = (productId) => {
    const jwt = localStorage.getItem('jwt');
    const userId = jwtDecode(jwt).userId;

    state.cartItems = state.cartItems.filter(
      (item) => item.id !== productId || item.userId !== userId
    );

    localStorage.setItem('cart', JSON.stringify(state.cartItems));
  };

  const updateCart = (productId, quantity) => {
    const jwt = localStorage.getItem('jwt');
    const userId = jwtDecode(jwt).userId;

    const product = state.cartItems.find(
      (item) => item.id === productId && item.userId === userId
    );
    if (product) {
      product.quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    }
  };

  const clearCart = () => {
    const jwt = localStorage.getItem('jwt');
    const userId = jwtDecode(jwt).userId;

    state.cartItems = state.cartItems.filter(item => item.userId !== userId);
    localStorage.setItem('cart', JSON.stringify(state.cartItems));
  };

  const cartCount = computed(() =>
    state.cartItems.reduce((sum, item) => sum + item.quantity, 0)
  );

  const totalItems = computed(() => state.cartItems.length);
  const totalCost = computed(() =>
    state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  );

  return {
    addToCart,
    removeFromCart,
    updateCart,
    clearCart,
    cartItems: state.cartItems,
    cartCount,
    totalItems,
    totalCost,
  };
}
