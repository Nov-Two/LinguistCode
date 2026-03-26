<script setup lang="ts">
import { useRouter } from 'vue-router';

interface Props {
  badgeText?: string;
  titleStart?: string;
  titleHighlight?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

withDefaults(defineProps<Props>(), {
  badgeText: 'New: AI-Powered Definitions',
  titleStart: 'Master Code through',
  titleHighlight: 'Simple English',
  description:
    'Learn programming without the jargon barrier. We use editorial-grade\nEnglish and provide instant translations for complex concepts.',
  primaryButtonText: 'Start Learning Free',
  secondaryButtonText: 'Explore Curriculum',
});

const router = useRouter();

const navigateToCurriculum = () => {
  router.push('/curriculum');
};
</script>

<template>
  <div class="w-full flex flex-col items-center w-full px-6 pt-24 pb-16">
    <div class="mb-8">
      <div
        class="inline-flex items-center bg-[var(--theme-blue-accent)]/10 rounded-full px-4 py-2 border border-[var(--theme-blue-accent)]/20"
      >
        <div
          class="w-2 h-2 bg-[var(--theme-primary)] dark:bg-[var(--theme-blue-accent)] rounded-full mr-2"
        />
        <span
          class="text-[var(--theme-primary)] dark:text-[var(--theme-blue-accent)] text-sm font-medium"
        >{{ badgeText }}</span>
      </div>
    </div>

    <slot name="title">
      <transition
        appear
        name="fade-slide-up-1"
      >
        <a-typography-title
          :level="1"
          class="!text-[56px] md:!text-[72px] !leading-[64px] md:!leading-[80px] !font-bold text-center !mb-6 font-bold max-w-[800px]"
        >
          <span class="text-[var(--theme-text-main)]">{{ titleStart }}&nbsp;</span>
          <span class="text-glow-animate">{{ titleHighlight }}</span>
        </a-typography-title>
      </transition>
    </slot>

    <div class="flex flex-col items-center pb-12 px-3">
      <slot name="description">
        <transition
          appear
          name="fade-slide-up-2"
        >
          <a-typography-paragraph
            class="!text-[var(--theme-text-secondary)] !text-xl !leading-7 text-center whitespace-pre-line"
          >
            {{ description }}
          </a-typography-paragraph>
        </transition>
      </slot>
    </div>

    <slot name="actions">
      <transition
        appear
        name="fade-slide-up-3"
      >
        <a-space
          :size="20"
          class="mb-16 flex-col md:flex-row w-full md:w-auto justify-center"
        >
          <a-button
            type="primary"
            size="large"
            class="!h-[56px] !px-8 !rounded-lg !bg-[var(--theme-primary)] dark:!bg-[var(--theme-blue-accent)] !border-none !shadow-lg btn-shimmer"
          >
            <span class="text-white text-base font-semibold">{{ primaryButtonText }}</span>
          </a-button>
          <a-button
            size="large"
            class="!h-[56px] !px-8 !rounded-lg !border-[var(--theme-border)] !text-[var(--theme-primary)] dark:!text-[var(--theme-blue-accent)] hover:!bg-[var(--theme-bg-muted)] dark:hover:!bg-white/5"
            @click="navigateToCurriculum"
          >
            <span class="text-base font-semibold">{{ secondaryButtonText }}</span>
          </a-button>
        </a-space>
      </transition>
    </slot>
  </div>
</template>

<style scoped>
.fade-slide-up-1-enter-active {
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.fade-slide-up-2-enter-active {
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s;
}
.fade-slide-up-3-enter-active {
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s;
}

.fade-slide-up-1-enter-from,
.fade-slide-up-2-enter-from,
.fade-slide-up-3-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-slide-up-1-enter-to,
.fade-slide-up-2-enter-to,
.fade-slide-up-3-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.text-glow-animate {
  background: linear-gradient(to right, #2563eb, #60a5fa, #9333ea, #2563eb);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: shine 3s linear infinite;
  display: inline-block;
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}

.btn-shimmer {
  position: relative;
  overflow: hidden;
}

.btn-shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4), transparent);
  transform: skewX(-20deg);
  animation: shimmer 3s infinite;
  pointer-events: none;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  20% {
    left: 200%;
  }
  100% {
    left: 200%;
  }
}
</style>
