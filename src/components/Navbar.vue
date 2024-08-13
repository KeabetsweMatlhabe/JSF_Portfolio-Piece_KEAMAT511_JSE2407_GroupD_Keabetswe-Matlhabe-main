<!-- Navbar.vue -->
<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">MyShop</router-link>
      <div class="nav-links">
        <router-link to="/cart" class="cart-link">
          Cart ({{ totalItems }})
        </router-link>
        <button @click="logout" v-if="loggedIn">Logout</button>
        <router-link to="/login" v-else>Login</router-link>
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


