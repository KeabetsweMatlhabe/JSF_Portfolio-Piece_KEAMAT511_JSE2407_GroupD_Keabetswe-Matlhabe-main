import { defineStore } from 'pinia';

export const useComparisonStore = defineStore('comparison', {
  state: () => ({
    comparisonList: [],
  }),
  actions: {
    addToComparison(product) {
      if (this.comparisonList.length < 5) {
        // Check if the product is already in the list
        if (!this.comparisonList.some(p => p.id === product.id)) {
          this.comparisonList.push(product);
        } else {
          alert('This product is already in the comparison list.');
        }
      } else {
        alert('You can only compare up to 5 products.');
      }
    },
    removeFromComparison(productId) {
      this.comparisonList = this.comparisonList.filter(p => p.id !== productId);
    },
    clearComparisonList() {
      this.comparisonList = [];
    },
  },
  getters: {
    comparisonCount: (state) => state.comparisonList.length,
  },
});

