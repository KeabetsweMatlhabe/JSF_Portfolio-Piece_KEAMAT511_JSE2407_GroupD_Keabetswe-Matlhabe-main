<template>
  <!-- Wishlist Carousel -->
  <div v-if="wishlistStore.wishlistCount > 0" class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Your Wishlist</h2>
      <div class="flex overflow-x-auto space-x-4 pb-4">
        <div v-for="item in wishlistStore.wishlistItems" :key="item.id" class="flex-none w-64">
          <div class="border p-4 rounded">
            <img :src="item.image" :alt="item.title" class="w-full h-40 object-contain mb-2">
            <h3 class="text-lg font-semibold truncate">{{ item.title }}</h3>
            <p class="text-gray-600">${{ item.price }}</p>
            <button @click="viewDetails(item)" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  <div class="bg-white dark:bg-gray-800 text-black dark:text-white">
    <div class="grid lg:flex gap-y-4 gap-x-48 lg:items-start mt-3 mx-auto justify-center">
      <FilterComponent @filter="handleFilter" @search="handleSearch" />
      <SortComponent @sort="handleSort" />
    </div>
    <div v-if="loading">
      <p>Loading products...</p>
    </div>
    <div v-if="error">
      <ErrorComponent :error="error" />
    </div>
    <ProductList v-else :products="filteredProducts" />

    
  </div>
</template>

<script>
import { onMounted, computed, inject } from 'vue';
import { useProductStore } from '@/composables/useProducts';
import FilterComponent from '@/components/FilterComponent.vue';
import SortComponent from '@/components/SortComponent.vue';
import ProductList from '@/components/ProductList.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import { useWishlistStore } from '@/composables/useWishlistStore';
import { useRouter } from 'vue-router';

export default {
  components: {
    FilterComponent,
    SortComponent,
    ProductList,
    ErrorComponent,
  },
  setup() {
    const { products, loading, error, fetchProducts, filteredProducts, setFilterItem, setSearchTerm, setSorting } = useProductStore();
    const wishlistStore = useWishlistStore();
    const isDarkMode = inject('isDarkMode');
    const router = useRouter();

    onMounted(async () => {
      await fetchProducts();
    });

    const handleSort = (sortOption) => {
      setSorting(sortOption);
    };

    const handleFilter = (filterOption) => {
      setFilterItem(filterOption);
    };

    const handleSearch = (searchTerm) => {
      setSearchTerm(searchTerm);
    };

    const loggedIn = computed(() => {
      return !!localStorage.getItem('jwt');
    });

    const logout = () => {
      localStorage.removeItem('jwt');
      router.push('/login');
    };

    function viewDetails(item) {
      router.push({ name: 'ProductDetail', params: { id: item.id } });
    }

    return {
      products,
      loading,
      error,
      filteredProducts,
      handleSort,
      handleFilter,
      handleSearch,
      loggedIn,
      logout,
      wishlistStore,
      isDarkMode,
      viewDetails,
    };
  },
};
</script>
<style>

.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.form-group {
  margin-bottom: 20px;
}

.password-input {
  display: flex;
  align-items: center;
}

.password-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
}

.password-input button {
  padding: 10px;
  border: 1px solid #ccc;
  border-left: none;
  border-radius: 0 5px 5px 0;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.password-input button:hover {
  background-color: #0056b3;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

button[type="submit"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button[type="submit"]:hover:not(:disabled) {
  background-color: #0056b3;
}

.loading-message, .error-message {
  margin-top: 20px;
  font-size: 14px;
}

.error-message {
  color: red;
}

.loading-message {
  color: green;
}

/* Navbar styling */
.navbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
}

.navbar a {
  color: #fff;
  text-decoration: none;
  padding: 10px;
}

.navbar a:hover {
  text-decoration: underline;
}

.navbar button {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 10px;
}

.navbar button:hover {
  text-decoration: underline;
}
</style>
