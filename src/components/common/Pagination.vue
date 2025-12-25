<template>
  <div class="w-full">
    <div class="flex w-full items-center justify-center gap-8">
      <button
        type="button"
        class="flex h-10 w-1 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-50 hover:text-slate-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-400"
        :disabled="currentPage <= 1"
        @click="goPrev"
      >
        ‹
      </button>

      <div class="flex items-center gap-3">
        <button
          v-for="p in pageButtons"
          :key="p"
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-semibold transition active:scale-[0.98]"
          :class="getPageBtnClass(p === currentPage)"
          @click="goPage(p)"
        >
          {{ p }}
        </button>
      </div>

      <button
        type="button"
        class="flex h-10 w-1 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-50 hover:text-slate-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-400"
        :disabled="currentPage >= totalPages"
        @click="goNext"
      >
        ›
      </button>

      <div v-if="showJump" class="items-center gap-3 hidden">
        <div class="text-[14px] font-semibold text-slate-400">跳至</div>

        <input
          v-model="jumpInput"
          inputmode="numeric"
          class="h-10 w-16 rounded-xl border border-slate-200 bg-white px-3 text-center text-[14px] font-semibold text-slate-700 outline-none focus:border-orange-300"
          placeholder="頁"
          @keydown.enter="confirmJump"
        />

        <div class="text-[14px] font-semibold text-slate-400">頁</div>

        <button
          type="button"
          class="h-10 rounded-xl bg-orange-500 px-5 text-[14px] font-semibold text-white shadow-sm transition hover:bg-orange-400 active:scale-[0.98]"
          @click="confirmJump"
        >
          確定
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  modelValue: { type: Number, default: 1 },
  totalItems: { type: Number, default: 0 },
  pageSize: { type: Number, default: 10 },
  maxButtons: { type: Number, default: 5 },
  showJump: { type: Boolean, default: true },
});

const emit = defineEmits(["update:modelValue", "change"]);

const jumpInput = ref("");

const totalPages = computed(() => {
  const n = Math.ceil(Number(props.totalItems || 0) / Number(props.pageSize || 1));
  return Math.max(1, n);
});

const currentPage = computed({
  get() {
    const p = Number(props.modelValue || 1);
    return Math.min(Math.max(1, p), totalPages.value);
  },
  set(v) {
    const next = Math.min(Math.max(1, Number(v || 1)), totalPages.value);
    emit("update:modelValue", next);
    emit("change", {
      page: next,
      pageSize: props.pageSize,
      totalPages: totalPages.value,
    });
  },
});

const pageButtons = computed(() => {
  const t = totalPages.value;
  const max = Math.max(1, Number(props.maxButtons || 5));
  if (t <= max) return Array.from({ length: t }, (_, i) => i + 1);

  const half = Math.floor(max / 2);
  let start = currentPage.value - half;
  start = Math.max(1, start);
  start = Math.min(t - max + 1, start);

  return Array.from({ length: max }, (_, i) => start + i);
});

function getPageBtnClass(active) {
  const base = "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50";
  const on = "border-orange-400 bg-orange-500 text-white hover:bg-orange-400";
  return active ? on : base;
}

function goPage(p) {
  currentPage.value = p;
}

function goPrev() {
  goPage(currentPage.value - 1);
}

function goNext() {
  goPage(currentPage.value + 1);
}

function confirmJump() {
  const n = parseInt(String(jumpInput.value || "").trim(), 10);
  if (!Number.isFinite(n)) {
    jumpInput.value = "";
    return;
  }
  goPage(n);
  jumpInput.value = "";
}

watch(
  () => props.totalItems,
  () => {
    if (currentPage.value > totalPages.value) currentPage.value = totalPages.value;
  }
);
</script>
