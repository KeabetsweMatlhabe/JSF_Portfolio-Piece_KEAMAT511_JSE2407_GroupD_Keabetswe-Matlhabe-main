<template>
  <div>
   
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
import { onMounted, computed } from 'vue';
import { useProductStore } from '@/composables/useProducts';
import FilterComponent from '@/components/FilterComponent.vue';
import SortComponent from '@/components/SortComponent.vue';
import ProductList from '@/components/ProductList.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import { useWishlistStore } from '@/composables/useWishlistStore';

export default {
  components: {
    FilterComponent,
    SortComponent,
    ProductList,
    ErrorComponent,
    useWishlistStore
  },
  setup() {
    const { products, loading, error, fetchProducts, filteredProducts, setFilterItem, setSearchTerm, setSorting } = useProductStore();
    const wishlistStore = useWishlistStore();
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
      this.$router.push('/login');
    };

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
      wishlistStore
    };
  },
};
</script>

<style>
/* Add styles for the login form */
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
