<template>
  <div id="app" :class="{ 'dark': theme === 'dark' }">
    <!-- Theme toggle button -->
    <button @click="toggleTheme" class="theme-toggle">
      {{ theme === 'light' ? '🌙' : '☀️' }}
    </button>
    
    <!-- The Navbar will persist across all pages -->
    <Navbar />
    
    <!-- The router-view will display the component corresponding to the current route -->
    <router-view />
  </div>
</template>

<script>
import { useThemeStore } from '@/composables/useThemeStore';
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
  setup() {
    const { theme, toggleTheme } = useThemeStore();

    return { theme, toggleTheme };
  }
};
</script>

<style>
.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

/* Import or include your theme styles here */
@import '@/assets/theme.css';
</style>