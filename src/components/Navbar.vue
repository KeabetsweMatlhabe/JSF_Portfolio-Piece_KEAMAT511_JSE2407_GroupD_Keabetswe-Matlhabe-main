<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">MyShop</router-link>
      <div class="nav-links">
        <router-link to="/cart" class="cart-link">
          Cart ({{ totalItems }})
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { useCartStore } from '@/composables/useCartStore';

export default {
  setup() {
    const { totalItems } = useCartStore();

    return {
      totalItems,
    };
  },
};
</script>

<style scoped>
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
  gap: 20px;
}

.cart-link {
  font-size: 18px;
  color: white;
  text-decoration: none;
}

.cart-link:hover {
  text-decoration: underline;
}
</style>
