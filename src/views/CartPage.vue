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
            <input type="number" v-model.number="item.quantity" @change="updateCart(item.id, item.quantity)" min="1" />
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
    const { cartItems, removeFromCart, updateCart, clearCart, totalItems, totalCost } = useCartStore();

    return {
      cartItems,
      removeFromCart,
      updateCart,
      clearCart,
      totalItems,
      totalCost,
    };
  },
};
</script>

<style scoped>
.cart-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.item-details {
  display: flex;
  align-items: center;
}

.item-image {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

.item-name {
  font-weight: bold;
}

.item-actions {
  display: flex;
  align-items: center;
}

.item-actions input {
  width: 50px;
  margin-right: 10px;
}

.clear-cart-btn {
  background-color: #ff4d4d;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.clear-cart-btn:hover {
  background-color: #ff1a1a;
}

.item-price {
  font-weight: bold;
}
</style>
