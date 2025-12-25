<!-- src/components/common/MobileSheet.vue -->
<template>
  <teleport to="body">
    <!-- 遮罩 -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" class="fixed inset-0 z-60 bg-black/40" @click="close"></div>
    </transition>

    <!-- Sheet -->
    <transition
      enter-active-class="transition duration-250 ease-out"
      enter-from-class="translate-y-full"
      enter-to-class="translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0"
      leave-to-class="translate-y-full"
    >
      <div v-if="modelValue" class="fixed inset-x-0 bottom-0 z-70 w-full" @click.stop>
        <div class="mx-auto w-full max-w-130">
          <div
            class="w-full overflow-hidden rounded-t-3xl bg-white shadow-2xl"
            :style="{ maxHeight: maxHeight }"
          >
            <!-- Header -->
            <div class="flex w-full items-center justify-between px-6 pb-4 pt-5">
              <div class="text-[20px] font-extrabold tracking-wide text-slate-900">
                分類篩選
              </div>

              <button
                type="button"
                class="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 active:scale-[0.98]"
                aria-label="關閉"
                @click="close"
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
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="h-px w-full bg-slate-200"></div>

            <!-- Content -->
            <div class="relative flex w-full flex-col px-6 pb-24 pt-6">
              <div
                class="flex w-full flex-col gap-8 overflow-auto"
                :style="{ maxHeight: contentMaxHeight }"
              >
                <!-- 特店分類 -->
                <div class="flex w-full flex-col gap-4">
                  <div class="text-[16px] font-extrabold text-orange-500">特店分類</div>
                  <div class="flex w-full flex-wrap">
                    <div
                      v-for="opt in shopCategoryOptions"
                      :key="opt.value"
                      class="w-1/3 py-2"
                    >
                      <button
                        type="button"
                        class="h-8 w-full rounded-xl px-1 text-center text-[14px] transition active:scale-[0.98]"
                        :class="
                          filters.shopCategory === opt.value
                            ? 'bg-orange-50 text-orange-500 ring-1 ring-orange-100'
                            : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-orange-500 hover:ring-0'
                        "
                        @click="filters.shopCategory = opt.value"
                      >
                        {{ opt.label }}
                      </button>
                    </div>
                  </div>
                </div>

                <!-- 細部分類 -->
                <div class="flex w-full flex-col gap-4">
                  <div class="text-[16px] font-extrabold text-orange-500">細部分類</div>
                  <div class="flex w-full flex-wrap">
                    <div
                      v-for="opt in subCategoryOptions"
                      :key="opt.value"
                      class="w-1/3 py-2"
                    >
                      <button
                        type="button"
                        class="h-8 w-full rounded-xl px-1 text-center text-[14px] transition active:scale-[0.98]"
                        :class="
                          filters.subCategory === opt.value
                            ? 'bg-orange-50 text-orange-500 ring-1 ring-orange-100'
                            : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-orange-500 hover:ring-0'
                        "
                        @click="filters.subCategory = opt.value"
                      >
                        {{ opt.label }}
                      </button>
                    </div>
                  </div>
                </div>

                <!-- 縣市區域 -->
                <div class="flex w-full flex-col gap-4">
                  <div class="text-[16px] font-extrabold text-orange-500">縣市區域</div>

                  <div class="flex w-full gap-3">
                    <Dropdown
                      v-model="filters.city"
                      :options="cityOptions"
                      optionLabel="label"
                      optionValue="value"
                      placeholder="所有縣市"
                      class="w-full"
                      :pt="{
                        root: {
                          class:
                            'h-12 w-full rounded-2xl border border-slate-200 bg-white',
                        },
                        input: { class: 'px-4 text-[14px] text-slate-700' },
                        trigger: { class: 'text-slate-500 pr-3' },
                        panel: { class: 'rounded-xl border border-slate-200 shadow-lg' },
                        item: { class: 'text-[14px] text-slate-700 hover:bg-slate-50' },
                      }"
                    />

                    <Dropdown
                      v-model="filters.area"
                      :options="areaOptions"
                      optionLabel="label"
                      optionValue="value"
                      placeholder="所有區域"
                      class="w-full"
                      :pt="{
                        root: {
                          class:
                            'h-12 w-full rounded-2xl border border-slate-200 bg-white disabled:opacity-60',
                        },
                        input: { class: 'px-4 text-[14px] text-slate-700' },
                        trigger: { class: 'text-slate-500 pr-3' },
                        panel: { class: 'rounded-xl border border-slate-200 shadow-lg' },
                        item: { class: 'text-[14px] text-slate-700 hover:bg-slate-50' },
                      }"
                    />
                  </div>
                </div>

                <!-- 服務 -->
                <div class="flex w-full flex-col gap-4">
                  <div class="text-[16px] font-extrabold text-orange-500">服務</div>

                  <div class="flex w-full flex-wrap">
                    <div
                      v-for="opt in serviceOptions"
                      :key="opt.value"
                      class="w-1/3 px-1 py-2"
                    >
                      <button
                        type="button"
                        class="h-8 w-full rounded-xl px-1 text-center text-[14px] transition active:scale-[0.98]"
                        :class="
                          isServiceSelected(opt.value)
                            ? 'bg-orange-50 text-orange-500 ring-1 ring-orange-100'
                            : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-orange-500 hover:ring-0'
                        "
                        @click="toggleService(opt.value)"
                      >
                        {{ opt.label }}
                      </button>
                    </div>
                  </div>
                </div>

                <!-- 評分 -->
                <div class="flex w-full flex-col gap-4">
                  <div class="text-[16px] font-extrabold text-orange-500">評分</div>

                  <div class="flex w-full flex-wrap">
                    <div
                      v-for="opt in ratingOptions"
                      :key="opt.value"
                      class="w-1/3 px-1 py-2"
                    >
                      <button
                        type="button"
                        class="h-8 w-full rounded-xl px-1 text-center text-[14px] transition active:scale-[0.98]"
                        :class="
                          filters.rating === opt.value
                            ? 'bg-orange-50 text-orange-500 ring-1 ring-orange-100'
                            : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-orange-500 hover:ring-0'
                        "
                        @click="filters.rating = opt.value"
                      >
                        {{ opt.label }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="pointer-events-none absolute inset-x-0 bottom-0">
                <div class="mx-auto w-full max-w-130 border-t border-slate-300">
                  <div class="pointer-events-auto w-full bg-white px-6 pb-6 pt-4">
                    <div class="flex w-full items-center gap-3">
                      <button
                        type="button"
                        class="h-12 flex-1 rounded-2xl bg-white text-[15px] font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50 active:scale-[0.98]"
                        @click="resetFilters"
                      >
                        清除篩選
                      </button>

                      <button
                        type="button"
                        class="h-12 flex-1 rounded-2xl bg-orange-400 text-[15px] font-semibold text-white shadow-sm transition hover:bg-orange-500 active:scale-[0.98]"
                        @click="apply"
                      >
                        確定
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /Footer -->
            </div>
            <!-- /Content -->
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, watch } from "vue";
import Dropdown from "primevue/dropdown";

