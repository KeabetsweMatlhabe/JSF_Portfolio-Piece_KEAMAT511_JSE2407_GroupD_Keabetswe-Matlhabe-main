
<template>
  <div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4">
    <ProductDetail :product="product" v-if="product" />
    <div v-else class="text-center py-8">Loading...</div>
    <button @click="goBack" class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
      Back to Products
    </button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import ProductDetail from '@/components/ProductDetail.vue';

export default {
  components: { ProductDetail },
  setup() {
    const product = ref(null);
    const route = useRoute();
    const router = useRouter();
    const productId = route.params.id;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        product.value = response.data;
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    const goBack = () => {
      router.push('/');
    };

    onMounted(fetchProduct);

    return { product, goBack };
  },
};
</script>