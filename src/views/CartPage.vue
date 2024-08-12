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
        <p>Total Cost: ${{ totalCost.toFixed(2) }}</p>
        <button @click="clearCart" class="clear-cart-btn">Clear Cart</button>
      </div>
    </div>
    <div v-else>
      <p>Your cart is empty.</p>
    </div>
  </div>
</template>

<script>
import {jwtDecode} from "jwt-decode";

export default {
  name: "CartPage",
  data() {
    return {
      cartItems: [],
    };
  },
  computed: {
    totalItems() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    totalCost() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  methods: {
    loadCart() {
      const savedCart = localStorage.getItem(`cart_${this.userId}`);
      this.cartItems = savedCart ? JSON.parse(savedCart) : [];
    },
    saveCart() {
      localStorage.setItem(`cart_${this.userId}`, JSON.stringify(this.cartItems));
    },
    updateCart(productId, quantity) {
      const item = this.cartItems.find((item) => item.id === productId);
      if (item) {
        item.quantity = quantity;
        this.saveCart();
      }
    },
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);
      this.saveCart();
    },
    clearCart() {
      this.cartItems = [];
      this.saveCart();
    },
  },
  created() {
    const token = localStorage.getItem("jwt");
    if (token) {
      const decoded = jwtDecode(token);
      this.userId = decoded.userId; 
      this.loadCart();
    } else {
      this.$router.push("/login");
    }
  },
  watch: {
    cartItems: {
      handler() {
        this.saveCart();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.cart-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.item-details {
  display: flex;
  align-items: center;
}

.item-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
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
  background-color: #ff0000;
  color: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.item-price {
  font-weight: bold;
}
</style>
