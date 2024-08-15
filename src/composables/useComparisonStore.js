// src/composables/useComparisonStore.js
import { ref } from 'vue';

export function useComparisonStore() {
  const comparisonList = ref([]);

  const addToComparison = (product) => {
    if (comparisonList.value.length < 5) { // Limit to 5 items
      comparisonList.value.push(product);
    } else {
      alert('You can only compare up to 5 products.');
    }
  };

  const removeFromComparison = (productId) => {
    comparisonList.value = comparisonList.value.filter(p => p.id !== productId);
  };

  const clearComparisonList = () => {
    comparisonList.value = [];
  };

  return {
    comparisonList,
    addToComparison,
    removeFromComparison,
    clearComparisonList,
  };
}
