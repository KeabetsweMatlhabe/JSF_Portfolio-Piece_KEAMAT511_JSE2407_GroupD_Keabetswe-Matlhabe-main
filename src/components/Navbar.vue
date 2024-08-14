<!-- Navbar.vue -->
<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- <router-link to="/" class="nav-logo">MyShop</router-link> -->
      <div class="nav-links">
        <!-- <router-link to="/cart" class="cart-link">
          Cart ({{ totalItems }})
        </router-link> -->
        <!-- <button @click="logout" v-if="loggedIn">Logout</button> -->
        <!-- <router-link to="/login" v-else>Login</router-link> -->
      </div>
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <router-link to="/">
          <button class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="../assets/online-shop.png" class="h-8" alt="SwiftCart Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">SwiftCart</span>
          </button>
        </router-link>
        <button
          @click="toggleNavbar"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"></path>
          </svg>
        </button>
        <div :class="[isNavbarOpen ? 'block' : 'hidden', 'w-full md:block md:w-auto']" id="navbar-default">
          <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-500 md:space-x-8 md:flex-row md:mt-0 md:border-0">
            <li>
              <router-link class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" to="/wishlist">Wishlist</router-link>
            </li>
            <router-link to="/cart" class="cart-link">
          Cart ({{ totalItems }})
        </router-link>
        
            <li v-if="isAuthenticated">
              <div class="relative inline-block">
                <router-link to="/cart">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 stroke-white cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
                  </svg>
                  <span class="absolute top-0 left-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">2</span>
                </router-link>
              </div>
            </li>
            <li v-if="isAuthenticated">
              <button @click="logout" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Logout</button>
            </li>
            <li v-else>
              <!-- <router-link class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" to="/login">Login</router-link> -->
             <button @click="logout" v-if="loggedIn">Logout</button> 
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useCartStore } from '@/composables/useCartStore';

export default {
  setup() {
    const { totalItems } = useCartStore();

    const loggedIn = computed(() => {
      return !!localStorage.getItem('jwt');
    });

    const logout = () => {
      localStorage.removeItem('jwt');
      localStorage.removeItem('cart');
      window.location.reload();
    };

    return {
      totalItems,
      loggedIn,
      logout,
    };
  },
};
</script>

<style scoped>
/* Styling for the navbar */
.navbar {
  background-color: #333;
  padding: 15px;
  color: white;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-logo {
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
}

.cart-link {
  margin-right: 20px;
  color: white;
  text-decoration: none;
}

.cart-link:hover {
  text-decoration: underline;
}

button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
}

button:hover {
  text-decoration: underline;
}
</style>


