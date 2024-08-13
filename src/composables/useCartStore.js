import { ref, computed } from 'vue';
import { jwtDecode } from 'jwt-decode';

export function useCartStore() {
  const cartItems = ref([]);
  const userId = ref(null);

  const loadCart = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const decoded = jwtDecode(token);
      userId.value = decoded.userId;
      const savedCart = localStorage.getItem(`cart_${userId.value}`);
      cartItems.value = savedCart ? JSON.parse(savedCart) : [];
    }
  };

  const saveCart = () => {
    if (userId.value) {
      localStorage.setItem(`cart_${userId.value}`, JSON.stringify(cartItems.value));
    }
  };

  const addToCart = (product) => {
    const item = cartItems.value.find((item) => item.id === product.id);
    if (item) {
      item.quantity += 1;
    } else {
      cartItems.value.push({ ...product, quantity: 1 });
    }
    saveCart();
  };

  const removeFromCart = (productId) => {
    cartItems.value = cartItems.value.filter((item) => item.id !== productId);
    saveCart();
  };

  const clearCart = () => {
    cartItems.value = [];
    saveCart();
  };

  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  });

  const totalCost = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  });

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    totalCost,
    loadCart,
  };
}
