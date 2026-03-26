<script setup lang="ts">
import FooterLogo from './components/FooterLogo.vue';
import FooterColumn from './components/FooterColumn.vue';
import FooterBottom from './components/FooterBottom.vue';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumnData {
  title: string;
  links: FooterLink[];
}

const footerColumns: FooterColumnData[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Courses', href: '#' },
      { label: 'Curriculum', href: '#' },
      { label: 'Pricing', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'API Status', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Privacy', href: '#' },
    ],
  },
];
</script>

<template>
  <a-layout-footer class="!bg-bg-main !border-t !border-border w-full flex justify-center">
    <div class="w-full max-w-[1280px] px-[32px] py-[64px] flex flex-col gap-[64px]">
      <!-- Main Content -->
      <div class="flex flex-col md:flex-row justify-between items-start gap-[64px] md:gap-0">
        <!-- Logo & Description -->
        <FooterLogo />

        <!-- Navigation Links -->
        <div
          class="flex flex-wrap sm:flex-nowrap gap-[64px] sm:gap-0 sm:space-x-[64px] lg:space-x-[75px] pr-[6px]"
        >
          <FooterColumn
            v-for="(column, index) in footerColumns"
            :key="column.title"
            :title="column.title"
            :links="column.links"
            :class="{
              'sm:!ml-0': index === 0,
              'sm:!ml-[64px]': index === 1,
              'sm:!ml-[75px]': index === 2,
            }"
          />
        </div>
      </div>

      <!-- Bottom Bar -->
      <FooterBottom />
    </div>
  </a-layout-footer>
</template>

<style scoped>
/* Ant Design Layout Footer usually has some default padding/background that we override with Tailwind */
:deep(.ant-layout-footer) {
  background: transparent;
  /* padding: 64px 32px; */
}
</style>
