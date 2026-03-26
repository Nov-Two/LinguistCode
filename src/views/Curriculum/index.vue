<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import RecommendedTracks from './components/RecommendedTracks.vue';
import ExploreCourses from './components/ExploreCourses.vue';
import { Alert, Spin } from 'ant-design-vue';

const loading = ref(true);
const error = ref<string | null>(null);

const fetchData = async () => {
  loading.value = true;
  error.value = null;
  try {
    // Simulate API call for loading state
    await new Promise((resolve) => setTimeout(resolve, 800));
    // Simulated random error for demonstration (10% chance)
    if (Math.random() < 0.1) {
      throw new Error('Network Error');
    }
  } catch (_err) {
    error.value = 'Failed to load curriculum data. Please try again later.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <DefaultLayout>
    <main class="w-full max-w-[1280px] mx-auto py-12 px-6 min-h-[calc(100vh-67px-300px)]">
      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-32 space-y-4"
      >
        <Spin size="large" />
        <p class="text-gray-500 font-medium">
          Loading curriculum...
        </p>
      </div>
      
      <!-- Error State -->
      <div
        v-else-if="error"
        class="py-32 flex justify-center"
      >
        <Alert
          type="error"
          show-icon
          :message="error"
          class="max-w-md w-full"
        >
          <template #action>
            <a-button
              size="small"
              type="primary"
              @click="fetchData"
            >
              Retry
            </a-button>
          </template>
        </Alert>
      </div>

      <!-- Content -->
      <div
        v-else
        class="space-y-16 animate-fade-in"
      >
        <RecommendedTracks />
        <ExploreCourses />
      </div>
    </main>
  </DefaultLayout>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
