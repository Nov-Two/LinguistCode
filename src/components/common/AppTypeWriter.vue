<script setup lang="ts">
// use
// import AppTypeWriter from '@/components/common/AppTypeWriter.vue';
// <AppTypeWriter ref="glitchRef" :text="description" :typingInterval="60" />

import { ref, onMounted, computed, onUnmounted } from 'vue';

const props = withDefaults(
  defineProps<{
    text: string;
    typingInterval?: number;
  }>(),
  {
    typingInterval: 120,
  },
);

const stage = ref<'idle' | 'typing' | 'done'>('idle');
const chars = computed(() => props.text.split(''));
const displayedChars = ref<string[]>([]);

let timer: number | null = null;
let currentTimeoutStart: number | null = null;
let remainingTime: number | null = null;

// Expose these methods
const play = () => {
  if (stage.value === 'idle' || stage.value === 'done') {
    reset();
    stage.value = 'typing';
    startTyping();
  } else if (stage.value === 'typing' && remainingTime !== null) {
    // Resume typing
    timer = window.setTimeout(() => {
      addNextChar();
      startTyping();
    }, remainingTime);
    remainingTime = null;
  }
};

const pause = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
    if (currentTimeoutStart !== null) {
      const elapsed = Date.now() - currentTimeoutStart;
      if (stage.value === 'typing') {
        remainingTime = Math.max(0, props.typingInterval - elapsed);
      }
    }
  }
};

const reset = () => {
  if (timer) {clearTimeout(timer);}
  timer = null;
  stage.value = 'idle';
  displayedChars.value = [];
  remainingTime = null;
  currentTimeoutStart = null;
};

const addNextChar = () => {
  if (displayedChars.value.length < chars.value.length) {
    displayedChars.value.push(chars.value[displayedChars.value.length]);
  }
};

const startTyping = () => {
  const step = () => {
    if (displayedChars.value.length < chars.value.length) {
      addNextChar();
      currentTimeoutStart = Date.now();
      timer = window.setTimeout(step, props.typingInterval);
    } else {
      stage.value = 'done';
      displayedChars.value = [...chars.value];
    }
  };

  if (displayedChars.value.length === 0) {
    currentTimeoutStart = Date.now();
    timer = window.setTimeout(step, props.typingInterval);
  } else {
    step();
  }
};

onMounted(() => {
  play();
});

onUnmounted(() => {
  if (timer) {clearTimeout(timer);}
});

defineExpose({ play, pause, reset });
</script>

<template>
  <div
    class="text-wrapper"
    :class="`stage-${stage}`"
  >
    <!-- Stage 1: Typing -->
    <div
      v-if="stage === 'typing' || stage === 'idle'"
      class="typing-container"
    >
      <transition-group
        name="typewriter"
        tag="span"
        class="text-content"
      >
        <span
          v-for="(char, index) in displayedChars"
          :key="index"
          class="char"
        >{{ char }}</span>
      </transition-group>
      <span
        v-show="stage === 'typing'"
        class="cursor"
      />
    </div>

    <!-- Stage 3: Done -->
    <div
      v-else-if="stage === 'done'"
      class="done-container"
    >
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<style scoped>
.text-wrapper {
  display: block;
  width: 100%;
  max-width: 100%;
  position: relative;
  font-family: inherit;
  color: inherit;
  word-wrap: break-word;
  word-break: break-word;
  white-space: normal;
}

/* --- Phase 1: Typing --- */
.typing-container {
  display: inline;
}

.text-content {
  display: inline;
}

.char {
  display: inline;
  white-space: pre-wrap; /* Important to keep spaces visible but allow wrapping */
}

.typewriter-enter-active {
  transition: opacity 0.1s ease;
}
.typewriter-enter-from {
  opacity: 0;
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: currentColor; /* Matches text color */
  margin-left: 2px;
  animation: blink 530ms step-end infinite;
  vertical-align: text-bottom;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* --- Phase 3: Done --- */
.done-container {
  display: inline;
  white-space: pre-wrap;
}
</style>
