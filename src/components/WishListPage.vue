
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Your Wishlist</h1>

    <div v-if="wishlistItems.length === 0" class="text-gray-600 text-center">
      Your wishlist is empty.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="product in wishlistItems" :key="product.id" class="p-4 border rounded-lg">
        <img :src="product.image" alt="Product Image" class="w-full h-32 object-contain" />
        <h2 class="text-xl font-semibold mt-2">{{ product.title }}</h2>
        <p class="text-gray-600 mt-1">${{ product.price }}</p>

        <div class="mt-4 flex justify-between">
          <button @click="removeFromWishlist(product.id)" class="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-800 transition-colors">Remove</button>
          <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }" class="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-800 transition-colors">View Details</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useWishlistStore } from '@/composables/useWishlistStore';

export default {
  name: 'WishlistPage',
  setup() {
    const wishlistStore = useWishlistStore();

    const removeFromWishlist = (productId) => {
      wishlistStore.removeFromWishlist(productId);
    };

    return {
      wishlistItems: wishlistStore.wishlistItems,
      removeFromWishlist,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
