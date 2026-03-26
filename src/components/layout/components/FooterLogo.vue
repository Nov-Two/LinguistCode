<script setup lang="ts">
import { type Component } from 'vue';
import { GlobeAltIcon, ShareIcon, QuestionMarkCircleIcon } from '@heroicons/vue/24/outline';

interface SocialLink {
  icon: Component;
  href: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  { icon: GlobeAltIcon, href: '#', label: 'Website' },
  { icon: ShareIcon, href: '#', label: 'Social' },
  { icon: QuestionMarkCircleIcon, href: '#', label: 'Support' },
];
</script>

<template>
  <div class="flex flex-col items-start max-w-[320px] gap-[23px]">
    <div class="flex flex-col items-start self-stretch">
      <span class="text-2xl font-bold leading-[32px] text-[var(--theme-primary)] dark:text-[var(--theme-blue-accent)] font-['Space_Grotesk'] w-[153px] h-[32px] flex items-center">
        LinguistCode
      </span>
    </div>
    <p class="text-sm leading-[23px] text-[var(--theme-text-secondary)] font-['Public_Sans'] w-[313px] h-[46px] flex items-center m-0">
      Redefining code education through the power of<br>
      simplified language and editorial design.
    </p>
    <div class="flex items-start self-stretch gap-[16px] pt-[1px]">
      <a
        v-for="social in socialLinks"
        :key="social.label"
        :href="social.href"
        :aria-label="social.label"
        class="text-[var(--theme-text-secondary)] transition-colors duration-200 hover:text-[var(--theme-primary)] dark:hover:text-[var(--theme-blue-accent)]"
      >
        <component
          :is="social.icon"
          class="w-5 h-5"
        />
      </a>
    </div>
  </div>
</template>

<style scoped>
</style>
