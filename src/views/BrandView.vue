<!-- src/views/BrandView.vue -->
<template>
  <section class="w-full">
    <!-- 手機版 -->
    <div class="mx-auto flex w-full max-w-360 flex-col px-4 py-6 sm:hidden">
      <div class="flex w-full flex-col items-start">
        <div class="text-[20px] font-extrabold tracking-wide text-slate-900">
          {{ pageTitle }}
        </div>
        <div class="mt-1 text-[12px] text-slate-500">共 {{ totalStores }} 家特約店家</div>
      </div>

      <div v-if="totalStores > 0" class="mt-4 w-full">
        <div class="-mx-2 flex w-full flex-wrap">
          <div v-for="s in pagedStores" :key="s.id" class="w-1/2 px-2 pb-4">
            <div
              class="flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100"
            >
              <div class="w-full overflow-hidden">
                <img
                  :src="s.coverUrl"
                  :alt="s.name"
                  class="h-28 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div class="flex w-full flex-col gap-1.5 px-3 pb-3 pt-3">
                <div class="text-[13px] font-semibold text-slate-900">
                  {{ s.name }}
                </div>

                <div class="text-[11px] text-slate-400">
                  {{ s.brandMain }} ＞ {{ s.brandSub }}
                </div>

                <div class="mt-1 flex w-full items-center justify-between">
                  <div class="flex items-center gap-1.5 text-[12px] text-slate-700">
                    <span class="text-orange-500">★</span>
                    <span class="font-semibold">{{ s.rating }}</span>
                  </div>

                  <div class="flex items-center gap-1.5 text-[12px] text-slate-400">
                    <span class="text-slate-300">⦿</span>
                    <span>{{ s.distance }}</span>
                  </div>
                </div>

                <div class="mt-1">
                  <span
                    class="inline-flex max-w-full items-center rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-orange-500"
                  >
                    {{ s.badge }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-2 w-full border-t border-slate-200 pt-4">
          <div class="flex w-full items-center justify-center">
            <Pagination
              v-model="page"
              :total-items="totalStores"
              :page-size="pageSize"
              :max-buttons="5"
            />
          </div>
        </div>
      </div>

      <div v-else class="mt-10 flex w-full items-center justify-center">
        <div class="text-[14px] tracking-wide text-slate-400">
          目前沒有符合此品牌的店家
        </div>
      </div>
    </div>

    <!-- 桌機版（保留你原本的 4 欄） -->
    <div class="mx-auto hidden w-full max-w-360 flex-col px-6 py-10 sm:flex">
      <div class="flex w-full flex-col items-start justify-center">
        <div class="text-[24px] tracking-wide text-slate-900">{{ pageTitle }}</div>
        <div class="py-2 text-[16px] tracking-wide text-slate-600">
          共 {{ totalStores }} 家特約店家
        </div>
      </div>

      <div v-if="totalStores > 0" class="mt-8 w-full">
        <div class="flex w-full flex-wrap items-start gap-x-10 gap-y-10">
          <div
            v-for="s in pagedStores"
            :key="s.id"
            class="group flex w-[calc((100%-120px)/4)] flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100"
          >
            <div class="relative w-full overflow-hidden">
              <img
                :src="s.coverUrl"
                :alt="s.name"
                class="h-52 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.06]"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div class="flex w-full flex-col gap-2 px-5 pb-5 pt-4">
              <div class="text-[16px] font-semibold text-slate-900">
                {{ s.name }}
              </div>

              <div class="text-[13px] text-slate-500">
                {{ s.brandMain }} ＞ {{ s.brandSub }}
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
                  class="inline-flex max-w-full items-center rounded-full bg-orange-50 px-3 py-1 text-[12px] font-semibold text-orange-500"
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

      <div v-else class="mt-8 flex w-full items-center justify-center">
        <div class="flex h-100 w-full items-center justify-center">
          <div class="text-[18px] tracking-wide text-gray-400">
            目前沒有符合此品牌的店家
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
import { useBrandStore } from "@/stores/brandStore";

const route = useRoute();
const router = useRouter();
const brandStore = useBrandStore();

const pageSize = 8;
const page = ref(1);

const brandId = computed(() => String(route.params?.id || "").trim());
const brandMeta = computed(() => brandStore.getBrandById(brandId.value));

const pageTitle = computed(() => {
  return brandMeta.value?.name || "品牌";
});

const stores = computed(() => {
  return brandStore.getStoresByBrandId(brandId.value);
});

const totalStores = computed(() => stores.value.length);

const totalPages = computed(() => {
  const n = Math.ceil(totalStores.value / pageSize);
  return Math.max(1, n);
});

watch(
  () => brandId.value,
  (v) => {
    page.value = 1;

    if (!v) return;

    const exists = !!brandStore.getBrandById(v);
    if (!exists) {
      const fallback = brandStore.getBrands?.[0]?.id || "";
      if (fallback) router.replace(`/brand/${fallback}`);
      else router.replace("/brandList");
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
</script>
