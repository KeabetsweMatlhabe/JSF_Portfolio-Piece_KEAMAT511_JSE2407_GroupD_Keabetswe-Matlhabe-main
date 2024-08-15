<!-- src/views/ComparisonPage.vue -->
<template>
    <div>
      <button @click="clearList">Clear List</button>
      <table v-if="comparisonList.length">
        <thead>
          <tr>
            <th v-for="(product, index) in comparisonList" :key="index">
              <img :src="product.image" :alt="product.title" width="100" />
              <div>{{ product.title }}</div>
              <div>{{ product.price }}</div>
              <div>{{ product.rating.rate }}</div>
              <button @click="removeFromComparison(product.id)">Remove</button>
            </th>
          </tr>
          <tr>
            <th v-for="(product, index) in comparisonList" :key="index">
              <div>{{ product.description }}</div>
            </th>
          </tr>
        </thead>
      </table>
      <p v-else>No products to compare.</p>
    </div>
  </template>
  
  <script>
  import { useComparisonStore } from '@/composables/useComparisonStore';
  
  export default {
    setup() {
      const { comparisonList, removeFromComparison, clearComparisonList } = useComparisonStore();
  
      const clearList = () => {
        clearComparisonList();
      };
  
      return {
        comparisonList,
        removeFromComparison,
        clearList
      };
    },
  };
  </script>
  