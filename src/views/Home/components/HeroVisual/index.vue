<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import type { HeroVisualProps, ContentData } from './types';
import { Popover, Result, Button } from 'ant-design-vue';

const props = withDefaults(defineProps<HeroVisualProps>(), {
  transitionDuration: 300,
  progress: 0,
});

const emit = defineEmits<{
  (e: 'update:activeId', id: string): void;
}>();

const internalActiveId = ref(props.defaultActiveId || props.navItems?.[0]?.id || '');
const activeId = computed(() =>
  props.activeId !== undefined ? props.activeId : internalActiveId.value,
);

const currentContent = ref<ContentData | null>(null);
const isLoading = ref(false);
const error = ref<Error | null>(null);

const loadContent = async (id: string) => {
  if (!id) {
    return;
  }

  if (props.contents && props.contents[id]) {
    currentContent.value = props.contents[id];
    return;
  }

  if (props.onSelect) {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await props.onSelect(id);
      if (data) {
        currentContent.value = data as ContentData;
      }
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Failed to load content');
    } finally {
      isLoading.value = false;
    }
  }
};

const handleSelect = async (id: string) => {
  if (activeId.value === id) {
    return;
  }

  if (props.activeId === undefined) {
    internalActiveId.value = id;
  }
  emit('update:activeId', id);
  await loadContent(id);
};

// Initial load
onMounted(() => {
  if (activeId.value) {
    loadContent(activeId.value);
  }
});

