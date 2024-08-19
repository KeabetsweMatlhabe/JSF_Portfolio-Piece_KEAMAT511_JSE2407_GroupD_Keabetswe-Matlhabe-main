
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlistItems = ref([]);

  const wishlistCount = computed(() => wishlistItems.value.length);

  function addToWishlist(product) {
    if (!wishlistItems.value.some(item => item.id === product.id)) {
      wishlistItems.value.push(product);
      saveWishlistToLocalStorage();
    }
  }

  function removeFromWishlist(productId) {
    wishlistItems.value = wishlistItems.value.filter(item => item.id !== productId);
    saveWishlistToLocalStorage();
  }

  function clearWishlist() {
    wishlistItems.value = [];
    saveWishlistToLocalStorage();
  }

  function saveWishlistToLocalStorage() {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems.value));
  }

  function loadWishlistFromLocalStorage() {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      wishlistItems.value = JSON.parse(storedWishlist);
    }
  }

  // Call this function when the store is created
  loadWishlistFromLocalStorage();

  return {
    wishlistItems,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
  };
});