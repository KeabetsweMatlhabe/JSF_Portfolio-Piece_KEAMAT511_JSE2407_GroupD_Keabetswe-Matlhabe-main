<template>
  <nav class="navbar bg-gray-800 p-4">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
      <router-link to="/">
        <button class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="../assets/online-shop.png" class="h-8" alt="SwiftCart Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">SwiftCart</span>
        </button>
      </router-link>
      <ul class="flex space-x-8">
        <li>
          <router-link to="/wishlist" class="text-white hover:text-blue-500">Wishlist</router-link>
        </li>
        <li>
          <router-link to="/cart" class="text-white hover:text-blue-500">
            Cart ({{ cartStore.cartCount }})
          </router-link>
        </li>
        <li v-if="cartStore.isLoggedIn">
          <button @click="handleLogout" class="text-white hover:text-blue-500">Logout</button>
        </li>
        <li v-else>
          <router-link to="/login" class="text-white hover:text-blue-500">Login</router-link>
        </li>
        <li v-if="cartStore.isLoggedIn">
      <router-link to="/comparison" class="text-white hover:text-blue-500">
        Compare ({{ comparisonStore.comparisonCount }})
      </router-link>
    </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useCartStore } from '@/composables/useCartStore';
import { useRouter } from 'vue-router';
import { useComparisonStore } from '@/composables/useComparisonStore';

export default {
  setup() {
    const cartStore = useCartStore();
    const comparisonStore = useComparisonStore();
    const router = useRouter();
    

    const handleLogout = () => {
      cartStore.logout();
      comparisonStore.clearComparisonList();
      router.push('/login');
    };

    return {
      cartStore,
      comparisonStore,
      handleLogout,
    };
  },
};
</script>