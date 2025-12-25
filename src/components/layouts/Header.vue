<!-- src/components/layouts/Header.vue -->
<template>
  <header
    v-if="showHeader"
    ref="headerRef"
    class="fixed left-0 right-0 top-0 z-40 w-full bg-white"
  >
    <div class="relative z-20 w-full border-b border-slate-200 bg-white shadow-md">
      <div class="mx-auto flex h-20 w-full max-w-360 items-center justify-between px-6">
        <div class="flex items-center">
          <button
            v-if="showMobileBack"
            type="button"
            class="flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-700 transition hover:bg-slate-50 active:scale-[0.98] sm:hidden"
            aria-label="返回上一頁"
            @click="goBack"
          >
            <ChevronLeftIcon class="h-6 w-6" />
          </button>

          <router-link to="/" class="flex items-center gap-3">
            <div class="flex flex-col leading-none">
              <img src="../../assets/img/logo.png" class="w-22" alt="Logo" />
            </div>
          </router-link>
        </div>

        <button
          type="button"
          class="flex items-center justify-center rounded-full border border-orange-400 bg-white px-2 py-1 text-[14px] text-orange-400 transition hover:bg-orange-50 active:scale-[0.98] sm:px-4"
          @click="openLoginModal"
        >
          <img src="../../assets/img/avatar.png" alt="user" class="h-6 w-7 block" />
          <span class="hidden sm:inline sm:ml-2">登入</span>
        </button>
      </div>
    </div>

    <!-- Tabbar區塊，點擊跳轉分類頁，手機版型時隱藏 -->
    <div class="relative z-10 hidden w-full bg-white sm:block">
      <div class="mx-auto flex h-14 w-full max-w-360 items-center justify-between px-6">
        <nav class="min-w-0 flex flex-1 items-center">
          <div
            class="min-w-0 flex w-full items-center gap-10 overflow-x-auto whitespace-nowrap pr-4"
          >
            <router-link
              v-for="item in navItems"
              :key="item.slug"
              :to="`/category/${item.slug}`"
              :class="getNavLinkClass(isActiveCategory(item.slug))"
              @click="closeAllCategories"
            >
              {{ item.label }}
            </router-link>
          </div>
        </nav>

        <button
          type="button"
          :class="getAllCategoriesBtnClass(isAllCategoriesOpenOrRoute)"
          @click="toggleAllCategories"
        >
          全部分類
          <ChevronDownIcon
            :class="getChevronClass(isAllCategoriesOpenOrRoute)"
            class="h-4 w-4"
          />
        </button>
      </div>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-show="allCategoriesOpen"
          class="w-full border-t border-slate-200 bg-white shadow-lg"
        >
          <div class="mx-auto flex w-full max-w-360 flex-col px-6 pb-4 pt-8">
            <div class="flex w-full flex-col gap-8">
              <div class="flex w-full flex-col gap-4">
                <div class="text-[15px] font-bold text-orange-400">特店分類</div>

                <div class="flex w-full flex-wrap items-center justify-start gap-3">
                  <button
                    v-for="opt in shopCategoryOptions"
                    :key="opt.value"
                    type="button"
                    :class="getFilterBtnClass(filters.shopCategory === opt.value)"
                    @click="filters.shopCategory = opt.value"
                  >
                    <span class="text-left">{{ opt.label }}</span>
                  </button>
                </div>
              </div>

              <div class="flex w-full flex-col gap-4">
                <div class="text-[15px] font-bold text-orange-400">細部分類</div>

                <div class="flex w-full flex-wrap items-center justify-start gap-3">
                  <button
                    v-for="opt in subCategoryOptions"
                    :key="opt.value"
                    type="button"
                    :class="getFilterBtnClass(filters.subCategory === opt.value)"
                    @click="filters.subCategory = opt.value"
                  >
                    {{ opt.label }}
                  </button>
                </div>
              </div>

              <div class="flex w-full flex-col gap-4">
                <div class="text-[15px] font-bold text-orange-400">縣市區域</div>

                <div class="flex w-full flex-col gap-3 md:flex-row">
                  <select
                    v-model="filters.city"
                    class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-[14px] text-slate-700 outline-none focus:border-orange-300"
                  >
                    <option
                      v-for="opt in cityOptions"
                      :key="opt.value"
                      :value="opt.value"
                    >
                      {{ opt.label }}
                    </option>
                  </select>

                  <select
                    v-model="filters.area"
                    class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-[14px] text-slate-700 outline-none focus:border-orange-300"
                  >
                    <option
                      v-for="opt in areaOptions"
                      :key="opt.value"
                      :value="opt.value"
                    >
                      {{ opt.label }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="flex w-full flex-col gap-4">
                <div class="text-[15px] font-bold text-orange-400">服務</div>

                <div class="flex w-full flex-wrap items-center justify-start gap-3">
                  <button
                    v-for="opt in serviceOptions"
                    :key="opt.value"
                    type="button"
                    :class="getFilterBtnClass(isServiceSelected(opt.value))"
                    @click="toggleService(opt.value)"
                  >
                    {{ opt.label }}
                  </button>
                </div>
              </div>

              <div class="flex w-full flex-col gap-4">
                <div class="text-[15px] font-bold text-orange-400">評分</div>

                <div class="flex w-full flex-wrap items-center justify-start gap-3">
                  <button
                    v-for="opt in ratingOptions"
                    :key="opt.value"
                    type="button"
                    :class="getFilterBtnClass(filters.rating === opt.value)"
                    @click="filters.rating = opt.value"
                  >
                    {{ opt.label }}
                  </button>
                </div>
              </div>

              <div
                class="flex w-full items-center justify-end gap-3 border-t border-slate-200 pt-4"
              >
                <button
                  type="button"
                  class="h-11 rounded-xl border border-slate-200 bg-white px-8 text-[14px] text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
                  @click="resetFilters"
                >
                  清除篩選
                </button>

                <button
                  type="button"
                  class="h-11 rounded-xl bg-orange-400 px-10 text-[14px] text-white shadow-sm transition hover:bg-orange-600 active:scale-[0.98]"
                  @click="applyFilters"
                >
                  確定
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="loginOpen"
        class="fixed inset-0 z-60 flex items-center justify-center px-6"
        @mousedown.self="closeLoginModal"
      >
        <div class="absolute inset-0 bg-slate-900/35"></div>

        <div
          class="relative flex w-full max-w-135 flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl"
        >
          <button
            type="button"
            class="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 active:scale-[0.98]"
            @click="closeLoginModal"
          >
            <XMarkIcon class="h-6 w-6" />
          </button>

          <div class="flex w-full flex-col px-8 pb-10 pt-12">
            <div class="text-[32px] tracking-wide text-slate-900">登入</div>

            <form class="mt-10 flex w-full flex-col gap-8" @submit.prevent="submitLogin">
              <div class="flex w-full flex-col gap-6">
                <div
                  class="flex h-16 w-full items-center gap-4 rounded-2xl bg-slate-100 px-6 ring-2 ring-transparent transition focus-within:ring-orange-400"
                >
                  <UserIcon class="h-6 w-6 text-slate-400" />
                  <input
                    v-model="loginForm.account"
                    type="text"
                    autocomplete="username"
                    inputmode="text"
                    class="h-full w-full bg-transparent text-[18px] text-slate-700 outline-none placeholder:text-slate-400"
                    placeholder="請輸入會員帳號"
                  />
                </div>

                <div
                  class="flex h-16 w-full items-center gap-4 rounded-2xl bg-slate-100 px-6 ring-2 ring-transparent transition focus-within:ring-orange-400"
                >
                  <KeyIcon class="h-6 w-6 text-slate-400" />

                  <input
                    v-model="loginForm.password"
                    :type="showPassword ? 'text' : 'password'"
                    autocomplete="current-password"
                    class="h-full w-full bg-transparent text-[18px] text-slate-700 outline-none placeholder:text-slate-400"
                    placeholder="請輸入密碼"
                  />

                  <button
                    type="button"
                    class="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-200/60 active:scale-[0.98]"
                    @click="togglePassword"
                  >
                    <EyeSlashIcon v-if="showPassword" class="h-6 w-6" />
                    <EyeIcon v-else class="h-6 w-6" />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                class="mt-2 flex h-16 w-full items-center justify-center rounded-2xl bg-orange-500 text-[20px] font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 active:scale-[0.99]"
              >
                登入
              </button>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  UserIcon,
  ChevronDownIcon,
  XMarkIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
  ChevronLeftIcon,
} from "@heroicons/vue/24/outline";
import { regions } from "@/utils/regions";

