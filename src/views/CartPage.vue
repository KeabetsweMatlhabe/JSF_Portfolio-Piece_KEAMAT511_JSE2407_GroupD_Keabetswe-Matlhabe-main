<!-- CartPage.vue -->
<template>
  <div class="cart-container">
    <h1>Your Shopping Cart</h1>
    <div v-if="cartItems.length > 0">
      <ul>
        <li v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-details">
            <img :src="item.image" alt="Product Image" class="item-image" />
            <div class="item-info">
              <span class="item-name">{{ item.title }}</span>
              <span class="item-price">${{ item.price.toFixed(2) }}</span>
            </div>
          </div>
          <div class="item-actions">
            <input 
              type="number" 
              v-model.number="item.quantity" 
              @change="updateCart(item.id, item.quantity)" 
              min="1" 
              class="quantity-input"
            />
            <button @click="removeFromCart(item.id)" class="remove-btn">Remove</button>
          </div>
          <div class="item-total">${{ (item.price * item.quantity).toFixed(2) }}</div>
        </li>
      </ul>
      <div class="cart-summary">
        <p><strong>Total Items:</strong> {{ totalItems }}</p>
        <p><strong>Total Cost:</strong> ${{ totalCost }}</p>
        <button @click="clearCart" class="clear-cart-btn">Clear Cart</button>
      </div>
    </div>
    <div v-else class="empty-cart">
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
.cart-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.item-details {
  display: flex;
  align-items: center;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.item-info {
  display: flex;
  flex-direction: column;
}

.item-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.item-price {
  color: #6c757d;
}

.item-actions {
  display: flex;
  align-items: center;
}

.quantity-input {
  width: 60px;
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
}

.remove-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.remove-btn:hover {
  background-color: #c82333;
}

.item-total {
  font-weight: bold;
  color: #495057;
}

.cart-summary {
  margin-top: 20px;
  padding: 15px;
  background-color: #e9ecef;
  border-radius: 8px;
  text-align: center;
}

.cart-summary p {
  margin: 5px 0;
}

.clear-cart-btn {
  background-color: #ffc107;
  color: #212529;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.clear-cart-btn:hover {
  background-color: #e0a800;
}

.empty-cart {
  text-align: center;
  font-size: 18px;
  color: #6c757d;
  margin-top: 50px;
}
</style>
