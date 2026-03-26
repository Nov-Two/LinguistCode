<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/20/solid';
import { 
  CodeBracketIcon, 
  WindowIcon, 
  CircleStackIcon, 
  ServerIcon, 
  CpuChipIcon,
  GlobeAltIcon 
} from '@heroicons/vue/24/outline';

import type { Component } from 'vue';

interface Course {
  id: number;
  title: string;
  duration: string;
  level: string;
  description: string;
  icon: Component;
  iconBg: string;
  iconColor: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Git Fundamentals',
    duration: '2.5 Hours',
    level: 'Beginner',
    description: 'Learn version control basics to save and share your code changes easily.',
    icon: CodeBracketIcon,
    iconBg: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-500 dark:text-blue-400'
  },
  {
    id: 2,
    title: 'Modern CSS Layouts',
    duration: '4 Hours',
    level: 'Intermediate',
    description: 'Master Flexbox and Grid to build responsive website layouts with ease.',
    icon: WindowIcon,
    iconBg: 'bg-gray-100 dark:bg-gray-800',
    iconColor: 'text-gray-600 dark:text-gray-400'
  },
  {
    id: 3,
    title: 'SQL for Beginners',
    duration: '6 Hours',
    level: 'Beginner',
    description: 'Learn how to talk to databases and manage information for your apps.',
    icon: CircleStackIcon,
    iconBg: 'bg-red-50 dark:bg-red-900/20',
    iconColor: 'text-red-500 dark:text-red-400'
  },
  {
    id: 4,
    title: 'Intro to DevOps',
    duration: '8 Hours',
    level: 'Advanced',
    description: 'Understand how to deploy and manage applications in the cloud.',
    icon: ServerIcon,
    iconBg: 'bg-gray-100 dark:bg-gray-800',
    iconColor: 'text-gray-600 dark:text-gray-400'
  },
  {
    id: 5,
    title: 'REST API Design',
    duration: '5 Hours',
    level: 'Intermediate',
    description: 'Learn to build the bridge between your server and your user interface.',
    icon: CpuChipIcon,
    iconBg: 'bg-amber-50 dark:bg-amber-900/20',
    iconColor: 'text-amber-500 dark:text-amber-400'
  },
  {
    id: 6,
    title: 'English for Tech',
    duration: 'Continuous',
    level: 'Essential',
    description: 'Professional communication skills for your next international interview.',
    icon: GlobeAltIcon,
    iconBg: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-500 dark:text-blue-400'
  }
];
</script>

<template>
  <section class="w-full bg-[var(--theme-bg-muted)]/50 rounded-3xl p-8 md:p-12 border border-[var(--theme-border)]">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
      <div>
        <h2 class="text-3xl font-bold text-[var(--theme-text-main)] mb-2">
          Explore All Courses
        </h2>
        <p class="text-[var(--theme-text-secondary)] text-lg">
          Find specific technologies to add to your toolkit.
        </p>
      </div>
      <a
        href="#"
        class="group flex items-center text-[var(--theme-primary)] dark:text-[var(--theme-blue-accent)] font-semibold mt-4 md:mt-0 hover:text-[var(--theme-primary-dark)] transition-colors"
      >
        View All
        <ArrowRightIcon class="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
      </a>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="course in courses" 
        :key="course.id"
        class="bg-[var(--theme-bg-main)] p-6 rounded-2xl border border-[var(--theme-border)] shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col"
      >
        <div class="flex items-start mb-4">
          <div :class="['w-12 h-12 rounded-xl flex items-center justify-center mr-4', course.iconBg, 'dark:bg-opacity-20']">
            <component
              :is="course.icon"
              :class="['w-6 h-6', course.iconColor]"
            />
          </div>
          <div>
            <h3 class="text-lg font-bold text-[var(--theme-text-main)] leading-tight">
              {{ course.title }}
            </h3>
            <p class="text-xs font-bold text-[var(--theme-text-muted)] uppercase tracking-wider mt-1">
              {{ course.duration }} • {{ course.level }}
            </p>
          </div>
        </div>
        
        <p class="text-[var(--theme-text-secondary)] mb-6 flex-grow text-sm">
          {{ course.description }}
        </p>
        
        <div class="mt-auto">
          <a
            href="#"
            class="inline-flex items-center text-[var(--theme-primary)] dark:text-[var(--theme-blue-accent)] font-semibold text-sm hover:text-[var(--theme-primary-dark)] transition-colors group"
          >
            Explore
            <ArrowRightIcon class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
