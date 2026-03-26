<script setup lang="ts">
interface FooterLink {
  label: string;
  href: string;
}

interface Props {
  title: string;
  links: FooterLink[];
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-col items-start gap-[24px]">
    <h3 class="text-sm font-bold leading-[20px] tracking-[1.4px] text-[var(--theme-text-secondary)] uppercase font-['Public_Sans'] flex items-center h-[20px] m-0">
      {{ title }}
    </h3>
    <nav class="flex flex-col items-start gap-[16px]">
      <a
        v-for="link in links"
        :key="link.label"
        :href="link.href"
        class="text-sm leading-[20px] text-[var(--theme-text-secondary)] transition-colors duration-200 hover:text-[var(--theme-primary)] dark:hover:text-[var(--theme-blue-accent)] font-['Public_Sans'] flex items-center"
      >
        {{ link.label }}
      </a>
    </nav>
  </div>
</template>

<style scoped>
</style>
