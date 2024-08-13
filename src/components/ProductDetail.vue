<template>
  <div class="product-detail-container">
    <div class="image-container">
      <img :src="product.image" alt="Product Image" class="product-image" />
    </div>
    <div class="details-container">
      <h1 class="product-title">{{ product.title }}</h1>
      <p class="product-category">{{ product.category }}</p>
      <p class="product-price">${{ product.price }}</p>
      <p class="product-description">{{ product.description }}</p>
      <button @click="addToCart(product)" class="add-to-cart-btn">Add to Cart</button>
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
.product-detail-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.image-container {
  width: 50%;
  text-align: center;
}

.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.details-container {
  width: 50%;
  padding: 20px;
}

.product-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-category {
  font-size: 16px;
  color: gray;
  margin-bottom: 10px;
}

.product-price {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-description {
  margin-bottom: 20px;
}

.add-to-cart-btn {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-to-cart-btn:hover {
  background-color: #45a049;
}
</style>
