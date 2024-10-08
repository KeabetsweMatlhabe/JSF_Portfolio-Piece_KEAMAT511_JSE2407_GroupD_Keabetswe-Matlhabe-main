<template>
  <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:max-w-6xl xl:max-w-7xl">
    <div class="mx-auto w-2/5 flex-none">
      <img :src="product.image" alt="" class="w-[90%] h-[90%]" />
    </div>
    <div class="mx-auto w-[90%] space-y-2">
      <h1 class="text-2xl md:text-4xl lg:text-4xl font-bold">{{ product.title }}</h1>
      <div class="flex gap-2">
        <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"></path>
        </svg>
        <div>{{ product.rating.rate }}</div>
        <div>Reviews: {{ product.rating.count }}</div>
      </div>
      <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">{{ product.category }}</span>
      <h3 class="text-xl md:text-2xl lg:text-2xl font-bold">${{ product.price }}</h3>
      <button 
      class="bg-cyan-700 hover:bg-cyan-900 w-[90%] md:w-[14rem] lg:w-[14rem] text-white font-bold py-2 px-4 rounded"
      @click="handleAddToCart"
      :disabled="!isLoggedIn"
    >
      {{ isLoggedIn ? 'Add To Cart' : 'Login to Add to Cart' }}
    </button>
      <h2 class="text-lg font-bold">Description</h2>
      <p>{{ product.description }}</p>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/composables/useCartStore';
import { ref, onMounted } from 'vue';

export default {
  props: {
    product: Object,
  },
  setup(props) {
    const { addToCart, isLoggedIn } = useCartStore();
    const loginStatus = ref(false);

    const handleAddToCart = () => {
      if (isLoggedIn.value) {
        addToCart(props.product);
      } else {
        // Redirect to login page or show login modal
        alert('Please log in to add items to the cart');
      }
    };

    onMounted(() => {
      loginStatus.value = isLoggedIn.value;
    });

    return {
      handleAddToCart,
      isLoggedIn: loginStatus,
    };
  },
};
</script>
