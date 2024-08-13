
<<template>
  <div v-if="product" class="mt-6 sm:mt-8 lg:flex lg:items-start lg:max-w-6xl xl:max-w-7xl">
    <!-- Product Details -->
    <div class="product-details">
      <h1>{{ product.title }}</h1>
      <p>{{ product.description }}</p>
      <p>Price: ${{ product.price }}</p>
      <button @click="addToCartHandler">Add to Cart</button>
    </div>
  </div>
  <div v-else-if="error" class="text-center mt-4 text-red-500">
    <p>{{ error }}</p>
  </div>
  <div v-else class="text-center mt-4">
    <p>Loading product details...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '@/composables/useCartStore';

export default {
  setup() {
    const route = useRoute();
    const { addToCart } = useCartStore();
    const product = ref(null);
    const error = ref(null);

    const fetchProduct = async () => {
      const productId = route.params.id;
      try {
        const response = await fetch(`/api/products/${productId}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Product not found');
          } else {
            throw new Error('Server error');
          }
        }

        const contentType = response.headers.get('Content-Type');
        if (contentType && !contentType.includes('application/json')) {
          throw new Error('Server returned unexpected content type');
        }

        product.value = await response.json();
      } catch (e) {
        console.error('Failed to fetch product:', e);
        error.value = `Failed to load product details: ${e.message}. Please try again later.`;
      }
    };

    onMounted(() => {
      fetchProduct();
    });

    const addToCartHandler = () => {
      if (product.value) {
        addToCart(product.value);
      }
    };

    return {
      product,
      addToCartHandler,
      error,
    };
  },
};
</script>

<style scoped>
.product-details {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 600px;
  margin: 0 auto;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}
</style>