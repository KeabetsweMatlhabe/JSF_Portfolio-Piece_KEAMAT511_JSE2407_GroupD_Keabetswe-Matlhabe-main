<template>
  <div class="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded relative" role="alert">
    <strong class="font-bold">Error!</strong>
    <span class="block sm:inline">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: 'ErrorComponent',
  props: {
    error: {
      type: String,
      required: true
    }
  }
}
</script>