<template>
  <div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 min-h-screen">
    <div v-if="cartStore.isLoggedIn" class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold mb-6 text-center">Product Comparison</h1>
      <div v-if="comparisonStore.comparisonList.length > 0">
        <div class="overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="border border-gray-300 dark:border-gray-600 p-3 font-semibold text-left">Specification</th>
                <th v-for="product in comparisonStore.comparisonList" :key="product.id" class="border border-gray-300 dark:border-gray-600 p-3 font-semibold text-left">
                  <div class="flex justify-between items-center">
                    <span>{{ product.title }}</span>
                    <button @click="comparisonStore.removeFromComparison(product.id)" class="ml-2 text-red-500 hover:text-red-600 transition duration-150 ease-in-out">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 dark:border-gray-600 p-3 font-medium">Image</td>
                <td v-for="product in comparisonStore.comparisonList" :key="product.id" class="border border-gray-300 dark:border-gray-600 p-3">
                  <img :src="product.image" :alt="product.title" class="w-32 h-32 object-contain mx-auto" />
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 dark:border-gray-600 p-3 font-medium">Description</td>
                <td v-for="product in comparisonStore.comparisonList" :key="product.id" class="border border-gray-300 dark:border-gray-600 p-3">
                  {{ product.description }}
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 dark:border-gray-600 p-3 font-medium">Price</td>
                <td v-for="product in comparisonStore.comparisonList" :key="product.id" class="border border-gray-300 dark:border-gray-600 p-3">
                  <span class="font-semibold">${{ product.price.toFixed(2) }}</span>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 dark:border-gray-600 p-3 font-medium">Rating</td>
                <td v-for="product in comparisonStore.comparisonList" :key="product.id" class="border border-gray-300 dark:border-gray-600 p-3">
                  <div class="flex items-center">
                    <span class="mr-1">{{ product.rating }}</span>
                    <div class="flex">
                      <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" 
                           :class="[
                             'h-5 w-5', 
                             i <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                           ]" 
                           viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-6 text-center">
          <button @click="comparisonStore.clearComparisonList" class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
            Clear Comparison List
          </button>
        </div>
      </div>
      <div v-else class="text-center py-12">
        <p class="text-xl">No products added to comparison list yet.</p>
      </div>
    </div>
    <div v-else class="text-center py-12">
      <p class="text-xl mb-4">Please log in to access the comparison list.</p>
      <router-link to="/login" class="text-blue-500 hover:text-blue-600 underline">Log In</router-link>
    </div>
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
