<template>
  <div class="product-detail">
    <img :src="product.image" alt="Product Image" />
    <h1>{{ product.title }}</h1>
    <p>{{ product.description }}</p>
    <div>
      <span>${{ product.price }}</span>
      <button @click="addToCart(product)">Add to Cart</button>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/composables/useCartStore';

export default {
  props: {
    product: Object,
  },
  setup(props) {
    const { addToCart } = useCartStore();

    return {
      addToCart,
    };
  },
};
</script>

<style scoped>
/* Add styles here */
</style>
