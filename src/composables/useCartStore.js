import { reactive, computed, ref } from 'vue';
import { jwtDecode } from 'jwt-decode';

export function useCartStore() {
  const state = reactive({
    allCartItems: JSON.parse(localStorage.getItem('cart')) || [],
  });

  const isLoggedIn = ref(!!localStorage.getItem('jwt'));

  const getCurrentUserId = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return null;
    try {
      return jwtDecode(jwt).userId;
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  };

  const cartItems = computed(() => {
    const userId = getCurrentUserId();
    return userId ? state.allCartItems.filter(item => item.userId === userId) : [];
  });

  const addToCart = (product) => {
    if (!isLoggedIn.value) {
      alert('Please log in to add items to the cart');
      return;
    }
    const userId = getCurrentUserId();
    if (!userId) return;

    const existingProduct = state.allCartItems.find(
      (item) => item.id === product.id && item.userId === userId
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      state.allCartItems.push({ ...product, quantity: 1, userId });
    }
    updateLocalStorage();
  };

  const removeFromCart = (productId) => {
    const userId = getCurrentUserId();
    if (!userId) return;
    state.allCartItems = state.allCartItems.filter(
      (item) => !(item.id === productId && item.userId === userId)
    );
    updateLocalStorage();
  };

  const updateCart = (productId, quantity) => {
    const userId = getCurrentUserId();
    if (!userId) return;
    const product = state.allCartItems.find(
      (item) => item.id === productId && item.userId === userId
    );
    if (product) {
      product.quantity = parseInt(quantity);
      updateLocalStorage();
    }
  };

  const clearCart = () => {
    const userId = getCurrentUserId();
    if (!userId) return;
    state.allCartItems = state.allCartItems.filter(item => item.userId !== userId);
    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(state.allCartItems));
  };

  const cartCount = computed(() => 
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const totalItems = computed(() => cartItems.value.length);

  const totalCost = computed(() => 
    Number(cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2))
  );

  const login = (jwt) => {
    localStorage.setItem('jwt', jwt);
    isLoggedIn.value = true;
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    isLoggedIn.value = false;
    clearCart();
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
    login,
    logout,
    isLoggedIn,
  };
}