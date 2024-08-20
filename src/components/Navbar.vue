<template>
  <nav class="navbar bg-gray-800 dark:bg-gray-900 p-4 shadow-md">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
      <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="../assets/online-shop.png" class="h-10 w-10" alt="SwiftCart Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white dark:text-gray-200 hover:text-blue-400 transition duration-300">SwiftCart</span>
      </router-link>
      <ul class="flex space-x-6 md:space-x-8">
        <li>
          <router-link to="/wishlist" class="text-white dark:text-gray-200 hover:text-blue-400 transition duration-300 flex items-center relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
            </svg>
            Wishlist
            <span v-if="wishlistCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {{ wishlistCount }}
            </span>
          </router-link>
        </li>
        <li>
          <router-link to="/cart" class="text-white dark:text-gray-200 hover:text-blue-400 transition duration-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Cart ({{ cartStore.cartCount }})
          </router-link>
        </li>
        <li v-if="cartStore.isLoggedIn">
          <button @click="handleLogout" class="text-white dark:text-gray-200 hover:text-blue-400 transition duration-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
            </svg>
            Logout
          </button>
        </li>
        <li v-else>
          <router-link to="/login" class="text-white dark:text-gray-200 hover:text-blue-400 transition duration-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Login
          </router-link>
        </li>
        <li v-if="cartStore.isLoggedIn">
          <router-link to="/comparison" class="text-white dark:text-gray-200 hover:text-blue-400 transition duration-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Compare ({{ comparisonStore.comparisonCount }})
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useCartStore } from '@/composables/useCartStore';
import { useWishlistStore } from '@/composables/useWishlistStore';
import { useComparisonStore } from '@/composables/useComparisonStore';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

export default {
  setup() {
    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();
    const comparisonStore = useComparisonStore();
    const router = useRouter();
    
    const wishlistCount = computed(() => wishlistStore.wishlistCount);

    const handleLogout = () => {
      cartStore.logout();
      comparisonStore.clearComparisonList();
      router.push('/login');
    };

    return {
      cartStore,
      comparisonStore,
      wishlistCount,
      handleLogout,
    };
  },
};
</script>

<style scoped>
.navbar {
  @apply sticky top-0 z-50;
}

@media (max-width: 640px) {
  .navbar ul {
    @apply flex-col items-center space-y-4;
  }
}
</style>