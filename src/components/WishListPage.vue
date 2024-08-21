<template>
  <div class="container mx-auto mt-8">
    <h1 class="text-3xl font-bold mb-4">My Wishlist</h1>
    <div v-if="wishlistStore.wishlistCount > 0">
      <div class="mb-4 flex justify-between items-center">
        <div>
          <label for="sort" class="mr-2">Sort by:</label>
          <select id="sort" v-model="sortBy" @change="sortWishlist" class="p-2 border rounded">
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div>
          <label for="filter" class="mr-2">Filter:</label>
          <input id="filter" v-model="filterText" @input="filterWishlist" class="p-2 border rounded" placeholder="Enter keyword">
        </div>
        <button @click="clearWishlist" class="bg-red-500 text-white px-4 py-2 rounded">
          Clear Wishlist
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="item in filteredAndSortedWishlistItems" :key="item.id" class="border p-4 rounded">
          <img :src="item.image" :alt="item.title" class="w-full h-48 object-contain mb-2">
          <h2 class="text-lg font-semibold">{{ item.title }}</h2>
          <p class="text-gray-600">${{ item.price }}</p>
          <div class="mt-4 flex justify-between">
            <button @click="addToCart(item)" class="bg-blue-500 text-white px-4 py-2 rounded">
              Add to Cart
            </button>
            <button @click="removeFromWishlist(item.id)" class="bg-red-500 text-white px-4 py-2 rounded">
              Remove
            </button>
          </div>
          <button @click="viewDetails(item)" class="mt-2 bg-gray-500 text-white px-4 py-2 rounded w-full">
            View Details
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Your wishlist is empty.</p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useWishlistStore } from '@/composables/useWishlistStore';
import { useCartStore } from '@/composables/useCartStore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const wishlistStore = useWishlistStore();
    const cartStore = useCartStore();
    const router = useRouter();
    const sortBy = ref('name');
    const filterText = ref('');

    const filteredAndSortedWishlistItems = computed(() => {
      let items = wishlistStore.wishlistItems;

      if (filterText.value) {
        items = items.filter(item => 
          (item.title && item.title.toLowerCase().includes(filterText.value.toLowerCase())) ||
          (item.category && item.category.toLowerCase().includes(filterText.value.toLowerCase()))
        );
      }

      return items.sort((a, b) => {
        if (sortBy.value === 'name') {
          return (a.title || '').localeCompare(b.title || '');
        } else if (sortBy.value === 'price') {
          return a.price - b.price;
        }
        return 0;
      });
    });

    function addToCart(item) {
      cartStore.addToCart(item);
      wishlistStore.removeFromWishlist(item.id);
    }

    function viewDetails(item) {
      router.push({ name: 'ProductDetail', params: { id: item.id } });
    }

    function clearWishlist() {
      wishlistStore.clearWishlist();
      cartStore.clearCart(); // Clear the cart when clearing the wishlist
    }

    function removeFromWishlist(id) {
      wishlistStore.removeFromWishlist(id);
    }

    return {
      wishlistStore,
      filteredAndSortedWishlistItems,
      addToCart,
      viewDetails,
      sortBy,
      filterText,
      sortWishlist: () => {}, // Handled by computed property
      filterWishlist: () => {}, // Handled by computed property
      clearWishlist,
      removeFromWishlist,
    };
  },
};
</script>

<style scoped>
/* Dark mode and other styling */
.container {
  @apply bg-white dark:bg-gray-800 dark:text-white;
}
button {
  @apply dark:bg-gray-700 dark:text-white;
}
select, input {
  @apply dark:bg-gray-700 dark:text-white;
}
.border {
  @apply dark:border-gray-700;
}
</style>
