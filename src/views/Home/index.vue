<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import HeroHeader from './components/HeroHeader.vue';
import HeroVisual from './components/HeroVisual/index.vue';
import NewFeaturesSection from './components/NewFeaturesSection.vue';
import NewCtaSection from './components/NewCtaSection.vue';
import { DocumentTextIcon, CodeBracketIcon, PlayIcon } from '@heroicons/vue/24/outline';
import type { NavItem, ContentData } from './components/HeroVisual/types';

const navItems: NavItem[] = [
  { id: 'vars', title: 'What is a Variable?', icon: DocumentTextIcon },
  { id: 'types', title: 'Data Types', icon: CodeBracketIcon },
  { id: 'funcs', title: 'First Function', icon: PlayIcon },
];

const contents: Record<string, ContentData> = {
  vars: {
    title: 'Lesson 1: What is a Variable?',
    tooltipWord: 'container',
    tooltipTitle: 'Container',
    tooltipTag: 'NOUN',
    tooltipDescription: 'A box or item that holds things inside it. In code, it holds data.',
    language: 'Python 3.10',
    codeSnippets: [
      { comment: '# Labeled containers' },
      { key: 'user_name', value: 'Alex', isString: true },
      { key: 'user_age', value: 25, isString: false },
      { rawLine: '<br/>' },
      {
        rawLine:
          '<span class="text-[#3B82F6]">print</span><span class="text-gray-400">(</span><span class="text-[#60A5FA]">user_name</span><span class="text-gray-400">)</span>',
      },
    ],
    previewOutput: 'Alex',
  },
  types: {
    title: 'Lesson 2: Data Types',
    descriptionHtml:
      'Data comes in different shapes and sizes. Just like in real life, we have numbers, text, and true/false values.',
    language: 'Python 3.10',
    codeSnippets: [
      { comment: '# Different types of data' },
      { key: 'is_active', value: 'True', isString: false },
      { key: 'score', value: '98.5', isString: false },
      { rawLine: '<br/>' },
      {
        rawLine:
          '<span class="text-[#3B82F6]">print</span><span class="text-gray-400">(</span><span class="text-[#3B82F6]">type</span><span class="text-gray-400">(score))</span>',
      },
    ],
    previewOutput: "<class 'float'>",
  },
  funcs: {
    title: 'Lesson 3: First Function',
    descriptionHtml:
      'A function is a reusable block of code that performs a specific task. You can call it whenever you need it.',
    language: 'Python 3.10',
    codeSnippets: [
      { comment: '# Define a function' },
      {
        rawLine:
          '<span class="text-[#3B82F6]">def</span> <span class="text-[#FBBF24]">greet</span><span class="text-gray-400">(name):</span>',
      },
      {
        rawLine:
          '&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#3B82F6]">return</span> <span class="text-[#34D399]">f"Hello, {name}!"</span>',
      },
      { rawLine: '<br/>' },
      {
        rawLine:
          '<span class="text-[#3B82F6]">print</span><span class="text-gray-400">(</span><span class="text-[#FBBF24]">greet</span><span class="text-gray-400">(</span><span class="text-[#34D399]">"Alex"</span><span class="text-gray-400">))</span>',
      },
    ],
    previewOutput: 'Hello, Alex!',
  },
};

const handleSelect = async (id: string) => {
  // Simulate network request for demonstration of loading state
  return new Promise<ContentData>((resolve) => {
    setTimeout(() => {
      resolve(contents[id]);
    }, 600);
  });
};
</script>

<template>
  <DefaultLayout>
    <div class="flex flex-col items-center w-full max-w-[1280px] mx-auto py-12">
      <HeroHeader />
      <div class="w-full my-16 px-4">
        <HeroVisual
          module-title="Python Fundamentals"
          module-subtitle="Introduction"
          :nav-items="navItems"
          :progress="12"
          :on-select="handleSelect"
        />
      </div>
      <NewFeaturesSection />
      <NewCtaSection />
    </div>
  </DefaultLayout>
</template>
