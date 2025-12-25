<!-- src/views/SearchView.vue -->
<template>
  <div class="w-full">
    <div class="mx-auto flex w-full max-w-360 flex-col px-5 py-6 sm:px-6 sm:py-10">
      <div class="flex w-full flex-col gap-2">
        <div class="text-[22px] tracking-wide text-slate-900 sm:text-[28px]">
          搜尋結果
        </div>
      </div>

      <!-- 手機版：2欄卡片 -->
      <div v-if="filteredStores.length" class="mt-8 w-full sm:hidden">
        <div class="flex w-full flex-row gap-4">
          <!-- 左欄 -->
          <div class="flex w-1/2 flex-col gap-4">
            <div
              v-for="s in leftColStores"
              :key="`m-left-${s.id}`"
              role="button"
              tabindex="0"
              class="flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition active:scale-[0.99]"
              @click="goStoreDetail(s)"
              @keydown.enter.prevent="goStoreDetail(s)"
              @keydown.space.prevent="goStoreDetail(s)"
            >
              <div class="relative w-full overflow-hidden bg-slate-100">
                <img
                  :src="s.coverUrl"
                  :alt="s.name"
                  class="h-27.5 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div class="flex w-full flex-col gap-1 px-3 pb-3 pt-3">
                <div
                  class="line-clamp-2 text-[13px] font-semibold leading-5 text-slate-900"
                >
                  {{ s.name }}
                </div>

                <div class="line-clamp-1 text-[11px] text-slate-500">
                  {{ s.categoryMain }} ＞ {{ s.categorySub }}
                </div>

                <div class="mt-1 flex w-full items-center justify-between">
                  <div class="flex items-center gap-1 text-[11px] text-slate-700">
                    <span class="text-orange-500">★</span>
                    <span class="font-semibold">{{ s.rating }}</span>
                  </div>

                  <div class="flex items-center gap-1 text-[11px] text-slate-500">
                    <span class="text-slate-400">⦿</span>
                    <span>{{ s.distance }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 右欄 -->
          <div class="flex w-1/2 flex-col gap-4">
            <div
              v-for="s in rightColStores"
              :key="`m-right-${s.id}`"
              role="button"
              tabindex="0"
              class="flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition active:scale-[0.99]"
              @click="goStoreDetail(s)"
              @keydown.enter.prevent="goStoreDetail(s)"
              @keydown.space.prevent="goStoreDetail(s)"
            >
              <div class="relative w-full overflow-hidden bg-slate-100">
                <img
                  :src="s.coverUrl"
                  :alt="s.name"
                  class="h-27.5 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div class="flex w-full flex-col gap-1 px-3 pb-3 pt-3">
                <div
                  class="line-clamp-2 text-[13px] font-semibold leading-5 text-slate-900"
                >
                  {{ s.name }}
                </div>

                <div class="line-clamp-1 text-[11px] text-slate-500">
                  {{ s.categoryMain }} ＞ {{ s.categorySub }}
                </div>

                <div class="mt-1 flex w-full items-center justify-between">
                  <div class="flex items-center gap-1 text-[11px] text-slate-700">
                    <span class="text-orange-500">★</span>
                    <span class="font-semibold">{{ s.rating }}</span>
                  </div>

                  <div class="flex items-center gap-1 text-[11px] text-slate-500">
                    <span class="text-slate-400">⦿</span>
                    <span>{{ s.distance }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 桌機/平板：保留你原本 -->
      <div v-if="filteredStores.length" class="mt-8 hidden w-full sm:block">
        <div class="flex w-full flex-wrap items-start gap-x-8 gap-y-10">
          <div
            v-for="s in filteredStores"
            :key="s.id"
            role="button"
            tabindex="0"
            class="flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:shadow-md hover:ring-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-300 sm:w-[calc((100%-32px)/2)] lg:w-[calc((100%-96px)/4)]"
            @click="goStoreDetail(s)"
            @keydown.enter.prevent="goStoreDetail(s)"
            @keydown.space.prevent="goStoreDetail(s)"
          >
            <div class="relative w-full overflow-hidden bg-slate-100">
              <img
                :src="s.coverUrl"
                :alt="s.name"
                class="h-56 w-full object-cover transition-transform duration-300 ease-out hover:scale-[1.05]"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div class="flex w-full flex-col gap-2 px-6 pb-6 pt-5">
              <div class="line-clamp-1 text-[16px] font-semibold text-slate-900">
                {{ s.name }}
              </div>

              <div class="line-clamp-1 text-[13px] text-slate-500">
                {{ s.categoryMain }} ＞ {{ s.categorySub }}
              </div>

              <div class="mt-2 flex w-full items-center justify-between">
                <div class="flex items-center gap-2 text-[13px] text-slate-700">
                  <span class="text-orange-500">★</span>
                  <span class="font-semibold">{{ s.rating }}</span>
                </div>

                <div class="flex items-center gap-2 text-[13px] text-slate-500">
                  <span class="text-slate-400">⦿</span>
                  <span>{{ s.distance }}</span>
                </div>
              </div>

              <div v-if="s.badge" class="mt-2">
                <span
                  class="inline-flex max-w-full items-center rounded-full bg-orange-50 px-3 py-1 text-[12px] font-semibold text-orange-500"
                >
                  {{ s.badge }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 空狀態 -->
      <div v-else class="mt-10 flex w-full items-center justify-center">
        <div
          class="flex w-full items-center justify-center rounded-2xl bg-white ring-1 ring-slate-100"
          style="height: 420px"
        >
          <div class="flex flex-col items-center justify-center gap-6">
            <div class="flex h-22 w-22 items-center justify-center rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                class="h-20 w-20 text-slate-300"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-4.3-4.3m1.3-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div class="flex flex-col items-center gap-2">
              <div class="text-[18px] tracking-wide text-slate-700">找不到相關店家</div>
              <div class="text-[14px] tracking-wide text-slate-500">請嘗試其他關鍵字</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSearchStore } from "@/stores/searchStore";

const route = useRoute();
const router = useRouter();
const searchStore = useSearchStore();

const keyword = computed(() => {
  const k = route.query?.q ?? route.query?.keyword ?? "";
  return String(k).trim();
});

const filteredStores = computed(() => {
  return searchStore.getStoresByKeyword(keyword.value);
});

const leftColStores = computed(() => {
  return filteredStores.value.filter((_, idx) => idx % 2 === 0);
});

const rightColStores = computed(() => {
  return filteredStores.value.filter((_, idx) => idx % 2 === 1);
});

function goStoreDetail(s) {
  router.push(`/deal/${s.id}`);
}
</script>
