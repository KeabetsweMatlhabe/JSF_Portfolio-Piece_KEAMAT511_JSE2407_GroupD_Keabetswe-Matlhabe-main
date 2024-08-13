<!-- CartPage.vue -->
<template>
  <div class="cart-container">
    <h1>Your Shopping Cart</h1>
    <div v-if="cartItems.length > 0">
      <ul>
        <li v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-details">
            <img :src="item.image" alt="Product Image" class="item-image" />
            <span class="item-name">{{ item.title }}</span>
          </div>
          <div class="item-actions">
            <input 
              type="number" 
              v-model.number="item.quantity" 
              @change="updateCart(item.id, item.quantity)" 
              min="1" 
            />
            <button @click="removeFromCart(item.id)">Remove</button>
          </div>
          <div class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</div>
        </li>
      </ul>
      <div class="cart-summary">
        <p>Total Items: {{ totalItems }}</p>
        <p>Total Cost: ${{ totalCost }}</p>
        <button @click="clearCart" class="clear-cart-btn">Clear Cart</button>
      </div>
    </div>
    <div v-else>
      <p>Your cart is empty.</p>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/composables/useCartStore';

export default {
  setup() {
    const { 
      cartItems, 
      removeFromCart, 
      updateCart, 
      clearCart, 
      totalItems, 
      totalCost,
      cartCount 
    } = useCartStore();

    return {
      cartItems,
      removeFromCart,
      updateCart,
      clearCart,
      totalItems,
      totalCost,
      cartCount
    };
  },
};
</script>

<style scoped>
/* Styling remains the same as in your original component */
</style>