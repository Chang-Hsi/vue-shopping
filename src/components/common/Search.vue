<!-- src/components/common/Search.vue -->
<template>
  <div class="flex w-full justify-center border-b border-slate-200 bg-white">
    <div class="flex w-full max-w-190 flex-col items-center gap-3 px-4 py-4 sm:py-6">
      <!-- 手機版：搜尋框 + 篩選 icon -->
      <div class="flex w-full items-center gap-3 sm:hidden">
        <div
          class="flex h-14 flex-1 items-center gap-3 rounded-full border border-gray-100 bg-gray-100 px-4 shadow-xs"
        >
          <MagnifyingGlassIcon class="h-5 w-5 shrink-0 text-slate-400" />
          <input
            v-model="keyword"
            type="text"
            class="w-full bg-transparent text-[14px] text-slate-700 outline-none placeholder:text-slate-400"
            placeholder="請輸入品牌、店家名稱"
            @keydown.enter="handleSearch()"
          />
        </div>

        <button
          type="button"
          class="flex h-11 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
          @click="openFilter"
          aria-label="開啟分類篩選"
          title="分類篩選"
        >
          <AdjustmentsHorizontalIcon class="h-6 w-6" />
        </button>
      </div>

      <!-- 桌機版：原本的搜尋框 + 搜尋按鈕 -->
      <div
        class="hidden w-full items-center justify-between gap-3 rounded-full border border-slate-200 bg-white px-2 py-1 shadow-xs sm:flex"
      >
        <div class="flex min-w-0 flex-1 items-center gap-3">
          <MagnifyingGlassIcon class="h-5 w-5 shrink-0 text-slate-400" />
          <input
            v-model="keyword"
            type="text"
            class="w-full bg-transparent text-[14px] text-slate-700 outline-none placeholder:text-slate-400"
            placeholder="請輸入品牌、店家"
            @keydown.enter="handleSearch()"
          />
        </div>

        <button
          type="button"
          class="shrink-0 rounded-full bg-orange-400 px-5 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:bg-orange-600"
          @click="handleSearch()"
        >
          搜尋
        </button>
      </div>

      <!-- 熱門關鍵字：手機版先隱藏（要顯示可把 hidden sm:flex 改成 flex） -->
      <div class="hidden w-full flex-wrap items-center gap-2 text-[13px] sm:flex">
        <div class="shrink-0 text-slate-500">大家都在搜：</div>

        <button
          v-for="item in hotKeywords"
          :key="item"
          type="button"
          class="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-orange-400 transition hover:bg-orange-100 active:scale-[0.98]"
          @click="pickHotKeyword(item)"
        >
          {{ item }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// RWD：手機版顯示「搜尋框 + 篩選 icon」，桌機版維持「搜尋框 + 搜尋按鈕」
// 篩選按鈕會 emit('openFilter')，你可以在 DefaultLayout / Header 接這個事件去打開篩選彈窗

import { ref } from "vue";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

const router = useRouter();

const emit = defineEmits(["search", "openFilter"]);

const keyword = ref("");

const hotKeywords = ref([
  "星巴克",
  "IKEA",
  "全聯",
  "家樂福",
  "誠品書店",
  "康是美",
  "屈臣氏",
  "寶雅",
]);

function handleSearch() {
  const q = (keyword.value || "").trim();

  // 沒輸入就不跳
  if (!q) return;

  emit("search", q);

  router.push({
    path: "/search",
    query: { q },
  });
}

function pickHotKeyword(text) {
  keyword.value = text;
  handleSearch();
}

function openFilter() {
  emit("openFilter");
}
</script>
