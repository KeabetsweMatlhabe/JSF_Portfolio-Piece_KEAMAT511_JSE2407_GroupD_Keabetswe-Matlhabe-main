

import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios'; 

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlistItems = ref([]);

  const wishlistCount = computed(() => wishlistItems.value.length);

  async function fetchWishlist() {
    try {
      const response = await axios.get('/api/wishlist');
      wishlistItems.value = response.data;
      saveWishlistToLocalStorage();
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  }

  async function addToWishlist(product) {
    if (!wishlistItems.value.some(item => item.id === product.id)) {
      try {
        await axios.post('/api/wishlist', product);
        wishlistItems.value.push(product);
        saveWishlistToLocalStorage();
      } catch (error) {
        console.error('Error adding to wishlist:', error);
      }
    }
  }

  async function removeFromWishlist(productId) {
    try {
      await axios.delete(`/api/wishlist/${productId}`);
      wishlistItems.value = wishlistItems.value.filter(item => item.id !== productId);
      saveWishlistToLocalStorage();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  }

  async function clearWishlist() {
    try {
      await axios.delete('/api/wishlist');
      wishlistItems.value = [];
      saveWishlistToLocalStorage();
    } catch (error) {
      console.error('Error clearing wishlist:', error);
    }
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
  fetchWishlist(); // Fetch from API when the store is created

  return {
    wishlistItems,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    fetchWishlist,
  };
});