import { regions } from "@/utils/regions";

const props = defineProps({
  modelValue: { type: Boolean, default: false },

  // 你要「不要佔滿整個高度」就是調這兩個
  maxHeight: { type: String, default: "80vh" },
  contentMaxHeight: { type: String, default: "min(75vh, 560px)" },
});

const emit = defineEmits(["update:modelValue", "apply"]);

const filters = reactive({
  shopCategory: "all",
  subCategory: "all",
  city: "all",
  area: "all",
  service: [],
  rating: "all",
});

const shopCategoryOptions = [
  { label: "全部分類", value: "all" },
  { label: "美食", value: "food" },
  { label: "購物", value: "shopping" },
  { label: "住宿", value: "stay" },
  { label: "娛樂", value: "fun" },
  { label: "交通", value: "traffic" },
  { label: "教育", value: "edu" },
  { label: "美容美髮", value: "beauty" },
];

const SUBCATEGORY_BY_SHOP = {
  all: [{ label: "全部選項", value: "all" }],
  food: [
    { label: "所有美食", value: "all" },
    { label: "美味餐廳", value: "restaurant" },
    { label: "人氣小吃", value: "snack" },
    { label: "知名飲品", value: "drink" },
    { label: "咖啡廳", value: "cafe" },
    { label: "麵包烘焙", value: "bakery" },
    { label: "下午茶", value: "tea" },
    { label: "餐酒館", value: "bistro" },
    { label: "其他食品", value: "other_food" },
  ],
  shopping: [
    { label: "所有購物", value: "all" },
    { label: "生活百貨", value: "daily_goods" },
    { label: "3C電器", value: "electronics" },
    { label: "服飾鞋包", value: "fashion" },
    { label: "美妝保養", value: "cosmetics" },
    { label: "圖書文具", value: "books_stationery" },
    { label: "運動用品", value: "sports_goods" },
    { label: "居家生活", value: "home_living" },
    { label: "其他購物", value: "other_shopping" },
  ],
  stay: [
    { label: "所有住宿", value: "all" },
    { label: "飯店旅館", value: "hotel" },
    { label: "民宿", value: "bnb" },
    { label: "商務旅館", value: "business_hotel" },
    { label: "渡假村", value: "resort" },
    { label: "青年旅館", value: "hostel" },
    { label: "其他住宿", value: "other_stay" },
  ],
  fun: [
    { label: "所有娛樂", value: "all" },
    { label: "電影院", value: "cinema" },
    { label: "KTV", value: "ktv" },
    { label: "遊樂場", value: "amusement" },
    { label: "密室逃脫", value: "escape_room" },
    { label: "展覽館", value: "exhibition" },
    { label: "運動場館", value: "sports_venue" },
    { label: "其他娛樂", value: "other_fun" },
  ],
  traffic: [
    { label: "所有交通", value: "all" },
    { label: "停車場", value: "parking" },
    { label: "加油站", value: "gas_station" },
    { label: "租車服務", value: "car_rental" },
    { label: "計程車", value: "taxi" },
    { label: "大眾運輸", value: "public_transport" },
    { label: "其他交通", value: "other_traffic" },
  ],
  edu: [
    { label: "所有教育", value: "all" },
    { label: "補習班", value: "cram_school" },
    { label: "才藝班", value: "talent_class" },
    { label: "語言學習", value: "language" },
    { label: "線上課程", value: "online_course" },
    { label: "圖書館", value: "library" },
    { label: "其他教育", value: "other_edu" },
  ],
  beauty: [
    { label: "所有美容美髮", value: "all" },
    { label: "美髮沙龍", value: "hair_salon" },
    { label: "美甲美睫", value: "nail_lash" },
    { label: "SPA按摩", value: "spa" },
    { label: "醫美診所", value: "aesthetic_clinic" },
    { label: "美體護膚", value: "body_skin" },
    { label: "其他美容", value: "other_beauty" },
  ],
};

