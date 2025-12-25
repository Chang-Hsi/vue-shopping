<!-- src/components/home/HomeBrands.vue -->
<template>
  <section class="w-full">
    <div class="mx-auto flex w-full max-w-360 px-4 py-6 sm:px-6 sm:py-12">
      <div class="flex w-full flex-col gap-4 sm:gap-6">
        <div class="flex w-full items-center justify-between">
          <div class="text-[24px] tracking-wide text-slate-900">精選品牌</div>

          <button
            type="button"
            class="flex items-center gap-1 text-[13px] text-orange-400 transition hover:text-orange-500 sm:text-[14px]"
            @click="goBrandList"
          >
            看全部
            <span class="text-[16px] leading-none sm:text-[18px]">›</span>
          </button>
        </div>

        <!-- 手機版：5 欄多行 -->
        <div class="flex w-full flex-wrap sm:hidden">
          <div v-for="b in brands" :key="b.id" class="w-1/5 py-2">
            <button
              type="button"
              class="flex w-full flex-col items-center justify-center gap-1"
              @click="goBrandDetail(b)"
            >
              <div
                class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-slate-200"
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
                class="w-full truncate text-center text-[11px] font-medium text-slate-700"
              >
                {{ b.name }}
              </div>
            </button>
          </div>
        </div>

        <!-- 桌機版：維持原本橫向滑動 -->
        <div
          class="hidden w-full items-center justify-center gap-12 overflow-x-auto py-4 sm:flex"
        >
          <button
            v-for="b in brands"
            :key="b.id"
            type="button"
            class="flex w-22 shrink-0 flex-col items-center gap-3"
            @click="goBrandDetail(b)"
          >
            <div
              class="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
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
              class="w-full truncate text-center text-[13px] font-semibold text-slate-700"
            >
              {{ b.name }}
            </div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useBrandStore } from "@/stores/brandStore";

const router = useRouter();
const brandStore = useBrandStore();

const brands = computed(() => {
  const list = brandStore.getBrands || [];
  return list.slice(0, 10);
});

function goBrandList() {
  router.push("/brandList");
}

function goBrandDetail(b) {
  router.push(`/brand/${b.id}`);
}
</script>
