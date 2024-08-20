import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlistItems = ref(JSON.parse(localStorage.getItem('wishlist')) || []);

  const wishlistCount = computed(() => wishlistItems.value.length);

  watch(wishlistItems, (newItems) => {
    localStorage.setItem('wishlist', JSON.stringify(newItems));
  }, { deep: true });

  function addToWishlist(product) {
    if (!wishlistItems.value.some(item => item.id === product.id)) {
      wishlistItems.value.push(product);
    }
  }

  function removeFromWishlist(productId) {
    wishlistItems.value = wishlistItems.value.filter(item => item.id !== productId);
  }

  function clearWishlist() {
    wishlistItems.value = [];
  }

  async function syncWithAPI() {
    try {
      const response = await axios.get('/api/wishlist');
      const apiWishlist = response.data;
      wishlistItems.value = [...new Set([...wishlistItems.value, ...apiWishlist])];
    } catch (error) {
      console.error('Failed to sync wishlist with API', error);
    }
  }

  return {
    wishlistItems,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    syncWithAPI
  };
});