const subCategoryOptions = computed(() => {
  return (
    SUBCATEGORY_BY_SHOP[filters.shopCategory] || [{ label: "全部選項", value: "all" }]
  );
});

watch(
  () => filters.shopCategory,
  () => {
    filters.subCategory = "all";
  }
);

const cityOptions = computed(() => {
  return [
    { label: "所有縣市", value: "all" },
    ...regions.map((r) => ({ label: r.name, value: r.name })),
  ];
});

const areaOptions = computed(() => {
  const base = [{ label: "所有區域", value: "all" }];
  if (filters.city === "all") return base;

  const city = regions.find((r) => r.name === filters.city);
  const districts = city?.districts || [];
  return [...base, ...districts.map((d) => ({ label: d, value: d }))];
});

watch(
  () => filters.city,
  () => {
    filters.area = "all";
  }
);

const serviceOptions = [
  { label: "可刷卡", value: "card" },
  { label: "寵物友善", value: "pet" },
  { label: "台新Pay", value: "ts-pay" },
  { label: "提供插座", value: "socket" },
  { label: "停車場", value: "parking" },
  { label: "叫車服務", value: "taxi" },
  { label: "提供WIFI", value: "wifi" },
  { label: "汽車充電站", value: "ev" },
  { label: "可預約", value: "booking" },
  { label: "包廂服務", value: "room" },
];

const ratingOptions = [
  { label: "不限", value: "all" },
  { label: "4.5+", value: "4.5" },
  { label: "4+", value: "4" },
  { label: "3.5+", value: "3.5" },
];

function close() {
  emit("update:modelValue", false);
}

function resetFilters() {
  filters.shopCategory = "all";
  filters.subCategory = "all";
  filters.city = "all";
  filters.area = "all";
  filters.service = [];
  filters.rating = "all";
}

function isServiceSelected(v) {
  return Array.isArray(filters.service) && filters.service.includes(v);
}

function toggleService(v) {
  if (!Array.isArray(filters.service)) filters.service = [];
  const idx = filters.service.indexOf(v);
  if (idx >= 0) {
    filters.service.splice(idx, 1);
    return;
  }
  filters.service.push(v);
}

function apply() {
  const payload = {
    shopCategory: filters.shopCategory,
    subCategory: filters.subCategory,
    city: filters.city,
    area: filters.area,
    service: filters.service.length ? filters.service.join(",") : "all",
    rating: filters.rating,
  };

  emit("apply", payload);
  close();
}

function onKeydown(e) {
  if (!props.modelValue) return;
  if (e.key === "Escape") close();
}

watch(
  () => props.modelValue,
  (open) => {
    document.body.style.overflow = open ? "hidden" : "";
  }
);

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
</script>
