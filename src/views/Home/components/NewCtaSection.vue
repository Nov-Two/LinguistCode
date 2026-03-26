<script setup lang="ts">
interface Props {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Ready to start?',
  description: 'Access our full curriculum for free today. No credit card required, just a\ncuriosity to learn.',
  primaryButtonText: 'Get Started for Free',
  secondaryButtonText: 'Talk to a Mentor'
});
</script>

<template>
  <div class="w-full flex justify-center py-16 px-6">
    <div class="relative w-full max-w-[800px] mx-auto">
      <a-card
        :bordered="false"
        class="relative flex flex-col items-center rounded-3xl overflow-hidden text-center z-10 !p-12 md:!p-16"
        style="background: linear-gradient(140.75deg, #1890ff 0%, #722ed1 100%);"
        :body-style="{
          padding: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }"
      >
        <!-- Background decorations -->
        <div class="absolute -top-32 -right-32 w-64 h-64 rounded-xl bg-white/10 blur-2xl z-0" />
        <div class="absolute -bottom-32 -left-32 w-64 h-64 rounded-xl bg-white/10 blur-2xl z-0" />

        <slot name="content">
          <div class="relative z-10 mb-6">
            <a-typography-title
              :level="2"
              class="!text-white !text-[32px] md:!text-4xl !font-bold !leading-[40px] md:!leading-[48px] !mb-0"
            >
              {{ title }}
            </a-typography-title>
          </div>

          <div class="relative z-10 mb-8">
            <a-typography-paragraph
              class="!text-white/90 !text-lg !leading-7 !mb-0 whitespace-pre-line max-w-[600px]"
            >
              {{ description }}
            </a-typography-paragraph>
          </div>
        </slot>

        <slot name="actions">
          <div class="relative z-10 flex flex-col sm:flex-row gap-4 justify-center w-full">
            <a-button
              type="primary"
              size="large"
              class="!h-[56px] !px-10 !rounded-lg !bg-white hover:!bg-[var(--theme-bg-muted)] !border-none w-full sm:w-auto btn-shimmer"
            >
              <span
                class="text-[var(--theme-primary)] text-base font-semibold"
              >{{ primaryButtonText }}</span>
            </a-button>
            <a-button
              size="large"
              class="!h-[56px] !px-10 !rounded-lg !border-white/30 !text-white !bg-white/10 hover:!bg-white/20 w-full sm:w-auto"
            >
              <span class="text-base font-semibold">{{
                secondaryButtonText
              }}</span>
            </a-button>
          </div>
        </slot>
      </a-card>
    </div>
  </div>
</template>

<style scoped>
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
  background: linear-gradient(to right, transparent, rgba(37, 99, 235, 0.2), transparent);
  transform: skewX(-20deg);
  animation: shimmer 3s infinite;
  pointer-events: none;
}

@keyframes shimmer {
  0% { left: -100%; }
  20% { left: 200%; }
  100% { left: 200%; }
}
</style>