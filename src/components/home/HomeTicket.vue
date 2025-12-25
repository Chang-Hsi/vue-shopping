<!-- src/components/home/HomeTicket.vue -->
<template>
  <section class="w-full">
    <div class="mx-auto flex w-full max-w-360 flex-col px-6">
      <div class="flex w-full items-center justify-start">
        <div class="text-[24px] tracking-wide text-slate-900">熱門票券</div>
      </div>

      <!-- 手機版型 -->
      <div class="mt-6 w-full sm:hidden">
        <div
          ref="mobileViewportRef"
          class="relative w-full overflow-hidden"
          @touchstart.passive="onTouchStart"
          @touchmove.passive="onTouchMove"
          @touchend="onTouchEnd"
          @mousedown.prevent="onMouseDown"
        >
          <div
            class="flex w-full"
            :class="
              isDragging
                ? 'transition-none'
                : 'transition-transform duration-300 ease-out'
            "
            :style="mobileTrackStyle"
          >
            <div
              v-for="(pair, idx) in mobileSlides"
              :key="`ticket-slide-${idx}`"
              class="shrink-0"
              :style="{ width: mobileViewportWidth + 'px' }"
            >
              <div class="flex w-full gap-4">
                <div
                  v-for="t in pair"
                  :key="t.id"
                  role="button"
                  tabindex="0"
                  class="flex w-1/2 min-w-0 cursor-pointer flex-col"
                  @click="goTicketDetail(t)"
                  @keydown.enter.prevent="goTicketDetail(t)"
                  @keydown.space.prevent="goTicketDetail(t)"
                >
                  <div class="relative w-full overflow-hidden rounded-2xl">
                    <img
                      :src="t.imageUrl"
                      :alt="t.title"
                      class="h-36 w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div class="absolute inset-0 bg-black/35"></div>

                    <div class="absolute bottom-4 left-4 right-4 flex flex-col gap-1">
                      <div class="line-clamp-1 text-[16px] text-white">
                        {{ t.title }}
                      </div>
                      <div class="line-clamp-1 text-[13px] text-white/85">
                        {{ t.subtitle }}
                      </div>
                    </div>
                  </div>

                  <div
                    class="relative mt-3 w-full overflow-hidden rounded-2xl px-4 py-2"
                    style="
                      background: radial-gradient(
                          circle 6px at 0 50%,
                          #fff 99%,
                          transparent 100%
                        ),
                        radial-gradient(
                          circle 6px at 100% 50%,
                          #fff 99%,
                          transparent 100%
                        ),
                        #fed431;
                    "
                  >
                    <div
                      class="absolute left-0 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                    ></div>
                    <div
                      class="absolute right-0 top-1/2 h-6 w-6 translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                    ></div>

                    <div class="flex w-full items-center justify-center">
                      <div class="min-w-0 flex-1">
                        <div class="text-[20px] tracking-wide text-slate-900 ml-2">
                          {{ t.points }}積分
                        </div>
                      </div>

                      <button
                        type="button"
                        class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[14px] font-semibold text-slate-900 shadow-[0_10px_20px_rgba(0,0,0,0.12)] transition active:scale-[0.98]"
                        @click.stop="onRedeem(t)"
                      >
                        <span class="flex flex-col leading-[1.05]">
                          <span>兌</span>
                          <span>換</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div v-if="pair.length === 1" class="w-1/2"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 flex w-full items-center justify-center gap-2">
          <button
            v-for="i in mobileTotalSlides"
            :key="`ticket-dot-${i}`"
            type="button"
            class="transition active:scale-[0.98]"
            :aria-current="i - 1 === mobileActiveIndex ? 'true' : 'false'"
            @click="mobileGoTo(i - 1)"
          >
            <div
              class="h-2 rounded-full transition-[width,transform,background-color] duration-300 ease-out"
              :class="mobileDotClass(i - 1)"
            ></div>
          </button>
        </div>
      </div>

      <!-- 電腦版型 -->
      <div class="mt-8 hidden w-full flex-wrap gap-6 sm:flex">
        <div
          v-for="t in tickets"
          :key="t.id"
          role="button"
          tabindex="0"
          class="flex w-[calc((100%-24px)/2)] cursor-pointer overflow-hidden rounded-3xl bg-[#fffdfb] shadow-sm transition hover:shadow-md active:scale-[0.995]"
          @click="goTicketDetail(t)"
          @keydown.enter="goTicketDetail(t)"
        >
          <div class="flex min-w-0 flex-1 items-center gap-5 px-6 py-4">
            <div
              class="flex h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200"
            >
              <img
                :src="t.imageUrl"
                :alt="t.title"
                class="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div class="min-w-0 flex flex-1 flex-col gap-2">
              <div class="truncate text-[22px] text-slate-900">
                {{ t.title }}
              </div>
              <div class="truncate text-[14px] text-slate-600">
                {{ t.subtitle }}
              </div>
            </div>
          </div>

          <div
            class="relative flex w-44 shrink-0 flex-col items-center justify-center gap-4 overflow-hidden bg-[#fed431] px-5 py-2"
          >
            <div
              class="absolute bottom-6 left-0 top-6 border-l border-dashed border-slate-400/60"
            ></div>

            <div
              class="absolute left-0 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFF9F0]"
            ></div>

            <div class="text-[28px] text-slate-900">{{ t.points }}積分</div>

            <button
              type="button"
              class="h-12 w-32 rounded-full bg-white text-[14px] text-slate-900 shadow-[0_10px_20px_rgba(0,0,0,0.12)] transition active:scale-[0.98]"
              @click.stop="onRedeem(t)"
            >
              兌換
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

