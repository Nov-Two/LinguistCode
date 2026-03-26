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
    <h3 class="text-sm font-bold leading-[20px] tracking-[1.4px] text-[#595959] uppercase font-['Public_Sans'] flex items-center h-[20px] m-0">
      {{ title }}
    </h3>
    <nav class="flex flex-col items-start gap-[16px]">
      <a
        v-for="link in links"
        :key="link.label"
        :href="link.href"
        class="text-sm leading-[20px] text-[#595959] transition-colors duration-200 hover:text-[#198eee] font-['Public_Sans'] flex items-center"
      >
        {{ link.label }}
      </a>
    </nav>
  </div>
</template>

<style scoped>
</style>
