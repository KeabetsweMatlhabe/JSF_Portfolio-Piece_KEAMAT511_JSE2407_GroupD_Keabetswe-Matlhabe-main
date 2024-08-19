
<!-- src/views/ComparisonPage.vue -->
<template>
    <div v-if="cartStore.isLoggedIn">
      <h1 class="text-2xl font-bold mb-4">Product Comparison</h1>
      <div v-if="comparisonStore.comparisonList.length > 0">
        <table class="w-full border-collapse border">
          <thead>
            <tr>
              <th class="border p-2">Specification</th>
              <th v-for="product in comparisonStore.comparisonList" :key="product.id" class="border p-2">
                {{ product.title }}
                <button @click="comparisonStore.removeFromComparison(product.id)" class="ml-2 text-red-500">Remove</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border p-2">Image</td>
              <td v-for="product in comparisonStore.comparisonList" :key="product.id" class="border p-2">
                <img :src="product.image" :alt="product.title" class="w-24 h-24 object-contain mx-auto" />
              </td>
            </tr>
            <tr>
              <td class="border p-2">Description</td>
              <td v-for="product in comparisonStore.comparisonList" :key="product.id" class="border p-2">
                {{ product.description }}
              </td>
            </tr>
            <tr>
              <td class="border p-2">Price</td>
              <td v-for="product in comparisonStore.comparisonList" :key="product.id" class="border p-2">
                ${{ product.price.toFixed(2) }}
              </td>
            </tr>
            <tr>
              <td class="border p-2">Rating</td>
              <td v-for="product in comparisonStore.comparisonList" :key="product.id" class="border p-2">
                {{ product.rating }}
              </td>
            </tr>
          </tbody>
        </table>
        <button @click="comparisonStore.clearComparisonList" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">
          Clear Comparison List
        </button>
      </div>
      <div v-else>
        <p>No products added to comparison list yet.</p>
      </div>
    </div>
    <div v-else>
      <p>Please log in to access the comparison list.</p>
      <router-link to="/login" class="text-blue-500">Log In</router-link>
    </div>
  </template>
  
  <script>
  import { useCartStore } from '@/composables/useCartStore';
  import { useComparisonStore } from '@/composables/useComparisonStore';
  
  export default {
    setup() {
      const cartStore = useCartStore();
      const comparisonStore = useComparisonStore();
  
      return {
        cartStore,
        comparisonStore,
      };
    },
  };
  </script>
  