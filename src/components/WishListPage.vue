
<template>
    <div class="container mx-auto mt-8">
      <h1 class="text-3xl font-bold mb-4">My Wishlist</h1>
      <div v-if="wishlistStore.wishlistCount > 0">
        <div class="mb-4">
          <button @click="wishlistStore.clearWishlist" class="bg-red-500 text-white px-4 py-2 rounded">
            Clear Wishlist
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="item in wishlistStore.wishlistItems" :key="item.id" class="border p-4 rounded">
            <img :src="item.image" :alt="item.title" class="w-full h-48 object-contain mb-2">
            <h2 class="text-lg font-semibold">{{ item.title }}</h2>
            <p class="text-gray-600">${{ item.price }}</p>
            <div class="mt-4 flex justify-between">
              <button @click="addToCart(item)" class="bg-blue-500 text-white px-4 py-2 rounded">
                Add to Cart
              </button>
              <button @click="wishlistStore.removeFromWishlist(item.id)" class="bg-red-500 text-white px-4 py-2 rounded">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Your wishlist is empty.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { useWishlistStore } from '@/composables/useWishlistStore';
  import { useCartStore } from '@/composables/useCartStore';
  
  export default {
    setup() {
      const wishlistStore = useWishlistStore();
      const cartStore = useCartStore();
  
      function addToCart(item) {
        cartStore.addToCart(item);
        wishlistStore.removeFromWishlist(item.id);
      }
  
      return {
        wishlistStore,
        addToCart,
      };
    },
  };
  </script>