// Watch for external id change
watch(
  () => props.activeId,
  (newId) => {
    if (newId !== undefined && newId !== activeId.value) {
      loadContent(newId);
    }
  },
);
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    class="hero-visual-wrapper w-full max-w-[1024px] mx-auto bg-[var(--theme-bg-main)] rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row min-h-[600px] font-sans border border-[var(--theme-border)]"
  >
    <!-- Left Sidebar - Menu -->
    <div
      class="w-full md:w-64 bg-[var(--theme-bg-main)] border-b md:border-b-0 md:border-r border-[var(--theme-border)] flex flex-col shrink-0"
    >
      <!-- Header -->
      <div class="pt-8 pb-4 px-6 text-left">
        <p class="text-[10px] font-bold tracking-[0.15em] text-[var(--theme-text-muted)] uppercase mb-2 font-inter">
          {{ moduleSubtitle }}
        </p>
        <h3 class="text-base font-bold text-[var(--theme-text-main)] font-space-grotesk">
          {{ moduleTitle }}
        </h3>
      </div>

      <!-- Custom Menu -->
      <nav class="flex-1 px-4 py-2 flex flex-col gap-1 relative z-10">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-300 relative text-left outline-none focus:ring-2 focus:ring-[var(--theme-primary)]/50"
          :class="
            activeId === item.id
              ? 'bg-[var(--theme-blue-muted)] text-[var(--theme-primary)] dark:text-[var(--theme-blue-accent)] shadow-sm dark:shadow-none'
              : 'text-[var(--theme-text-secondary)] hover:bg-[var(--theme-bg-muted)] hover:text-[var(--theme-text-main)] dark:hover:bg-white/5'
          "
          @click="handleSelect(item.id)"
        >
          <div
            v-if="activeId === item.id"
            class="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-[var(--theme-primary)] dark:bg-[var(--theme-blue-accent)] rounded-l-full"
          />
          <component
            :is="item.icon"
            v-if="item.icon"
            class="w-5 h-5 shrink-0"
            :class="
              activeId === item.id
                ? 'text-[var(--theme-primary)] dark:text-[var(--theme-blue-accent)]'
                : 'text-[var(--theme-text-muted)]'
            "
          />
          {{ item.title }}
        </button>
      </nav>

      <!-- Progress -->
      <div class="p-6 mt-auto">
        <div
          class="bg-[var(--theme-bg-light)] dark:bg-[var(--theme-bg-main)] rounded-2xl p-4 border border-[var(--theme-border)] shadow-sm dark:shadow-none"
        >
          <div class="flex justify-between items-center mb-3">
            <span class="text-[12px] font-semibold text-[var(--theme-text-secondary)] font-inter">Progress: {{ progress }}%</span>
          </div>
          <div class="h-1.5 w-full bg-[var(--theme-border)] rounded-full overflow-hidden">
            <div
              class="h-full bg-[var(--theme-primary)] dark:bg-[var(--theme-blue-accent)] rounded-full transition-all duration-1000 ease-out"
              :style="{ width: `${progress}%` }"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 bg-[var(--theme-bg-main)] relative overflow-hidden flex flex-col p-8 md:p-12">
      <transition
        name="content-fade"
        mode="out-in"
        :style="{ '--transition-duration': `${transitionDuration}ms` }"
      >
        <!-- Loading State -->
        <div
          v-if="isLoading"
          class="absolute inset-0 flex flex-col items-center justify-center bg-[var(--theme-bg-main)] z-20"
        >
          <!-- Skeleton loaders or spinner could go here -->
          <div
            class="w-10 h-10 border-4 border-[var(--theme-primary)]/20 border-t-[var(--theme-primary)] dark:border-[var(--theme-blue-accent)]/20 dark:border-t-[var(--theme-blue-accent)] rounded-full animate-spin"
          />
          <p class="mt-4 text-[var(--theme-text-muted)] font-medium font-inter">
            Loading content...
          </p>
        </div>

        <!-- Error State -->
        <div
          v-else-if="error"
          class="absolute inset-0 flex items-center justify-center bg-[var(--theme-bg-main)] z-20"
        >
          <Result
            status="error"
            title="Failed to Load"
            :sub-title="error.message"
          >
            <template #extra>
              <Button
                type="primary"
                @click="handleSelect(activeId)"
              >
                Retry
              </Button>
            </template>
          </Result>
        </div>

        <!-- Content State -->
        <div
          v-else-if="currentContent"
          :key="currentContent.title"
          class="w-full max-w-2xl mx-auto flex flex-col h-full text-center items-center justify-center"
        >
          <h2 class="text-3xl font-bold text-[var(--theme-text-main)] font-space-grotesk mb-6">
            {{ currentContent.title }}
          </h2>

          <div
            class="text-[var(--theme-text-secondary)] text-[16px] leading-relaxed mb-10 max-w-[500px] font-public-sans"
          >
            <template v-if="currentContent.descriptionHtml">
              <div v-html="currentContent.descriptionHtml" />
            </template>
            <template v-else-if="currentContent.tooltipWord">
              <span>Imagine a variable as a labeled </span>
              <Popover
                placement="top"
                overlay-class-name="custom-tooltip"
              >
                <template #content>
                  <div class="p-3 w-64">
                    <div class="flex justify-between items-center mb-2">
                      <span
                        class="text-[var(--theme-primary)] dark:text-[var(--theme-blue-accent)] font-bold font-space-grotesk text-base"
                      >{{ currentContent.tooltipTitle }}</span>
                      <span
                        class="bg-[var(--theme-brown-light)] text-[var(--theme-brown-accent)] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
                      >{{ currentContent.tooltipTag }}</span>
                    </div>
                    <p class="text-sm text-[var(--theme-text-secondary)] m-0 leading-relaxed">
                      {{ currentContent.tooltipDescription }}
                    </p>
                  </div>
                </template>
                <span
                  class="text-[var(--theme-primary)] dark:text-[var(--theme-blue-accent)] font-bold cursor-pointer border-b-2 border-dashed border-[var(--theme-primary)]/40 dark:border-[var(--theme-blue-accent)]/40 pb-[1px] hover:border-[var(--theme-primary)] dark:hover:border-[var(--theme-blue-accent)] transition-colors tooltip-pulse-animate"
                >
                  {{ currentContent.tooltipWord }}
                </span>
              </Popover>
              <span>. You can store information inside it and give it a name so you can find it
                later.</span>
            </template>
          </div>

          <!-- Code Editor -->
          <div
            v-if="currentContent.codeSnippets || currentContent.rawCode"
            class="w-full bg-[#0F172A] rounded-2xl p-6 text-left shadow-xl relative mb-6"
          >
            <!-- Mac window dots -->
            <div class="flex gap-2 mb-6">
              <div class="w-3 h-3 rounded-full bg-[#EF4444]" />
              <div class="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <div class="w-3 h-3 rounded-full bg-[#10B981]" />
            </div>

            <div
              v-if="currentContent.language"
              class="absolute top-5 right-5 bg-white/5 px-3 py-1.5 rounded-md text-[11px] font-medium text-gray-400 font-mono border border-white/5 tracking-wider"
            >
              {{ currentContent.language }}
            </div>

            <div class="font-mono text-[14px] leading-relaxed tracking-wide">
              <template v-if="currentContent.codeSnippets">
                <div
                  v-for="(snippet, index) in currentContent.codeSnippets"
                  :key="index"
                  class="mb-2 last:mb-0"
                >
                  <div
                    v-if="snippet.comment"
                    class="text-[#64748B] italic mb-1"
                  >
                    {{ snippet.comment }}
                  </div>
                  <div
                    v-if="snippet.rawLine"
                    class="text-gray-300"
                    v-html="snippet.rawLine"
                  />
                  <div
                    v-else-if="snippet.key !== undefined"
                    class="flex items-center"
                  >
                    <span class="text-[#818CF8]">{{ snippet.key }}</span>
                    <span class="text-gray-400 mx-2">=</span>
                    <span
                      v-if="snippet.isString"
                      class="text-[#34D399]"
                    >"{{ snippet.value }}"</span>
                    <span
                      v-else
                      class="text-[#34D399]"
                    >{{ snippet.value }}</span>
                  </div>
                </div>
              </template>
              <pre
                v-else-if="currentContent.rawCode"
                class="text-gray-300 m-0 p-0 overflow-x-auto"
              >
                <code v-html="currentContent.rawCode" />
              </pre>
            </div>
          </div>

          <!-- Preview Block -->
          <div
            v-if="currentContent.previewOutput"
            class="w-full bg-[var(--theme-green-muted)] border border-[var(--theme-green-border)] rounded-xl p-4 flex items-center justify-between transition-all duration-300 shadow-sm dark:shadow-none"
          >
            <div class="flex items-center gap-2">
              <svg
                class="w-5 h-5 text-[var(--theme-green-text)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="text-[var(--theme-green-text)] font-semibold text-sm">Preview: Output</span>
            </div>
            <span class="font-mono text-[var(--theme-green-text)] font-medium text-sm">{{
              currentContent.previewOutput
            }}</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&family=Public+Sans:wght@400;500;600&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}
.font-space-grotesk {
  font-family: 'Space Grotesk', sans-serif;
}
.font-public-sans {
  font-family: 'Public Sans', sans-serif;
}

.content-fade-enter-active,
.content-fade-leave-active {
  transition:
    opacity var(--transition-duration, 0.3s) ease,
    transform var(--transition-duration, 0.3s) ease;
}

.content-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.content-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

:deep(.custom-tooltip .ant-popover-inner) {
  border-radius: 12px;
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
  padding: 0;
  overflow: hidden;
  background-color: var(--theme-bg-main);
  border: 1px solid var(--theme-border);
}

:deep(.custom-tooltip .ant-popover-arrow) {
  display: none;
}

.tooltip-pulse-animate {
  animation: gentle-pulse 2s infinite;
  display: inline-block;
}

@keyframes gentle-pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
