<template>
  
  <div :class="{ 'dark': isDarkMode }">
    <div id="app" >
    <Navbar />
    <button @click="toggleTheme" class="theme-toggle">
      {{ isDarkMode ? '☀️' : '🌙' }}
    </button>
    <router-view />
  </div>
  </div>
</template>

<script>
import { ref, onMounted, provide } from 'vue';
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
  setup() {
    const isDarkMode = ref(false);

    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value;
      localStorage.setItem('darkMode', isDarkMode.value);
      applyTheme();
    };

    const applyTheme = () => {
      document.documentElement.classList.toggle('dark', isDarkMode.value);
    };

    onMounted(() => {
      isDarkMode.value = localStorage.getItem('darkMode') === 'true';
      applyTheme();
    });

    provide('isDarkMode', isDarkMode);
    provide('toggleTheme', toggleTheme);

    return {
      isDarkMode,
      toggleTheme,
    };
  },
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
</style>