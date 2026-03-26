<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { theme as antTheme } from 'ant-design-vue';
import { useTheme } from '@/composables/useTheme';

const { isDarkMode, initTheme } = useTheme();

onMounted(() => {
  initTheme();
});

const themeConfig = computed(() => {
  return {
    algorithm: isDarkMode.value ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
    token: {
      // Primary colors matching the design
      colorPrimary: isDarkMode.value ? '#3399ff' : '#1890ff',
      colorInfo: isDarkMode.value ? '#3399ff' : '#1890ff',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#ff4d4f',

      // Typography
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontSize: 14,
      fontSizeLG: 16,
      fontSizeXL: 20,

      // Border radius
      borderRadius: 8,
      borderRadiusLG: 12,
      borderRadiusSM: 4,

      // Layout
      controlHeight: 32,
      controlHeightSM: 24,
      controlHeightLG: 40,

      // Colors (overridden by dark mode algorithm partially, but explicit setting helps)
      colorText: isDarkMode.value ? '#e0e0e0' : '#262626',
      colorTextSecondary: isDarkMode.value ? '#a0a0a0' : '#595959',
      colorTextDisabled: isDarkMode.value ? '#64748b' : '#bfbfbf',
      colorBorder: isDarkMode.value ? '#333333' : '#d9d9d9',
      colorBorderSecondary: isDarkMode.value ? '#1e1e1e' : '#f0f0f0',
      colorBgContainer: isDarkMode.value ? '#1e1e1e' : '#ffffff',
      colorBgLayout: isDarkMode.value ? '#121212' : '#f5f5f5',
    },
    components: {
      Button: {
        borderRadius: 8,
        borderRadiusLG: 12,
        controlHeight: 32,
        controlHeightLG: 40,
        controlHeightSM: 24,
      },
      Input: {
        borderRadius: 8,
        controlHeight: 32,
        controlHeightLG: 40,
      },
      Card: {
        borderRadius: 12,
      },
      Typography: {
        fontSize: 14,
        fontSizeLG: 16,
        fontSizeXL: 20,
      },
    },
  };
});
</script>

<template>
  <a-config-provider :theme="themeConfig">
    <RouterView />
  </a-config-provider>
</template>

<style>
#app {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--theme-bg-main, #ffffff);
  color: var(--theme-text-main, #191c1d);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}
</style>
