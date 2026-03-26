import { ref, onMounted } from 'vue';

const isDarkMode = ref(false);

export function useTheme() {
  const initTheme = () => {
    // Check localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      isDarkMode.value = savedTheme === 'dark';
    } else {
      // Check system preference
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    applyTheme();
  };

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
    applyTheme();
  };

  const applyTheme = () => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  onMounted(() => {
    // We can call initTheme here if we want, but it's better to call it once in App.vue
  });

  return {
    isDarkMode,
    initTheme,
    toggleTheme,
  };
}
