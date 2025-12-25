<!-- src/components/home/HomeTheme.vue -->
<template>
  <section class="w-full">
    <div class="mx-auto flex w-full max-w-360 flex-col px-6 py-10">
      <div class="flex w-full items-center justify-between">
        <div class="text-[24px] tracking-wide text-slate-900">主題推薦</div>

        <div class="text-[14px] tracking-wide text-slate-500">
          <span class="sm:hidden">{{ mobileIndex + 1 }}/{{ totalMobileSlides }}</span>
          <span class="hidden sm:inline">{{ activeIndex + 1 }}/{{ totalSlides }}</span>
        </div>
      </div>

      <div class="relative mt-8 w-full">
        <div class="sm:hidden">
          <div
            ref="mobileViewportRef"
            class="relative w-full overflow-hidden"
            @touchstart.passive="onTouchStart"
            @touchmove.passive="onTouchMove"
            @touchend="onTouchEnd"
            @mousedown.prevent="onMouseDown"
          >
            <div
              class="flex w-full transition-transform duration-500 ease-out"
              :style="mobileTrackStyle"
            >
              <div
                v-for="(t, idx) in mobileSlides"
                :key="`m-slide-${t.id}-${idx}`"
                class="w-full shrink-0"
              >
                <div
                  role="button"
                  tabindex="0"
                  class="group flex w-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-50 transition hover:shadow-md hover:ring-slate-200 focus:outline-none"
                  @click="goStoreTheme(t)"
                  @keydown.enter.prevent="goStoreTheme(t)"
                  @keydown.space.prevent="goStoreTheme(t)"
                >
                  <div class="relative w-full">
                    <img
                      :src="t.heroImage"
                      :alt="t.title"
                      class="h-56 w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent"
                    ></div>

                    <div class="absolute bottom-5 left-5 flex flex-col gap-1">
                      <div class="text-[20px] font-bold tracking-wide text-white">
                        {{ t.title }}
                      </div>
                      <div class="text-[13px] text-white/85">
                        {{ t.subtitle }}
                      </div>
                    </div>
                  </div>

                  <div class="flex w-full items-stretch gap-2 px-3 py-4">
                    <div
                      v-for="card in (t.cards || []).slice(0, 3)"
                      :key="card.id"
                      class="flex min-w-0 flex-1 flex-col"
                      role="button"
                      tabindex="0"
                      @click.stop="goStoreDetail(card)"
                      @keydown.enter.stop.prevent="goStoreDetail(card)"
                      @keydown.space.stop.prevent="goStoreDetail(card)"
                    >
                      <div class="overflow-hidden rounded-2xl bg-white">
                        <img
                          :src="card.image"
                          :alt="card.name"
                          class="h-24 w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      <div class="mt-2 flex w-full flex-col gap-1.5">
                        <div class="line-clamp-1 text-[13px] font-bold text-slate-900">
                          {{ card.name }}
                        </div>

                        <div class="line-clamp-1 text-[11px] text-slate-500">
                          {{ card.category }}
                        </div>

                        <div class="flex w-full items-center justify-between">
                          <div class="flex items-center gap-1">
                            <span class="text-[12px] leading-none text-orange-500"
                              >★</span
                            >
                            <span class="text-[12px] font-semibold text-slate-700">
                              {{ card.rating }}
                            </span>
                          </div>

                          <div class="flex items-center gap-1 text-slate-500">
                            <span class="text-[12px] leading-none">◎</span>
                            <span class="text-[11px]">{{ card.distance }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 flex w-full items-center justify-center gap-2">
            <button
              v-for="i in totalMobileSlides"
              :key="`m-dot-${i}`"
              type="button"
              class="transition active:scale-[0.98]"
              :aria-current="i - 1 === mobileIndex ? 'true' : 'false'"
              @click="goToMobile(i - 1)"
            >
              <div
                class="h-2 rounded-full transition-[width,transform,background-color] duration-300 ease-out"
                :class="dotClassMobile(i - 1)"
              ></div>
            </button>
          </div>
        </div>

        <div class="hidden sm:block">
          <button
            type="button"
            class="absolute -left-2.5 top-72 z-20 flex h-11 w-11 -translate-x-3 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-200 transition hover:bg-slate-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            :disabled="activeIndex === 0"
            @click="prev"
          >
            <span class="text-[22px] leading-none text-slate-700">‹</span>
          </button>

          <button
            type="button"
            class="absolute -right-2.5 top-72 z-20 flex h-11 w-11 translate-x-3 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-200 transition hover:bg-slate-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            :disabled="activeIndex === totalSlides - 1"
            @click="next"
          >
            <span class="text-[22px] leading-none text-slate-700">›</span>
          </button>

          <div class="relative w-full overflow-hidden">
            <div
              class="flex w-full transition-transform duration-500 ease-out"
              :style="trackStyle"
            >
              <div
                v-for="(slide, idx) in slides"
                :key="`slide-${idx}`"
                class="w-full shrink-0"
              >
                <div class="flex w-full flex-col gap-8 lg:flex-row lg:gap-10">
                  <div
                    role="button"
                    tabindex="0"
                    class="group flex w-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-50 transition hover:shadow-md hover:ring-slate-200 focus:outline-none lg:w-1/2"
                    @click="goStoreTheme(slide.left)"
                    @keydown.enter.prevent="goStoreTheme(slide.left)"
                    @keydown.space.prevent="goStoreTheme(slide.left)"
                  >
                    <div class="relative w-full">
                      <img
                        :src="slide.left.heroImage"
                        :alt="slide.left.title"
                        class="h-90 w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div
                        class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent"
                      ></div>

                      <div class="absolute bottom-6 left-6 flex flex-col gap-1">
                        <div class="text-[24px] font-bold tracking-wide text-white">
                          {{ slide.left.title }}
                        </div>
                        <div class="text-[14px] text-white/85">
                          {{ slide.left.subtitle }}
                        </div>
                      </div>
                    </div>

                    <div class="flex w-full items-stretch gap-4 px-4 py-4">
                      <div
                        v-for="card in slide.left.cards"
                        :key="card.id"
                        class="flex min-w-0 flex-1 flex-col"
                        role="button"
                        tabindex="0"
                        @click.stop="goStoreDetail(card)"
                        @keydown.enter.stop.prevent="goStoreDetail(card)"
                        @keydown.space.stop.prevent="goStoreDetail(card)"
                      >
                        <div class="overflow-hidden rounded-2xl bg-white">
                          <img
                            :src="card.image"
                            :alt="card.name"
                            class="h-44 w-full object-cover transition-transform duration-300 ease-out hover:scale-[1.2]"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>

                        <div class="mt-3 flex w-full flex-col gap-2">
                          <div class="line-clamp-1 text-[14px] font-bold text-slate-900">
                            {{ card.name }}
                          </div>

                          <div class="line-clamp-1 text-[12px] text-slate-500">
                            {{ card.category }}
                          </div>

                          <div class="flex w-full items-center justify-between">
                            <div class="flex items-center gap-1">
                              <span class="text-[14px] leading-none text-orange-500"
                                >★</span
                              >
                              <span class="text-[13px] font-semibold text-slate-700">
                                {{ card.rating }}
                              </span>
                            </div>

                            <div class="flex items-center gap-1 text-slate-500">
                              <span class="text-[14px] leading-none">◎</span>
                              <span class="text-[12px]">{{ card.distance }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    role="button"
                    tabindex="0"
                    class="group flex w-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-50 transition hover:shadow-md hover:ring-slate-200 focus:outline-none lg:w-1/2"
                    @click="goStoreTheme(slide.right)"
                    @keydown.enter.prevent="goStoreTheme(slide.right)"
                    @keydown.space.prevent="goStoreTheme(slide.right)"
                  >
                    <div class="relative w-full">
                      <img
                        :src="slide.right.heroImage"
                        :alt="slide.right.title"
                        class="h-90 w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div
                        class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent"
                      ></div>

                      <div class="absolute bottom-6 left-6 flex flex-col gap-1">
                        <div class="text-[24px] font-bold tracking-wide text-white">
                          {{ slide.right.title }}
                        </div>
                        <div class="text-[14px] text-white/85">
                          {{ slide.right.subtitle }}
                        </div>
                      </div>
                    </div>

                    <div class="flex w-full items-stretch gap-4 px-4 py-4">
                      <div
                        v-for="card in slide.right.cards"
                        :key="card.id"
                        class="flex min-w-0 flex-1 flex-col"
                        role="button"
                        tabindex="0"
                        @click.stop="goStoreDetail(card)"
                        @keydown.enter.stop.prevent="goStoreDetail(card)"
                        @keydown.space.stop.prevent="goStoreDetail(card)"
                      >
                        <div class="overflow-hidden rounded-2xl bg-white">
                          <img
                            :src="card.image"
                            :alt="card.name"
                            class="h-44 w-full object-cover transition-transform duration-300 ease-out hover:scale-[1.2]"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>

                        <div class="mt-3 flex w-full flex-col gap-2">
                          <div class="line-clamp-1 text-[14px] font-bold text-slate-900">
                            {{ card.name }}
                          </div>

                          <div class="line-clamp-1 text-[12px] text-slate-500">
                            {{ card.category }}
                          </div>

                          <div class="flex w-full items-center justify-between">
                            <div class="flex items-center gap-1">
                              <span class="text-[14px] leading-none text-orange-500"
                                >★</span
                              >
                              <span class="text-[13px] font-semibold text-slate-700">
                                {{ card.rating }}
                              </span>
                            </div>

                            <div class="flex items-center gap-1 text-slate-500">
                              <span class="text-[14px] leading-none">◎</span>
                              <span class="text-[12px]">{{ card.distance }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-7 flex w-full items-center justify-center gap-2">
            <button
              v-for="i in totalSlides"
              :key="i"
              type="button"
              class="transition active:scale-[0.98]"
              :aria-current="i - 1 === activeIndex ? 'true' : 'false'"
              @click="goTo(i - 1)"
            >
              <div
                class="h-2 rounded-full transition-[width,transform,background-color] duration-300 ease-out"
                :class="dotClass(i - 1)"
              ></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useThemeStore } from "@/stores/themeStore";

const router = useRouter();
const themeStore = useThemeStore();

const rawThemes = computed(() => themeStore.getThemes);

const slides = computed(() => {
  const list = rawThemes.value || [];
  const pairs = [];

  for (let i = 0; i < list.length; i += 2) {
    const left = list[i];
    const right = list[i + 1];

    if (left && right) {
      pairs.push({ left, right });
      continue;
    }

    if (left && !right) {
      pairs.push({ left, right: left });
    }
  }

  return pairs;
});

const activeIndex = ref(0);

const totalSlides = computed(() => slides.value.length);

const trackStyle = computed(() => {
  const x = activeIndex.value * 100;
  return { transform: `translateX(-${x}%)` };
});

function clampIndex(i) {
  const max = Math.max(0, totalSlides.value - 1);
  return Math.min(Math.max(0, i), max);
}

function goTo(i) {
  activeIndex.value = clampIndex(i);
}

function prev() {
  goTo(activeIndex.value - 1);
}

function next() {
  goTo(activeIndex.value + 1);
}

function dotClass(i) {
  const active = i === activeIndex.value;
  if (active) return "w-12 bg-orange-500 scale-[1.02]";
  return "w-2 bg-slate-300 scale-100 hover:bg-slate-400";
}

const mobileSlides = computed(() => {
  const list = rawThemes.value || [];
  return list.filter(Boolean);
});

const mobileIndex = ref(0);

const totalMobileSlides = computed(() => mobileSlides.value.length);

const mobileTrackStyle = computed(() => {
  const x = mobileIndex.value * 100;
  return { transform: `translateX(-${x}%)` };
});

function clampMobileIndex(i) {
  const max = Math.max(0, totalMobileSlides.value - 1);
  return Math.min(Math.max(0, i), max);
}

function goToMobile(i) {
  mobileIndex.value = clampMobileIndex(i);
}

function dotClassMobile(i) {
  const active = i === mobileIndex.value;
  if (active) return "w-12 bg-orange-500 scale-[1.02]";
  return "w-2 bg-slate-300 scale-100 hover:bg-slate-400";
}

const mobileViewportRef = ref(null);

const drag = ref({
  down: false,
  startX: 0,
  lastX: 0,
  moved: false,
});

function swipeCommit(deltaX) {
  const threshold = 40;
  if (Math.abs(deltaX) < threshold) return;

  if (deltaX < 0) {
    goToMobile(mobileIndex.value + 1);
    return;
  }
  goToMobile(mobileIndex.value - 1);
}

function onTouchStart(e) {
  const t = e.touches?.[0];
  if (!t) return;

  drag.value.down = true;
  drag.value.startX = t.clientX;
  drag.value.lastX = t.clientX;
  drag.value.moved = false;
}

function onTouchMove(e) {
  if (!drag.value.down) return;

  const t = e.touches?.[0];
  if (!t) return;

  const dx = t.clientX - drag.value.startX;
  drag.value.lastX = t.clientX;
  if (Math.abs(dx) > 6) drag.value.moved = true;
}

function onTouchEnd() {
  if (!drag.value.down) return;

  const deltaX = drag.value.lastX - drag.value.startX;
  drag.value.down = false;

  swipeCommit(deltaX);
}

function onMouseMove(e) {
  if (!drag.value.down) return;

  const dx = e.clientX - drag.value.startX;
  drag.value.lastX = e.clientX;
  if (Math.abs(dx) > 6) drag.value.moved = true;
}

function onMouseUp() {
  if (!drag.value.down) return;

  const deltaX = drag.value.lastX - drag.value.startX;
  drag.value.down = false;

  swipeCommit(deltaX);
}

function onMouseDown(e) {
  drag.value.down = true;
  drag.value.startX = e.clientX;
  drag.value.lastX = e.clientX;
  drag.value.moved = false;

  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("mouseup", onMouseUp, { passive: true, once: true });
}

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
});

function goStoreTheme(t) {
  router.push(`/theme/${t.id}`);
}

function goStoreDetail(t) {
  router.push(`/deal/${t.id}`);
}
</script>
