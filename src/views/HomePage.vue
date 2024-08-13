<template>
  <div>
    <nav class="navbar">
      <router-link to="/">Home</router-link>
      <router-link to="/wishList">Wish List</router-link>
      <router-link to="/cart" class="cart-link">
        Cart
        <CartCounter />
      </router-link>
      <button @click="logout" v-if="loggedIn">Logout</button>
      <router-link to="/login" v-else>Login</router-link>
    </nav>
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
import { useRouter } from 'vue-router';
import { useProductStore } from '@/composables/useProducts';
import { useCartStore } from '@/composables/useCartStore';
import FilterComponent from '@/components/FilterComponent.vue';
import SortComponent from '@/components/SortComponent.vue';
import ProductList from '@/components/ProductList.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import CartCounter from '@/components/CartCounter.vue';

export default {
  components: {
    FilterComponent,
    SortComponent,
    ProductList,
    ErrorComponent,
    CartCounter
  },
  setup() {
    const router = useRouter();
    const { products, loading, error, fetchProducts, filteredProducts, setFilterItem, setSearchTerm, setSorting } = useProductStore();
    const { cartCount, clearCartCount } = useCartStore();

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
      clearCartCount();
      router.push('/login');
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
      cartCount
    };
  },
};
</script>

<style scoped>
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

.cart-link {
  position: relative;
}
</style>