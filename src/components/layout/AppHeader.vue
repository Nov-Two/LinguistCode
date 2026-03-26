<script setup lang="ts">
import { ref, type Component } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/vue/24/outline';
import { ChevronDownIcon as ChevronDownIconMini } from '@heroicons/vue/20/solid';

/**
 * 导航链接类型定义
 */
interface NavLink {
  label: string;
  href?: string;
  hasDropdown?: boolean;
}

/**
 * 图标配置类型定义
 */
interface IconConfig {
  search: Component;
  dropdown: Component;
  notification: Component;
}

// 导航项配置
const navLinks: NavLink[] = [{ label: 'Curriculum', href: '/curriculum' }, { label: 'Dashboard', href: '#' }, { label: 'Community', href: '#' }];

// 图标配置（支持动态替换）
const icons: IconConfig = {
  search: MagnifyingGlassIcon,
  dropdown: ChevronDownIconMini,
  notification: BellIcon,
};

const searchValue = ref('');
const router = useRouter();
const route = useRoute();

const navigateTo = (path?: string) => {
  if (path && path !== '#') {
    router.push(path);
  }
};
</script>

<template>
  <a-layout-header class="header-nav">
    <!-- 左侧 Logo 与 搜索栏 -->
    <div class="header-left">
      <div
        class="logo"
        @click="router.push('/')"
      >
        LinguistCode
      </div>

      <div class="search-container">
        <a-input
          v-model:value="searchValue"
          placeholder="Search lessons, terms, or code..."
          class="search-input"
        >
          <template #prefix>
            <component
              :is="icons.search"
              class="icon-search"
            />
          </template>
          <template #suffix>
            <div class="shortcut-container">
              <!-- 模拟 ⌘ 键图标 -->
              <div class="shortcut-key cmd-icon">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
                  />
                </svg>
              </div>
              <div class="shortcut-key">
                K
              </div>
            </div>
          </template>
        </a-input>
      </div>
    </div>

    <!-- 右侧 导航与 操作 -->
    <div class="header-right">
      <nav class="nav-links">
        <div
          v-for="link in navLinks"
          :key="link.label"
          class="nav-item"
          :class="{ 'has-dropdown': link.hasDropdown, 'active': route.path === link.href }"
          @click="navigateTo(link.href)"
        >
          <span class="nav-label">{{ link.label }}</span>
          <component
            :is="icons.dropdown"
            v-if="link.hasDropdown"
            class="icon-dropdown"
          />
        </div>
      </nav>

      <div class="actions">
        <!-- 垂直分割线 (设计稿右侧 Actions 前) -->
        <div class="divider" />

        <a-button
          type="text"
          class="btn-notification"
        >
          <template #icon>
            <component
              :is="icons.notification"
              class="icon-bell"
            />
          </template>
        </a-button>

        <a-button
          type="primary"
          class="btn-signin"
        >
          Sign In
        </a-button>
      </div>
    </div>
  </a-layout-header>
</template>

<style scoped lang="scss">
.header-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 67px !important;
  padding: 0 24px !important;
  background: rgba(255, 255, 255, 0.85) !important;
  backdrop-filter: blur(6px);
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  line-height: normal !important;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 32px;
  flex: 1;

  .logo {
    color: #198eee;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.6px;
    cursor: pointer;
    user-select: none;
    font-family: 'Space Grotesk', sans-serif;
  }

  .search-container {
    width: 384px;

    .search-input {
      height: 38px;
      background-color: rgba(241, 245, 249, 0.5) !important;
      border: none !important;
      border-radius: 8px !important;
      padding: 0 12px 0 12px !important;
      transition: all 0.2s;

      &:hover,
      &:focus-within {
        background-color: rgba(241, 245, 249, 0.8) !important;
      }

      :deep(.ant-input) {
        background: transparent !important;
        font-size: 14px;
        color: #1e293b;
        &::placeholder {
          color: rgba(89, 89, 89, 0.4);
        }
      }

      .icon-search {
        width: 18px;
        height: 18px;
        color: #94a3b8;
        margin-right: 8px;
      }
    }
  }
}

.shortcut-container {
  display: flex;
  align-items: center;
  gap: 4px;
  pointer-events: none;

  .shortcut-key {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 4px;
    background: #ffffff;
    border: 1px solid #f1f5f9;
    border-radius: 4px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);
    color: #94a3b8;
    font-size: 10px;
    font-weight: 600;
    font-family: inherit;

    &.cmd-icon {
      padding: 0 2px;
    }
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 32px;

  .nav-links {
    display: flex;
    align-items: center;
    gap: 32px;

    .nav-item {
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      color: #595959;
      transition: color 0.2s;
      position: relative;

      &:hover {
        color: #198eee;
      }

      &.active {
        color: #198eee;
        font-weight: 600;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -22px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #198eee;
        }
      }

      .nav-label {
        font-size: 14px;
      }

      .icon-dropdown {
        width: 14px;
        height: 14px;
        color: #94a3b8;
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 16px;

    .divider {
      width: 1px;
      height: 24px;
      background-color: #f1f5f9;
      margin-right: 8px;
    }

    .btn-notification {
      width: 38px !important;
      height: 38px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      color: #64748b !important;
      border-radius: 8px !important;
      padding: 0 !important;

      &:hover {
        background-color: #f8fafc !important;
        color: #198eee !important;
      }

      .icon-bell {
        width: 20px;
        height: 20px;
      }
    }

    .btn-signin {
      height: 38px !important;
      padding: 0 20px !important;
      background: #198eee !important;
      border: none !important;
      border-radius: 8px !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      box-shadow:
        0px 4px 6px -1px rgba(25, 142, 238, 0.1),
        0px 2px 4px -2px rgba(25, 142, 238, 0.1) !important;
      transition: all 0.2s;

      &:hover {
        opacity: 0.9;
        transform: translateY(-1px);
        box-shadow: 0px 6px 12px -2px rgba(25, 142, 238, 0.2) !important;
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
}

// 移动端简单适配
@media (max-width: 768px) {
  .search-container,
  .nav-links,
  .divider {
    display: none !important;
  }
  .header-left {
    gap: 16px;
  }
}
</style>
