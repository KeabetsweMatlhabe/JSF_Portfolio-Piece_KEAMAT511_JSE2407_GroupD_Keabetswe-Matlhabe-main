
import { ref, watch } from 'vue';

const theme = ref(localStorage.getItem('theme') || 'light');

export function useThemeStore() {
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', theme.value);
    applyTheme();
  };

  const applyTheme = () => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme.value);
  };

  watch(theme, applyTheme, { immediate: true });

  return { theme, toggleTheme };
}