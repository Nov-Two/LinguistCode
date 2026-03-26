<script setup lang="ts">
interface Props {
  editorialTitle?: string;
  editorialDescription?: string;
  paceText?: string;
}

withDefaults(defineProps<Props>(), {
  editorialTitle: "Editorial Reading",
  editorialDescription:
    "A layout that feels like a modern magazine.\nGenerous white space helps you focus on\nlearning one concept at a time.",
  paceText: "Learn at your own pace, in your own words.",
});
</script>

<template>
  <a-row
    :gutter="[24, 24]"
    justify="center"
    class="mt-6"
  >
    <a-col
      :xs="24"
      :lg="8"
      class="flex"
    >
      <slot name="editorial">
        <a-card
          hoverable
          :bordered="false"
          class="feature-card w-full h-full flex flex-col"
          :body-style="{
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }"
        >
          <div class="pb-6">
            <img
              src="/image/mn4q93o1-qko70vu.svg"
              class="w-full max-w-[315px] h-6 object-left object-contain"
              alt="icon"
            >
          </div>
          <div class="flex flex-col mt-4">
            <a-typography-title
              :level="3"
              class="!text-text-main !text-2xl !font-bold font-[family-name:var(--font-space-grotesk)] !mb-3 !leading-[32px] tracking-[-0.6px]"
            >
              {{ editorialTitle }}
            </a-typography-title>
            <a-typography-paragraph
              class="!text-text-secondary !text-sm font-[family-name:var(--font-public-sans)] !leading-[23px] !mb-0 whitespace-pre-line"
            >
              {{ editorialDescription }}
            </a-typography-paragraph>
          </div>
        </a-card>
      </slot>
    </a-col>
    <a-col
      :xs="24"
      :lg="16"
      class="flex"
    >
      <slot name="visual-banner">
        <a-card
          hoverable
          :bordered="false"
          class="feature-card w-full h-full min-h-[400px] overflow-hidden"
          :body-style="{ padding: '0', height: '100%' }"
        >
          <div
            class="relative w-full h-full bg-cover bg-center"
            style="background-image: url(/image/mn4q93o6-kfl9723.png)"
          >
            <div
              class="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/60 to-transparent"
            >
              <a-typography-text
                class="!text-white !text-2xl !font-bold font-[family-name:var(--font-space-grotesk)]"
              >
                {{ paceText }}
              </a-typography-text>
            </div>
          </div>
        </a-card>
      </slot>
    </a-col>
  </a-row>
</template>

<style scoped>
.feature-card {
  border-radius: 12px !important;
  box-shadow: 0 12px 32px 0 rgba(25, 28, 29, 0.06);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
}
</style>
