<!-- src/layouts/DefaultLayout.vue -->
<template>
  <div class="flex min-h-screen w-full flex-col bg-white">
    <Header />

    <div class="flex w-full flex-1 min-h-0 flex-col pt-22 sm:pt-32">
      <div class="sticky top-20 z-30 w-full bg-white sm:static">
        <Search @search="onSearch" @openFilter="openCategoryModal" />
      </div>

      <main ref="mainRef" class="flex w-full flex-1 min-h-0 flex-col overflow-auto">
        <router-view />
      </main>
    </div>

    <button
      v-show="showBackToTop"
      type="button"
      class="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-white shadow-lg transition hover:bg-orange-500 active:scale-[0.98]"
      aria-label="回到頂部"
      @click="scrollToTop"
    >
      <svg
        class="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M6 14l6-6 6 6" />
      </svg>
    </button>

    <MobileSheet v-model="filterSheetOpen" @apply="applyFilters" />
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/layouts/Header.vue";
import Search from "@/components/common/Search.vue";
import MobileSheet from "@/components/common/MobileSheet.vue";

const router = useRouter();

const mainRef = ref(null);
const showBackToTop = ref(false);

const isMobile = ref(false);
const filterSheetOpen = ref(false);

function onSearch(q) {}

function computeIsMobile() {
  isMobile.value = window.innerWidth < 640;
  if (!isMobile.value && filterSheetOpen.value) filterSheetOpen.value = false;
}

function openCategoryModal() {
  if (!isMobile.value) return;
  filterSheetOpen.value = true;
}

function applyFilters(query) {
  router.push({ path: "/categories", query });
}

function getScrollTop() {
  const el = mainRef.value;
  const mainTop = el ? el.scrollTop : 0;
  const winTop = window.scrollY || document.documentElement.scrollTop || 0;
  return Math.max(mainTop, winTop);
}

function updateBackToTop() {
  showBackToTop.value = getScrollTop() > 240;
}

function scrollToTop() {
  const el = mainRef.value;
  const mainTop = el ? el.scrollTop : 0;
  if (mainTop > 0) {
    el.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function onMainScroll() {
  updateBackToTop();
}

function onWindowScroll() {
  updateBackToTop();
}

onMounted(() => {
  computeIsMobile();
  window.addEventListener("resize", computeIsMobile, { passive: true });

  const el = mainRef.value;
  if (el) el.addEventListener("scroll", onMainScroll, { passive: true });
  window.addEventListener("scroll", onWindowScroll, { passive: true });

  updateBackToTop();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", computeIsMobile);

  const el = mainRef.value;
  if (el) el.removeEventListener("scroll", onMainScroll);
  window.removeEventListener("scroll", onWindowScroll);
});
</script>
