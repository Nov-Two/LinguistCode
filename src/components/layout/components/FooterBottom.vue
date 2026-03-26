<script setup lang="ts">
interface FooterPolicy {
  label: string;
  href: string;
}

const policies: FooterPolicy[] = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
];
</script>

<template>
  <div class="flex flex-col items-center justify-between self-stretch pt-[31px] border-t border-[var(--theme-border)] gap-4 md:flex-row md:gap-0">
    <p class="text-xs font-medium leading-[16px] tracking-[1.2px] text-[var(--theme-text-muted)] uppercase font-['Public_Sans'] m-0 flex items-center h-[16px]">
      © 2024 LinguistCode. Editorial English for Engineers.
    </p>
    <div class="flex items-start gap-[32px]">
      <a
        v-for="policy in policies"
        :key="policy.label"
        :href="policy.href"
        class="text-[11px] font-bold leading-[17px] tracking-[1.1px] text-[var(--theme-text-muted)] uppercase transition-colors duration-200 hover:text-[var(--theme-primary)] font-['Public_Sans'] flex items-center h-[17px]"
      >
        {{ policy.label }}
      </a>
    </div>
  </div>
</template>

<style scoped>
</style>
