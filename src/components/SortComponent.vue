<template>
  <div class="flex sm:w-[95%] max-w-[21rem] md:w-full">
    <label for="sort"  class="w-20 my-auto font-semibold text-gray-900 dark:text-gray-100">Sort by: </label>
    <select
      @change="handleSort"
      v-model="sorting"
      id="sort"
        class="p-2.5 w-full text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 rounded-e-lg border-s-gray-50 dark:border-s-gray-700 border-s-2 border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="default">Default</option>
      <option value="low">Price: Low to High</option>
      <option value="high">Price: High to Low</option>
    </select>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'SortComponent',
  emits: ['sort'], // Declare custom events
  props: {
    initialSort: {
      type: String,
      default: 'default',
    },
  },
  setup(_, { emit }) {
    const sorting = ref('default');

    watch(sorting, (newValue) => {
      emit('sort', newValue);
    });

    const handleSort = (event) => {
      sorting.value = event.target.value;
    };

    return { sorting, handleSort };
  },
};
</script>
