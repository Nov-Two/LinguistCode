<script setup lang="ts">
interface Props {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Ready to break the language barrier?',
  description: 'Join 50,000+ students who are learning to code using simplified English.',
  primaryButtonText: 'Get Started for Free',
  secondaryButtonText: 'Contact Sales',
});
</script>

<template>
  <div class="w-full flex justify-center bg-#f7f9fa">
    <a-card
      :bordered="false"
      class="relative flex flex-col items-center w-[calc(100%-48px)] max-w-[800px] -mt-16 mx-auto rounded-3xl overflow-hidden text-center z-10 !p-12 md:!p-16"
      style="
        background: linear-gradient(
          140.75deg,
          var(--color-primary) 0%,
          var(--color-secondary) 100%
        );
      "
      :body-style="{
        padding: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }"
    >
      <div class="absolute -top-32 -right-32 w-64 h-64 rounded-xl bg-white/10 blur-2xl z-0" />
      <div class="absolute -bottom-32 -left-32 w-64 h-64 rounded-xl bg-white/10 blur-2xl z-0" />

      <slot name="content">
        <div class="relative z-10 mb-4">
          <a-typography-title
            :level="2"
            class="!text-white !text-[28px] md:!text-4xl !font-bold font-[family-name:var(--font-space-grotesk)] !leading-[36px] md:!leading-[40px] tracking-[-0.9px] !mb-0"
          >
            {{ title }}
          </a-typography-title>
        </div>

        <div class="relative z-10 mb-8">
          <a-typography-paragraph
            class="!text-white/90 !text-base font-[family-name:var(--font-public-sans)] !leading-6 !mb-0 whitespace-pre-line"
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
            class="!h-[56px] !px-10 !rounded !bg-white hover:!bg-slate-50 !border-none w-full sm:w-auto"
          >
            <span
              class="text-primary text-base font-bold font-[family-name:var(--font-public-sans)]"
            >{{ primaryButtonText }}</span>
          </a-button>
          <a-button
            size="large"
            class="!h-[56px] !px-10 !rounded !border-white/30 !text-white !bg-white/10 hover:!bg-white/20 w-full sm:w-auto"
          >
            <span class="text-base font-bold font-[family-name:var(--font-public-sans)]">{{
              secondaryButtonText
            }}</span>
          </a-button>
        </div>
      </slot>
    </a-card>
  </div>
</template>

<style scoped></style>
