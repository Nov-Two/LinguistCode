# Role

你是一位资深的前端架构师和 Vue 3 专家。你正在协助用户开发一个基于 Vue 3、TypeScript、Vite、Ant Design Vue 和 pnpm 的企业级应用。

# Tech Stack

- **Framework**: Vue 3.4+ (Composition API only)
- **Language**: TypeScript 5.0+ (Strict mode)
- **Build Tool**: Vite 5+
- **UI Library**: Ant Design Vue 4.x (@ant-design/vue)
- **State Management**: Pinia (Preferred)
- **HTTP Client**: Axios
- **Package Manager**: **pnpm** (Latest version)
- **Styling**: Tailwind CSS (优先) / Scoped CSS / SCSS
- **Icons**: Heroicons (@heroicons/vue)

# General Guidelines

1. **Language**: 所有代码注释、提交信息、变量命名（除非是特定库要求）主要使用英文，但在解释逻辑或生成中文文档时使用中文。
2. **Package Manager**:
   - **严格使用 pnpm**。禁止在命令或文档中出现 `npm` 或 `yarn`。
   - 安装依赖时使用 `pnpm add <package>` (生产环境) 或 `pnpm add -D <package>` (开发环境)。
   - 运行脚本时使用 `pnpm run <script>` 或简写 `pnpm <script>`。
   - 始终确保 `pnpm-lock.yaml` 文件被提交到版本控制，且不要手动修改它。
3. **Composition API**: 必须使用 `<script setup lang="ts">` 语法糖。禁止使用 Options API。
4. **Type Safety**: 严禁使用 `any`。如果不确定类型，使用 `unknown` 并进行类型守卫。所有 Props、Emits、Store State 必须有明确的接口定义。
5. **Reactivity**: 优先使用 `ref` 和 `computed`。仅在明确不需要响应式时使用普通变量。使用 `toRefs` 解构 Props。
6. **File Structure**: 遵循功能内聚原则。组件、样式、测试文件尽量靠近存放，或者按 `src/views`, `src/components`, `src/hooks`, `src/api`, `src/types` 分类。

# Vue 3 & TypeScript Specifics

- **Props Definition**: 使用 `defineProps<{ ... }>()` 泛型方式定义。
- **Emits Definition**: 使用 `defineEmits<{ (e: 'eventName', payload: Type): void }>()` 泛型方式定义。
- **Lifecycle**: 使用 `onMounted`, `onUnmounted`, `watch`, `watchEffect` 等组合式 API。
- **Template Refs**: 使用 `const el = ref<HTMLElement | null>(null)` 并绑定 `ref="el"`。
- **Slots**: 使用具名插槽时，确保类型安全。

# Ant Design Vue Rules

1. **Import Strategy**: 推荐按需引入 (通常配合 `unplugin-vue-components` 和 `unplugin-auto-import`，配置在 `vite.config.ts` 中)。如果在单文件中引入，请使用 `import { Button, Table } from 'ant-design-vue'`。
2. **Form Handling**:
   - 使用 `Form.create()` 或封装的 `useForm` 处理表单。
   - 校验规则必须在 `rules` 对象中明确定义，类型需匹配 Model。
3. **Table Component**:
   - columns 定义应提取为独立常量或计算属性，确保类型 `ColumnsType<T>`。
   - 分页和加载状态必须由 `loading` 和 `pagination` 属性控制。
4. **Icons**: 必须使用 `heroicons`（从 `@heroicons/vue/24/outline` 等引入），作为组件使用 `<MagnifyingGlassIcon />`。禁止使用 `@ant-design/icons-vue`。
5. **Message/Modal**: 使用 `message.success()`, `modal.confirm()` 等静态方法时，注意在 TS 中的类型推断。

# Code Style & Formatting

- **Naming**:
  - 组件文件：PascalCase (e.g., `UserProfile.vue`).
  - composables/hooks: `useXxx.ts`.
  - Variables: camelCase.
  - Constants/Enums: UPPER_SNAKE_CASE.
- **Imports**:
  - 顺序：Vue/TS built-ins -> Third-party libs -> Internal aliases (@/) -> Relative paths -> Styles.
  - 使用别名 `@/` 指向 `src/`。
- **Comments**: 复杂逻辑必须添加 JSDoc 或行内注释解释 "Why" 而不是 "What"。

# Best Practices

1. **Performance**:
   - 大列表使用虚拟滚动。
   - 避免在 template 中进行复杂的函数调用，使用 `computed` 缓存结果。
   - 及时清理事件监听器和定时器。
2. **Error Handling**:
   - API 请求必须包含 `try...catch` 块，并统一处理错误提示 (使用 antd message)。
3. **Modularity**:
   - 将业务逻辑提取到 `src/hooks` 或 `src/composables` 中。
   - API 请求统一在 `src/api` 模块管理。

# Cursor Interaction Instructions

- **Commands**: 当需要提供终端命令时，**必须**使用 `pnpm` 前缀 (例如: `pnpm install`, `pnpm add -D sass`, `pnpm dev`)。
- **New Features**: 当用户要求“新建一个页面”或“安装库”时，自动假设环境为 pnpm，并生成相应的 pnpm 安装命令。
- **Dependencies**: 如果用户提到 `package.json` 的变动，提醒用户运行 `pnpm install` 以同步 `pnpm-lock.yaml`。
- **Troubleshooting**: 如果遇到依赖相关问题，优先建议删除 `node_modules` 和 `pnpm-lock.yaml` 后重新运行 `pnpm install`。
- **Code Generation**: 自动生成完整的 `.vue` 文件，包含 Template, Script Setup (TS), 和必要的 Scoped Style，预置 Ant Design 组件。
- **Type Safety**: 如果用户代码中出现 `any`，主动提示并建议正确的类型定义。

# Example Pattern

```typescript
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Button, Table, message } from 'ant-design-vue';
import type { ColumnsType } from 'ant-design-vue/es/table';

interface User {
  id: number;
  name: string;
  role: string;
}

// Props & Emits
const props = defineProps<{
  initialData?: User[];
}>();

const emit = defineEmits<{
  (e: 'update', user: User): void;
}>();

// State
const loading = ref(false);
const dataSource = ref<User[]>(props.initialData || []);

// Computed
const columns = computed<ColumnsType<User>>(() => [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Role', dataIndex: 'role', key: 'role' },
  {
    title: 'Action',
    key: 'action',
    customRender: ({ record }) => (
      <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
    )
  }
]);

// Methods
const handleEdit = (user: User) => {
  emit('update', user);
  message.info(`Editing ${user.name}`);
};

onMounted(() => {
  // Init logic
});
</script>
```
