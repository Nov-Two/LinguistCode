<script setup lang="ts">
interface TooltipFeature {
  term: string;
  definition: string;
  color: string;
}

interface VocabularyFeature {
  term: string;
  definition: string;
}

interface Props {
  smartTooltipsTitle?: string;
  smartTooltipsDescription?: string;
  tooltipFeatures?: TooltipFeature[];
  moduleCardsTitle?: string;
  moduleCardsDescription?: string;
  vocabularyFeatures?: VocabularyFeature[];
}

withDefaults(defineProps<Props>(), {
  smartTooltipsTitle: "Smart Word Tooltips",
  smartTooltipsDescription:
    "Hover over any technical term to see a simplified definition.\nNo more switching tabs to look up complex jargon.",
  tooltipFeatures: () => [
    {
      term: "Function",
      definition: "A reusable block of code.",
      color: "border-primary",
    },
    {
      term: "Parameter",
      definition: "Information given to a task.",
      color: "border-brown-accent",
    },
    {
      term: "Boolean",
      definition: "A True or False value.",
      color: "border-purple-accent",
    },
  ],
  moduleCardsTitle: "Module Word Cards",
  moduleCardsDescription:
    'Each chapter starts with a "key terms" card. Master the\nlanguage before you even write your first line of code.',
  vocabularyFeatures: () => [
    { term: "Syntax", definition: "Grammar for code" },
    { term: "Integer", definition: "Whole number" },
    { term: "String", definition: "Piece of text" },
  ],
});
</script>

<template>
  <a-row
    :gutter="[24, 24]"
    justify="center"
  >
    <a-col
      :xs="24"
      :lg="14"
      class="flex"
    >
      <slot name="smart-tooltips">
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
          <div class="flex flex-col gap-4">
            <div
              class="inline-block bg-brown-light rounded-xl px-10 py-1 w-max"
            >
              <span
                class="text-[#2a1800] font-[family-name:var(--font-public-sans)] text-[10px] font-bold uppercase"
              >Vocabulary First</span>
            </div>
            <a-typography-title
              :level="3"
              class="!text-text-main !text-3xl !font-bold font-[family-name:var(--font-space-grotesk)] !mb-0 !leading-[36px] tracking-[-0.75px]"
            >
              {{ smartTooltipsTitle }}
            </a-typography-title>
            <a-typography-paragraph
              class="!text-text-secondary !text-base font-[family-name:var(--font-public-sans)] !leading-[26px] whitespace-pre-line"
            >
              {{ smartTooltipsDescription }}
            </a-typography-paragraph>
          </div>
          <div class="flex flex-col sm:flex-row gap-4 pt-12 flex-grow">
            <div
              v-for="(feature, index) in tooltipFeatures"
              :key="index"
              :class="[
                'flex flex-col flex-1 border-l-4 rounded bg-bg-light p-4 pl-3 gap-1',
                feature.color,
              ]"
            >
              <span
                :class="[
                  'font-[family-name:var(--font-public-sans)] text-xs font-bold uppercase',
                  feature.color.replace('border-', 'text-'),
                ]"
              >{{ feature.term }}</span>
              <span
                class="text-text-main font-[family-name:var(--font-public-sans)] text-sm leading-5"
              >{{ feature.definition }}</span>
            </div>
          </div>
        </a-card>
      </slot>
    </a-col>
    <a-col
      :xs="24"
      :lg="10"
      class="flex"
    >
      <slot name="module-cards">
        <a-card
          hoverable
          :bordered="false"
          class="feature-card w-full h-full"
          style="
            background: linear-gradient(
              140.75deg,
              var(--color-primary) 0%,
              var(--color-secondary) 100%
            );
          "
          :body-style="{
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }"
        >
          <div class="flex flex-col gap-4">
            <a-typography-title
              :level="3"
              class="!text-white !text-3xl !font-bold font-[family-name:var(--font-space-grotesk)] !mb-0 !leading-[36px] tracking-[-0.75px]"
            >
              {{ moduleCardsTitle }}
            </a-typography-title>
            <a-typography-paragraph
              class="!text-white/90 !text-base font-[family-name:var(--font-public-sans)] !leading-[26px] whitespace-pre-line"
            >
              {{ moduleCardsDescription }}
            </a-typography-paragraph>
          </div>
          <div
            class="mt-8 border border-white/20 rounded bg-white/10 flex flex-col gap-4 backdrop-blur-md"
            style="padding: 24px;"
          >
            <div class="flex items-center gap-3">
              <img
                src="/image/mn4q93o1-7x0xbl2.svg"
                class="w-5 h-5"
                alt="icon"
              >
              <span
                class="text-white font-[family-name:var(--font-public-sans)] text-base font-bold"
              >Chapter Vocabulary</span>
            </div>
            <div class="flex flex-col gap-3">
              <div
                v-for="(feature, index) in vocabularyFeatures"
                :key="index"
                :class="[
                  'flex items-center justify-between',
                  index < vocabularyFeatures.length - 1
                    ? 'border-b border-white/10 pb-2'
                    : '',
                ]"
              >
                <span
                  class="text-white font-[family-name:var(--font-public-sans)] text-sm"
                >{{ feature.term }}</span>
                <span
                  class="text-white/70 font-[family-name:var(--font-public-sans)] text-sm"
                >{{ feature.definition }}</span>
              </div>
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
