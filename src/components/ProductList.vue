<template>
  <div class="grid justify-center">
    <div class="max-w-7xl w-full mx-auto grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-4">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @compare="addToComparison"
      />
    </div>
  </div>
  
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import { useComparisonStore } from '@/composables/useComparisonStore';

export default {
  components: {
    ProductCard,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const { addToComparison } = useComparisonStore();

    return {
      addToComparison,
    };
  },
};
</script>

<style scoped>
/* Add any styles specific to the ProductList component here */
</style>
