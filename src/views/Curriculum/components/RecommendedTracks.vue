<script setup lang="ts">
import { ArrowRightIcon, PlayCircleIcon } from '@heroicons/vue/24/outline';
</script>

<template>
  <section class="w-full">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-[var(--theme-text-main)] mb-2">
        Recommended Tracks
      </h2>
      <p class="text-[var(--theme-text-secondary)] text-lg">
        Curated learning paths designed for your current skill level.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Card 1 -->
      <div class="rounded-2xl border border-[var(--theme-border)] overflow-hidden bg-[var(--theme-bg-main)] shadow-sm hover:shadow-md transition-shadow flex flex-col">
        <div class="h-48 bg-slate-800 relative">
          <!-- Placeholder for actual image -->
          <div class="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 opacity-80" />
          <div class="absolute top-4 left-4">
            <span class="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</span>
          </div>
          <div class="absolute inset-0 flex items-center justify-center text-slate-400 opacity-50">
            <svg
              class="w-16 h-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
        </div>
        
        <div class="p-6 flex flex-col flex-grow">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-xl font-bold text-[var(--theme-text-main)]">
              Web Development for Beginners
            </h3>
            <span class="bg-[var(--theme-blue-muted)] text-[var(--theme-primary)] dark:text-[var(--theme-blue-accent)] text-xs font-bold px-2 py-1 rounded">HTML</span>
          </div>
          <p class="text-[var(--theme-text-secondary)] mb-8 flex-grow">
            Master the foundations of the web. Learn HTML, CSS, and basic JavaScript in simple, plain English.
          </p>
          
          <div class="mt-auto">
            <div class="flex justify-between text-sm text-[var(--theme-text-muted)] font-semibold mb-2">
              <span class="uppercase tracking-wide">Progress</span>
              <span class="text-[var(--theme-primary)] dark:text-[var(--theme-blue-accent)]">85%</span>
            </div>
            <div class="w-full bg-[var(--theme-border)] rounded-full h-2 mb-6">
              <div
                class="bg-[var(--theme-primary)] dark:bg-[var(--theme-blue-accent)] h-2 rounded-full"
                style="width: 85%"
              />
            </div>
            
            <button class="w-full bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] dark:bg-[var(--theme-blue-accent)] dark:hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors">
              Continue Learning
              <ArrowRightIcon class="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="rounded-2xl border border-[var(--theme-border)] overflow-hidden bg-[var(--theme-bg-main)] shadow-sm hover:shadow-md transition-shadow flex flex-col">
        <div class="h-48 bg-slate-900 relative">
          <!-- Placeholder for actual image -->
          <div class="absolute inset-0 bg-gradient-to-br from-slate-800 to-black opacity-80" />
          <div class="absolute top-4 left-4">
            <span class="bg-[var(--theme-brown-light)] text-[var(--theme-brown-accent)] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">New Content</span>
          </div>
          <div class="absolute inset-0 flex items-center justify-center text-slate-500 opacity-50">
            <svg
              class="w-16 h-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>
        </div>
        
        <div class="p-6 flex flex-col flex-grow">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-xl font-bold text-[var(--theme-text-main)]">
              Advanced React Architecture
            </h3>
            <span class="bg-[var(--theme-blue-muted)] text-[var(--theme-primary)] dark:text-[var(--theme-blue-accent)] text-xs font-bold px-2 py-1 rounded">JS</span>
          </div>
          <p class="text-[var(--theme-text-secondary)] mb-8 flex-grow">
            Build scalable apps. Understand hooks, context, and state management using technical vocabulary support.
          </p>
          
          <div class="mt-auto pt-6 flex items-center justify-between border-t border-[var(--theme-border)]">
            <div class="flex items-center">
              <div class="flex -space-x-2">
                <div class="w-8 h-8 rounded-full bg-[var(--theme-bg-muted)] border-2 border-[var(--theme-bg-main)] flex items-center justify-center text-xs font-medium text-[var(--theme-text-secondary)] z-30">
                  A
                </div>
                <div class="w-8 h-8 rounded-full bg-[var(--theme-bg-muted)] border-2 border-[var(--theme-bg-main)] flex items-center justify-center text-xs font-medium text-[var(--theme-text-secondary)] z-20">
                  B
                </div>
                <div class="w-8 h-8 rounded-full bg-[var(--theme-bg-muted)] border-2 border-[var(--theme-bg-main)] flex items-center justify-center text-xs font-medium text-[var(--theme-text-secondary)] z-10">
                  C
                </div>
              </div>
              <span class="text-xs text-[var(--theme-text-muted)] font-semibold ml-3 uppercase tracking-wide">+1.2k students enrolled</span>
            </div>
            
            <button class="bg-[var(--theme-bg-main)] border border-[var(--theme-border)] hover:bg-[var(--theme-bg-muted)] text-[var(--theme-text-main)] font-semibold py-2 px-6 rounded-lg flex items-center transition-colors">
              Start Track
              <PlayCircleIcon class="w-5 h-5 ml-2 text-[var(--theme-text-muted)]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
