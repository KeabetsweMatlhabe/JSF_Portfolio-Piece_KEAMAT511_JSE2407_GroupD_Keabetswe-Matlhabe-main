<!-- src/components/CartCounter.vue -->
<template>
    <span class="cart-counter">{{ cartCount }}</span>
  </template>
  
  <script>
  import { useCartStore } from '@/composables/useCartStore';
  
  export default {
    setup() {
      const { cartCount } = useCartStore();
      return { cartCount };
    }
  };
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