const router = useRouter();

const tickets = [
  {
    id: "subway-xinyi",
    title: "Subway信義店",
    subtitle: "PayEasy大吉大利套餐",
    points: 350,
    imageUrl:
      "https://images.unsplash.com/photo-1764344815160-0e2afc6939a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWJ3YXklMjBzYW5kd2ljaCUyMHNob3B8ZW58MXx8fHwxNzY1MTg4ODEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "starbucks-nanjing",
    title: "星巴克南京店",
    subtitle: "中杯咖啡兌換券",
    points: 280,
    imageUrl:
      "https://images.unsplash.com/photo-1581470762681-018024ce84a7?w=1200&h=1200&fit=crop&q=90",
  },
  {
    id: "showtime-xinyi",
    title: "威秀影城信義店",
    subtitle: "電影票兌換券",
    points: 420,
    imageUrl:
      "https://images.unsplash.com/photo-1751823886813-0cfc86cb9478?w=1200&h=1200&fit=crop&q=90",
  },
  {
    id: "cosmed-xiaokao",
    title: "康是美忠孝店",
    subtitle: "購物金兌換券",
    points: 180,
    imageUrl:
      "https://images.unsplash.com/photo-1762420873673-f712e44b5dfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMHN0b3JlJTIwY29sb3JmdWx8ZW58MXx8fHwxNzY1MTg4ODExfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "spa-daan",
    title: "SPA會館大安店",
    subtitle: "按摩體驗券",
    points: 500,
    imageUrl:
      "https://images.unsplash.com/photo-1757689314932-bec6e9c39e51?w=1200&h=1200&fit=crop&q=90",
  },
  {
    id: "carrefour-guilin",
    title: "家樂福桂林店",
    subtitle: "購物金兌換券",
    points: 280,
    imageUrl:
      "https://images.unsplash.com/photo-1627189783170-b65ff48da3b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGNhcnJlZm91ciUyMGNvbG9yZnVsfGVufDF8fHx8MTc2NTE4ODgxMXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

function goTicketDetail(t) {
  router.push(`/ticket/${t.id}`);
}

function onRedeem(t) {
  console.log("[票券] 點擊兌換：", t);
}

const mobileViewportRef = ref(null);
const mobileViewportWidth = ref(0);

function updateMobileViewportWidth() {
  const el = mobileViewportRef.value;
  mobileViewportWidth.value = el ? el.clientWidth : 0;
}

const mobileSlides = computed(() => {
  const list = tickets || [];
  const out = [];
  for (let i = 0; i < list.length; i += 2) {
    out.push([list[i], list[i + 1]].filter(Boolean));
  }
  return out;
});

const mobileActiveIndex = ref(0);
const mobileTotalSlides = computed(() => mobileSlides.value.length);

function clampIndex(i) {
  const max = Math.max(0, mobileTotalSlides.value - 1);
  return Math.min(Math.max(0, i), max);
}

function mobileGoTo(i) {
  mobileActiveIndex.value = clampIndex(i);
}

const isDragging = ref(false);
const dragStartX = ref(0);
const dragDeltaX = ref(0);

const mobileTrackStyle = computed(() => {
  const w = mobileViewportWidth.value || 0;
  const base = -(mobileActiveIndex.value * w);
  const dx = dragDeltaX.value;
  return { transform: `translate3d(${base + dx}px, 0, 0)` };
});

function mobileDotClass(i) {
  const active = i === mobileActiveIndex.value;
  if (active) return "w-8 bg-orange-500";
  return "w-2 bg-slate-300 hover:bg-slate-400";
}

function onTouchStart(e) {
  if (!mobileViewportWidth.value) updateMobileViewportWidth();
  isDragging.value = true;
  dragStartX.value = e.touches?.[0]?.clientX || 0;
  dragDeltaX.value = 0;
}

function onTouchMove(e) {
  if (!isDragging.value) return;
  const x = e.touches?.[0]?.clientX || 0;
  dragDeltaX.value = x - dragStartX.value;
}

function onTouchEnd() {
  finishDrag();
}

function onMouseDown(e) {
  if (!mobileViewportWidth.value) updateMobileViewportWidth();
  isDragging.value = true;
  dragStartX.value = e.clientX || 0;
  dragDeltaX.value = 0;

  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("mouseup", onMouseUp, { passive: true });
}

function onMouseMove(e) {
  if (!isDragging.value) return;
  const x = e.clientX || 0;
  dragDeltaX.value = x - dragStartX.value;
}

function onMouseUp() {
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
  finishDrag();
}

function finishDrag() {
  if (!isDragging.value) return;

  const w = mobileViewportWidth.value || 1;
  const dx = dragDeltaX.value;
  const threshold = Math.min(90, w * 0.18);

  isDragging.value = false;
  dragDeltaX.value = 0;

  if (dx > threshold) {
    mobileGoTo(mobileActiveIndex.value - 1);
    return;
  }

  if (dx < -threshold) {
    mobileGoTo(mobileActiveIndex.value + 1);
    return;
  }
}

onMounted(() => {
  updateMobileViewportWidth();
  window.addEventListener("resize", updateMobileViewportWidth, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateMobileViewportWidth);
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
});
</script>
