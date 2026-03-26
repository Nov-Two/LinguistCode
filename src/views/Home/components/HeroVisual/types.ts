import type { Component } from 'vue';

export interface NavItem {
  id: string;
  icon?: Component | string;
  title: string;
}

export interface CodeSnippet {
  key?: string;
  value?: string | number;
  isString?: boolean;
  comment?: string;
  rawLine?: string; // for arbitrary lines
}

export interface ContentData {
  title: string;
  descriptionHtml?: string;
  codeSnippets?: CodeSnippet[];
  rawCode?: string;
  language?: string; // e.g. "Python 3.10"
  previewOutput?: string;
  tooltipTitle?: string;
  tooltipTag?: string;
  tooltipDescription?: string;
  tooltipWord?: string; // The word to highlight
}

export interface HeroVisualProps {
  moduleTitle?: string;
  moduleSubtitle?: string;
  navItems: NavItem[];
  contents?: Record<string, ContentData>; // Could be provided all at once
  activeId?: string; // Controlled mode
  defaultActiveId?: string; // Uncontrolled mode
  transitionDuration?: number; // ms
  progress?: number; // 0-100
  // Callback that can return a promise to fetch ContentData, enabling loading state
  onSelect?: (id: string) => Promise<ContentData | void> | void;
}