const router = useRouter();
const route = useRoute();

const headerRef = ref(null);
const allCategoriesOpen = ref(false);

const loginOpen = ref(false);
const showPassword = ref(false);
const loginForm = reactive({
  account: "",
  password: "",
});

const showHeader = computed(() => route?.meta?.layout !== "login");

const showMobileBack = computed(() => {
  return route.path !== "/" && route.name !== "Home";
});

/**
 * 登入導向可能產生的問題：
 * 使用者從外部直接打開 /brand/xxx、/deal/xxx 這種頁：沒有上一頁 → 會自動回首頁，不會卡住。
 */
function goBack() {
  const canBack = window.history.length > 1;

  if (canBack) {
    router.back();
    return;
  }

  router.push("/");
}

const navItems = [
  { label: "美味餐廳", slug: "food" },
  { label: "生活雜貨", slug: "daily" },
  { label: "飯店旅館", slug: "hotel" },
  { label: "運動健身", slug: "sport" },
  { label: "美容保養", slug: "beauty" },
  { label: "咖啡飲品", slug: "coffee" },
  { label: "家電", slug: "appliance" },
  { label: "保健醫療", slug: "health" },
  { label: "傢俱收納", slug: "storage" },
  { label: "手機相機", slug: "mobile" },
  { label: "日用紙品", slug: "paper" },
  { label: "3C周邊", slug: "3c" },
  { label: "寵物用品", slug: "pet" },
  { label: "圖藝", slug: "art" },
];

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
    ...regions.map((r) => ({
      label: r.name,
      value: r.name, // 直接用中文縣市名稱當 value
    })),
  ];
});

