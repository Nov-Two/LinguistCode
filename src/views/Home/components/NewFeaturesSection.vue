<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { Component } from 'vue';
import { LanguageIcon, RectangleStackIcon, BookOpenIcon } from '@heroicons/vue/24/outline';

interface FeatureItem {
  title: string;
  description: string;
  icon: Component;
  iconBgClass: string;
  iconColorClass: string;
}

interface Props {
  title?: string;
  subtitle?: string;
  features?: FeatureItem[];
}

const props = withDefaults(defineProps<Props>(), {
  title: 'The LexiCode Experience',
  subtitle:
    'Designed for clarity, built for retention. Experience a learning environment that understands your needs.',
  features: () => [
    {
      title: 'Smart Word Tooltips',
      description:
        'Never break your flow to search for a word. Hover over any technical term to see simplified definitions, phonetics, and native translations.',
      icon: LanguageIcon,
      iconBgClass: 'bg-blue-50',
      iconColorClass: 'text-blue-500',
    },
    {
      title: 'Module Word Cards',
      description:
        "Master the core vocabulary before you dive into the code. Each chapter starts with a curated list of essential terms you'll encounter.",
      icon: RectangleStackIcon,
      iconBgClass: 'bg-blue-50',
      iconColorClass: 'text-blue-500',
    },
    {
      title: 'Editorial Reading',
      description:
        "Learning code shouldn't feel like reading a manual. Our layout feels like a premium digital magazine, optimized for focus and reading pleasure.",
      icon: BookOpenIcon,
      iconBgClass: 'bg-orange-50',
      iconColorClass: 'text-orange-500',
    },
  ],
});

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const activeCardIndex = ref<number | null>(null);

const handleCardClick = (index: number) => {
  activeCardIndex.value = index;
};

let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers that don't support IntersectionObserver
    isVisible.value = true;
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          // Once visible, we can stop observing
          if (sectionRef.value) {
            observer?.unobserve(sectionRef.value);
          }
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the section is visible
    },
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <section
    ref="sectionRef"
    class="w-full py-24 px-6 overflow-hidden"
  >
    <div class="w-full max-w-[1200px] mx-auto">
      <!-- Section Header -->
      <div
        class="text-center mb-16 transition-all duration-700 ease-out"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <a-typography-title
          :level="2"
          class="!text-4xl !font-bold !mb-4"
        >
          {{ title }}
        </a-typography-title>
        <a-typography-paragraph class="!text-gray-600 !text-xl !leading-7 max-w-[800px] mx-auto">
          {{ subtitle }}
        </a-typography-paragraph>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(feature, index) in props.features"
          :key="index"
          class="relative rounded-xl p-8 shadow-sm transition-all duration-[800ms] ease-out staggered-card cursor-pointer overflow-hidden border-2"
          :class="[
            isVisible ? 'visible' : 'hidden-state',
            activeCardIndex === index
              ? 'bg-white border-blue-500 shadow-xl -translate-y-2'
              : 'bg-white border-transparent hover:shadow-lg hover:-translate-y-1 hover:border-blue-200',
          ]"
          :style="{
            transitionDelay: `${index * 150}ms`,
            willChange: 'transform, opacity',
          }"
          @click="handleCardClick(index)"
        >
          <div
            class="mb-6 flex items-center justify-center w-12 h-12 rounded-lg transition-colors"
            :class="[feature.iconBgClass, feature.iconColorClass]"
          >
            <component
              :is="feature.icon"
              class="w-7 h-7"
            />
          </div>

          <a-typography-title
            :level="3"
            class="!text-xl !font-bold !mb-4 transition-colors"
            :class="activeCardIndex === index ? '!text-blue-600' : '!text-gray-900'"
          >
            {{ feature.title }}
          </a-typography-title>

          <a-typography-paragraph class="!leading-6 transition-colors !text-gray-600">
            {{ feature.description }}
          </a-typography-paragraph>

          <!-- Feature Examples -->
          <div
            v-if="index === 0"
            class="mt-6 space-y-3"
          >
            <div class="rounded-lg p-3 transition-colors bg-blue-50">
              <div class="font-semibold text-sm transition-colors text-blue-600">
                Function
              </div>
              <div class="text-sm transition-colors text-gray-600">
                A reusable block of code tasks.
              </div>
            </div>
            <div class="rounded-lg p-3 transition-colors bg-purple-50">
              <div class="font-semibold text-sm transition-colors text-purple-600">
                Boolean
              </div>
              <div class="text-sm transition-colors text-gray-600">
                A simple True or False value.
              </div>
            </div>
          </div>

          <div
            v-if="index === 1"
            class="mt-6 rounded-lg p-4 transition-colors bg-gradient-to-br from-blue-500 to-purple-600"
          >
            <div class="text-white font-semibold mb-3">
              Chapter 1 Vocabulary
            </div>
            <div class="space-y-2">
              <div class="flex justify-between text-white">
                <span class="text-sm">Syntax</span>
                <span class="text-sm opacity-80">Grammar for code</span>
              </div>
              <div class="flex justify-between text-white">
                <span class="text-sm">Integer</span>
                <span class="text-sm opacity-80">Whole number</span>
              </div>
              <div class="flex justify-between text-white">
                <span class="text-sm">String</span>
                <span class="text-sm opacity-80">Piece of text</span>
              </div>
            </div>
          </div>

          <div
            v-if="index === 2"
            class="mt-6"
          >
            <div class="rounded-lg p-4 space-y-3 transition-colors bg-gray-100">
              <div class="h-2 rounded transition-colors bg-gray-200" />
              <div class="h-2 rounded w-3/4 transition-colors bg-gray-200" />
              <div class="h-2 rounded w-1/2 transition-colors bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.staggered-card.hidden-state {
  opacity: 0;
  transform: translateY(50px);
}

.staggered-card.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
