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
  setup() {
    const { addToCart } = useCartStore();

    return {
      addToCart,
    };
  },
};
</script>

<style scoped>
/* Styling for product details */
.product-detail {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.product-detail img {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.product-detail h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.product-detail p {
  font-size: 16px;
  margin-bottom: 20px;
}

.product-detail div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-detail button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.product-detail button:hover {
  background-color: #45a049;
}
</style>
