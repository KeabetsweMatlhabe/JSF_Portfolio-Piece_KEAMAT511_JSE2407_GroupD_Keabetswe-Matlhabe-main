
</script>
<template>
  <div class="container mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-5">Your Cart</h1>
    <div v-if="cartStore.cartItems.length === 0" class="text-lg">
      Your cart is empty.
    </div>
    <div v-else>
      <div v-for="item in cartStore.cartItems" :key="item.id" class="flex items-center justify-between border-b py-4">
        <div class="flex items-center">
          <img :src="item.image" alt="Product image" class="w-20 h-20 object-cover mr-4">
          <div>
            <h2 class="text-lg font-semibold">{{ item.title }}</h2>
            <p class="text-gray-600">${{ item.price }}</p>
          </div>
        </div>
        <div class="flex items-center">
          <input 
            type="number" 
            v-model="item.quantity" 
            @input="cartStore.updateCart(item.id, $event.target.value)"
            min="1"
            class="w-16 text-center border rounded-md mr-4"
          >
          <button @click="cartStore.removeFromCart(item.id)" class="text-red-500">Remove</button>
        </div>
      </div>
      <div class="mt-8">
        <p class="text-xl font-semibold">Total Items: {{ cartStore.totalItems }}</p>
        <p class="text-xl font-semibold">Total Cost: ${{ cartStore.totalCost }}</p>
        <button @click="cartStore.clearCart" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Clear Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/composables/useCartStore';

export default {
  setup() {
    const cartStore = useCartStore();

    return {
      cartStore,
    };
  },
};
</script>
</script>
  <style scoped>
  .cart-counter {
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 12px;
    position: absolute;
    top: -8px;
    right: -8px;
  }
  </style>