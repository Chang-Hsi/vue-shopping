<!-- src/views/CategoryView.vue -->
<template>
  <section class="w-full">
    <div class="mx-auto flex w-full max-w-360 flex-col px-5 py-6 sm:px-6 sm:py-10">
      <div class="flex w-full flex-col items-start justify-center">
        <div class="text-[22px] tracking-wide text-slate-900 sm:text-[24px]">
          {{ pageTitle }}
        </div>
        <div
          class="pt-2 text-[13px] tracking-wide text-slate-600/90 sm:py-2 sm:text-[16px]"
        >
          共 {{ totalStores }} 家特約店家
        </div>
      </div>

      <!-- 手機版：2 欄卡片 -->
      <div v-if="totalStores > 0" class="mt-5 w-full sm:hidden">
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
                <div class="line-clamp-2 text-[13px] leading-5 text-slate-900">
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

                <div v-if="s.badge" class="mt-2">
                  <span
                    class="inline-flex max-w-full items-center rounded-full bg-orange-50 px-3 py-1 text-[11px] text-orange-500"
                  >
                    {{ s.badge }}
                  </span>
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
                <div class="line-clamp-2 text-[13px] leading-5 text-slate-900">
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

                <div v-if="s.badge" class="mt-2">
                  <span
                    class="inline-flex max-w-full items-center rounded-full bg-orange-50 px-3 py-1 text-[11px] text-orange-500"
                  >
                    {{ s.badge }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 手機版不顯示分頁（跟截圖一致、可滑動） -->
      </div>

      <!-- 桌機/平板：保留你原本列表 + 分頁 -->
      <div v-if="totalStores > 0" class="mt-8 hidden w-full sm:block">
        <div class="flex w-full flex-wrap items-start gap-x-10 gap-y-10">
          <div
            v-for="s in pagedStores"
            :key="s.id"
            class="flex w-[calc((100%-120px)/4)] flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100"
            @click="goStoreDetail(s)"
          >
            <div class="relative w-full overflow-hidden">
              <img
                :src="s.coverUrl"
                :alt="s.name"
                class="h-52 w-full object-cover transition-transform duration-300 ease-out hover:scale-[1.2]"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div class="flex w-full flex-col gap-2 px-5 pb-5 pt-4">
              <div class="text-[16px] text-slate-900">
                {{ s.name }}
              </div>

              <div class="text-[13px] text-slate-500">
                {{ s.categoryMain }} ＞ {{ s.categorySub }}
              </div>

              <div class="mt-1 flex w-full items-center justify-between">
                <div class="flex items-center gap-2 text-[13px] text-slate-700">
                  <span class="text-orange-500">★</span>
                  <span class="font-semibold">{{ s.rating }}</span>
                </div>

                <div class="flex items-center gap-2 text-[13px] text-slate-500">
                  <span class="text-slate-400">⦿</span>
                  <span>{{ s.distance }}</span>
                </div>
              </div>

              <div class="mt-2">
                <span
                  class="inline-flex max-w-full items-center rounded-full bg-orange-50 px-3 py-1 text-[12px] text-orange-500"
                >
                  {{ s.badge }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full pt-10">
          <Pagination
            v-model="page"
            :total-items="totalStores"
            :page-size="pageSize"
            :max-buttons="5"
          />
        </div>
      </div>

      <!-- 無資料 -->
      <div v-else class="mt-8 flex w-full items-center justify-center">
        <div class="flex h-100 w-full items-center justify-center">
          <div class="text-[16px] tracking-wide text-gray-400 sm:text-[18px]">
            目前沒有符合此分類的店家
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Pagination from "@/components/common/Pagination.vue";
import { useCategoryStore } from "@/stores/categoryStore";

const route = useRoute();
const router = useRouter();
const categoryStore = useCategoryStore();

const pageSize = 8;
const page = ref(1);

const slug = computed(() => String(route.params?.slug || "").trim());
const categoryMeta = computed(() => categoryStore.getCategoryBySlug(slug.value));

const pageTitle = computed(() => {
  return categoryMeta.value?.label || "分類";
});

const stores = computed(() => {
  return categoryStore.getStoresBySlug(slug.value);
});

const totalStores = computed(() => stores.value.length);

const totalPages = computed(() => {
  const n = Math.ceil(totalStores.value / pageSize);
  return Math.max(1, n);
});

function goStoreDetail(s) {
  router.push(`/deal/${s.id}`);
}

watch(
  () => slug.value,
  (v) => {
    page.value = 1;

    if (!v) return;

    const exists = !!categoryStore.getCategoryBySlug(v);
    if (!exists) {
      router.replace("/category/food");
    }
  },
  { immediate: true }
);

watch(
  () => totalStores.value,
  () => {
    if (page.value > totalPages.value) page.value = totalPages.value;
  }
);

const pagedStores = computed(() => {
  const start = (page.value - 1) * pageSize;
  return stores.value.slice(start, start + pageSize);
});

/* 手機版：兩欄分流（跟你 SearchView 那張圖一致） */
const leftColStores = computed(() => {
  return stores.value.filter((_, idx) => idx % 2 === 0);
});

const rightColStores = computed(() => {
  return stores.value.filter((_, idx) => idx % 2 === 1);
});
</script>
