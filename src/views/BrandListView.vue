<!-- src/views/BrandListView.vue -->
<template>
  <div class="w-full">
    <!-- 手機版 -->
    <div class="mx-auto flex w-full max-w-360 flex-col px-4 py-6 sm:hidden">
      <div class="flex w-full flex-col gap-4">
        <div class="flex w-full items-center justify-start">
          <div class="text-[20px] font-extrabold tracking-wide text-slate-900">
            全部品牌
          </div>
        </div>

        <div class="w-full rounded-[28px] bg-white">
          <div class="flex w-full flex-col pb-4 pt-5">
            <div class="flex w-full flex-wrap">
              <div v-for="b in pagedBrands" :key="b.id" class="w-1/3 py-3">
                <button
                  type="button"
                  class="flex w-full flex-col items-center justify-start gap-2 active:scale-[0.98]"
                  @click="goBrandDetail(b)"
                >
                  <div
                    class="flex h-22 w-22 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-slate-200"
                  >
                    <img
                      :src="b.logoUrl"
                      :alt="b.name"
                      class="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div
                    class="w-22 text-center text-[12px] font-medium leading-snug text-slate-700"
                    style="
                      display: -webkit-box;
                      line-clamp: 2;
                      -webkit-box-orient: vertical;
                      overflow: hidden;
                    "
                  >
                    {{ b.name }}
                  </div>
                </button>
              </div>
            </div>

            <div class="mt-2 w-full border-t border-slate-200 pt-4">
              <div class="flex w-full items-center justify-center">
                <Pagination
                  v-model="page"
                  :total-items="brands.length"
                  :page-size="pageSize"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="h-2"></div>
      </div>
    </div>

    <!-- 桌機版（保留你原本樣式） -->
    <div class="mx-auto hidden w-full max-w-360 flex-col px-6 py-10 sm:flex">
      <div class="flex w-full flex-col gap-8">
        <div class="flex w-full items-center justify-start">
          <div class="text-[30px] font-extrabold tracking-wide text-slate-900">
            全部品牌
          </div>
        </div>

        <div class="flex w-full flex-col gap-8">
          <div class="flex w-full flex-wrap items-start gap-x-10 gap-y-10">
            <button
              v-for="b in pagedBrands"
              :key="b.id"
              type="button"
              class="group flex w-[calc((100%-50px)/6)] flex-col items-center gap-4"
              @click="goBrandDetail(b)"
            >
              <div
                class="flex h-48 w-48 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg ring-1 ring-slate-200 transition group-hover:shadow-xl"
              >
                <img
                  :src="b.logoUrl"
                  :alt="b.name"
                  class="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.06]"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div
                class="text-[14px] font-semibold text-slate-700 transition group-hover:text-slate-900"
              >
                {{ b.name }}
              </div>
            </button>
          </div>

          <div class="w-full border-t border-slate-200 pt-8">
            <Pagination
              v-model="page"
              :total-items="brands.length"
              :page-size="pageSize"
            />
          </div>
        </div>

        <div class="h-2"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Pagination from "@/components/common/Pagination.vue";
import { useBrandStore } from "@/stores/brandStore";

const route = useRoute();
const router = useRouter();

const brandStore = useBrandStore();
const brands = computed(() => brandStore.getBrands || []);

const pageSize = 18;
const page = ref(1);

const totalPages = computed(() => {
  const n = Math.ceil(brands.value.length / pageSize);
  return Math.max(1, n);
});

const pagedBrands = computed(() => {
  const start = (page.value - 1) * pageSize;
  return brands.value.slice(start, start + pageSize);
});

function goBrandDetail(b) {
  router.push(`/brand/${b.id}`);
}

watch(
  () => route.query?.brand,
  (v) => {
    if (!v) return;
    page.value = 1;
  }
);

watch(
  () => brands.value.length,
  () => {
    if (page.value > totalPages.value) page.value = totalPages.value;
  }
);
</script>