const areaOptions = computed(() => {
  const base = [{ label: "所有區域", value: "all" }];

  if (filters.city === "all") return base;

  const city = regions.find((r) => r.name === filters.city);
  const districts = city?.districts || [];

  return [
    ...base,
    ...districts.map((d) => ({
      label: d,
      value: d, // 直接用中文區名當 value
    })),
  ];
});

// 切換縣市時，區域要重設
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

const isAllCategoriesOpenOrRoute = computed(
  () => allCategoriesOpen.value || route.path === "/categories"
);

function isActiveCategory(slug) {
  return route.path === `/category/${slug}`;
}

function getNavLinkClass(active) {
  const base =
    "relative flex h-14 items-center text-[14px] font-medium text-slate-700 transition hover:text-orange-400";
  const activeCls =
    "text-orange-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-orange-400";
  return active ? `${base} ${activeCls}` : base;
}

function getAllCategoriesBtnClass(active) {
  const base =
    "flex shrink-0 items-center rounded-lg px-2 py-2 text-[18px]  transition hover:bg-orange-50";
  const activeCls = "text-orange-400";
  const normalCls = "text-slate-700 hover:text-orange-400";
  return active ? `${base} ${activeCls}` : `${base} ${normalCls}`;
}

function getChevronClass(open) {
  return open ? "transition duration-200 rotate-180" : "transition duration-200";
}

function getFilterBtnClass(active) {
  const base =
    "flex h-10 w-[calc((100%-48px)/5)] items-center justify-start rounded-xl px-4 text-left text-[14px] transition hover:bg-slate-100 active:scale-[0.98]";
  const on = "bg-orange-50 text-orange-400";
  const off = "bg-transparent text-slate-700";
  return active ? `${base} ${on}` : `${base} ${off}`;
}

function openLoginModal() {
  loginOpen.value = true;
  allCategoriesOpen.value = false;
}

function closeLoginModal() {
  loginOpen.value = false;
  showPassword.value = false;
}

function togglePassword() {
  showPassword.value = !showPassword.value;
}

function submitLogin() {
  console.log("[login]", {
    account: loginForm.account,
    password: loginForm.password,
  });
}

function toggleAllCategories() {
  allCategoriesOpen.value = !allCategoriesOpen.value;
}

function closeAllCategories() {
  allCategoriesOpen.value = false;
}

function resetFilters() {
  filters.shopCategory = "all";
  filters.subCategory = "all";
  filters.city = "all";
  filters.area = "all";
  filters.service = [];
  filters.rating = "all";
}

function applyFilters() {
  const query = {
    shopCategory: filters.shopCategory,
    subCategory: filters.subCategory,
    city: filters.city,
    area: filters.area,
    service: filters.service.length ? filters.service.join(",") : "all",
    rating: filters.rating,
  };

  allCategoriesOpen.value = false;
  router.push({ path: "/categories", query });
}

function isServiceSelected(v) {
  return Array.isArray(filters.service) && filters.service.includes(v);
}

function toggleService(v) {
  if (!Array.isArray(filters.service)) {
    filters.service = [];
  }

  const idx = filters.service.indexOf(v);

  if (idx >= 0) {
    filters.service.splice(idx, 1);
    return;
  }

  filters.service.push(v);
}

function onGlobalClick(e) {
  const el = headerRef.value;
  if (!el) return;

  if (loginOpen.value) return;

  if (!allCategoriesOpen.value) return;
  if (el.contains(e.target)) return;
  allCategoriesOpen.value = false;
}

function onGlobalKeydown(e) {
  if (e.key === "Escape") {
    if (loginOpen.value) closeLoginModal();
    allCategoriesOpen.value = false;
  }
}

watch(
  () => route.fullPath,
  () => {
    allCategoriesOpen.value = false;
  }
);

watch(
  () => loginOpen.value,
  (open) => {
    document.body.style.overflow = open ? "hidden" : "";
  }
);

onMounted(() => {
  document.addEventListener("mousedown", onGlobalClick);
  document.addEventListener("keydown", onGlobalKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", onGlobalClick);
  document.removeEventListener("keydown", onGlobalKeydown);
  document.body.style.overflow = "";
});
</script>
