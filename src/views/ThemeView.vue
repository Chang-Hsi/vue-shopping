<!-- src/views/ThemeView.vue -->
<template>
  <div class="w-full">
    <section class="w-full">
      <div class="relative h-48 w-full overflow-hidden bg-slate-100 sm:h-150">
        <img
          v-if="vm"
          :src="vm.heroImage"
          :alt="vm.title"
          class="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div class="absolute inset-0 bg-black/45"></div>

        <div class="absolute bottom-6 left-0 right-0 sm:bottom-10">
          <div class="mx-auto flex w-full max-w-360 px-6">
            <div class="flex w-full flex-col gap-1 sm:gap-2">
              <div class="text-[26px] tracking-wide text-white sm:text-[34px]">
                {{ pageTitle }}
              </div>
              <div class="text-[13px] tracking-wide text-white/85 sm:text-[16px]">
                {{ totalStores }} 個店家
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="w-full">
      <div class="mx-auto flex w-full max-w-360 flex-col px-4 py-6 sm:py-10">
        <div class="flex w-full items-center justify-start">
          <div class="text-[18px] tracking-wide text-slate-900 sm:text-[22px]">
            精選店家
          </div>
        </div>

        <div v-if="totalStores > 0" class="mt-5 w-full sm:mt-8">
          <div
            class="flex w-full flex-wrap items-start gap-x-4 gap-y-6 sm:gap-x-10 sm:gap-y-10"
          >
            <div
              v-for="s in stores"
              :key="s.id"
              role="button"
              tabindex="0"
              class="flex w-[calc((100%-16px)/2)] flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:shadow-md hover:ring-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-300 sm:w-[calc((100%-120px)/4)]"
              @click="goStoreDetail(s)"
              @keydown.enter.prevent="goStoreDetail(s)"
              @keydown.space.prevent="goStoreDetail(s)"
            >
              <div class="relative w-full overflow-hidden">
                <img
                  :src="s.coverUrl"
                  :alt="s.name"
                  class="h-30 w-full object-cover transition-transform duration-300 ease-out hover:scale-[1.2] sm:h-52"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div
                class="flex w-full flex-col gap-1 px-2 pb-2 pt-2 sm:px-5 sm:pb-5 sm:pt-4"
              >
                <div
                  class="line-clamp-1 text-[14px] font-semibold text-slate-900 sm:text-[16px]"
                >
                  {{ s.name }}
                </div>

                <div class="line-clamp-1 text-[12px] text-slate-500 sm:text-[13px]">
                  {{ s.categoryMain }} ＞ {{ s.categorySub }}
                </div>

                <div class="mt-0.5 flex w-full items-center justify-between sm:mt-1">
                  <div
                    class="flex items-center gap-1.5 text-[12px] text-slate-700 sm:gap-2 sm:text-[13px]"
                  >
                    <span class="text-orange-500">★</span>
                    <span class="font-semibold">{{ s.rating }}</span>
                  </div>

                  <div
                    class="flex items-center gap-1.5 text-[12px] text-slate-500 sm:gap-2 sm:text-[13px]"
                  >
                    <span class="text-slate-400">⦿</span>
                    <span>{{ s.distance }}</span>
                  </div>
                </div>

                <div v-if="s.badge" class="mt-1.5 hidden sm:mt-2">
                  <span
                    class="inline-flex max-w-full items-center rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-orange-500 sm:px-3 sm:text-[12px]"
                  >
                    {{ s.badge }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="mt-6 flex w-full items-center justify-center sm:mt-8">
          <div class="flex h-72 w-full items-center justify-center sm:h-100">
            <div class="text-[16px] tracking-wide text-gray-400 sm:text-[18px]">
              目前沒有符合此主題的店家
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useThemeStore } from "@/stores/themeStore";

const route = useRoute();
const router = useRouter();
const themeStore = useThemeStore();

const themeId = computed(() => String(route.params?.id || "").trim());

const vm = computed(() => themeStore.getThemeById(themeId.value));

const pageTitle = computed(() => vm.value?.title || "主題");

const stores = computed(() => themeStore.getThemeStoresById(themeId.value));

const totalStores = computed(() => stores.value.length);

function goStoreDetail(s) {
  router.push(`/deal/${s.id}`);
}
</script>
