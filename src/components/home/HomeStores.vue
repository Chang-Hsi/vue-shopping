<!-- src/components/home/HomeStores.vue -->
<template>
  <section class="w-full">
    <div class="mx-auto flex w-full max-w-360 flex-col px-6 pb-10">
      <div class="flex w-full items-center justify-start">
        <div class="text-[24px] tracking-wide text-slate-900">特約店家</div>
      </div>

      <div class="mt-6 w-full sm:mt-8">
        <div
          class="flex w-full flex-wrap items-start gap-x-3 gap-y-4 sm:gap-x-10 sm:gap-y-10"
        >
          <div
            v-for="s in pagedStores"
            :key="s.id"
            class="flex w-[calc((100%-12px)/2)] flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:shadow-md sm:w-[calc((100%-120px)/4)]"
            role="button"
            tabindex="0"
            @click="goStoreDetail(s)"
            @keydown.enter.prevent="goStoreDetail(s)"
            @keydown.space.prevent="goStoreDetail(s)"
          >
            <div class="relative w-full overflow-hidden">
              <img
                :src="s.coverUrl"
                :alt="s.name"
                class="h-28 w-full object-cover transition-transform duration-300 ease-out hover:scale-[1.06] sm:h-52 sm:hover:scale-[1.2]"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div
              class="flex w-full flex-col gap-1.5 px-3 pb-3 pt-3 sm:gap-2 sm:px-5 sm:pb-5 sm:pt-4"
            >
              <div
                class="line-clamp-1 text-[13px] font-semibold text-slate-900 sm:text-[16px]"
              >
                {{ s.name }}
              </div>

              <div class="line-clamp-1 text-[11px] text-slate-500 sm:text-[13px]">
                {{ s.categoryMain }} ＞ {{ s.categorySub }}
              </div>

              <div class="mt-1 flex w-full items-center justify-between">
                <div
                  class="flex items-center gap-1.5 text-[11px] text-slate-700 sm:gap-2 sm:text-[13px]"
                >
                  <span class="text-orange-500">★</span>
                  <span class="font-semibold">{{ s.rating }}</span>
                </div>

                <div
                  class="flex items-center gap-1.5 text-[11px] text-slate-500 sm:gap-2 sm:text-[13px]"
                >
                  <span class="text-slate-400">⦿</span>
                  <span>{{ s.distance }}</span>
                </div>
              </div>

              <div class="mt-1.5 sm:mt-2">
                <span
                  class="inline-flex max-w-full items-center rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-semibold text-orange-500 sm:px-3 sm:text-[12px]"
                >
                  {{ s.badge }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full pt-8 sm:pt-10">
          <Pagination
            v-model="page"
            :total-items="stores.length"
            :page-size="pageSize"
            :max-buttons="5"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import Pagination from "@/components/common/Pagination.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const stores = ref([
  {
    id: "s1",
    name: "王品牛排 台北信義店",
    categoryMain: "美食",
    categorySub: "連鎖餐廳",
    rating: "4.5",
    distance: "1.2km",
    badge: "平日午餐9折優惠券",
    coverUrl:
      "https://images.unsplash.com/photo-1558030006-450675393462?w=1200&h=900&fit=crop&q=90",
  },
  {
    id: "s2",
    name: "屈臣氏 忠孝復興門市",
    categoryMain: "美妝保養",
    categorySub: "連鎖藥妝",
    rating: "4.3",
    distance: "0.8km",
    badge: "滿千送百購物金",
    coverUrl:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop",
  },
  {
    id: "s3",
    name: "誠品書店 信義旗艦店",
    categoryMain: "書籍文具",
    categorySub: "連鎖書店",
    rating: "4.7",
    distance: "1.5km",
    badge: "會員專屬折價券",
    coverUrl:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=300&h=200&fit=crop",
  },
  {
    id: "s4",
    name: "NET 西門門市",
    categoryMain: "服飾配件",
    categorySub: "服飾店",
    rating: "4.2",
    distance: "2.3km",
    badge: "新品上市優惠券",
    coverUrl:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=300&h=200&fit=crop",
  },
  {
    id: "s5",
    name: "85度C 南京東路店",
    categoryMain: "咖啡飲品",
    categorySub: "連鎖咖啡",
    rating: "4.4",
    distance: "0.5km",
    badge: "指定商品買一送一",
    coverUrl:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=300&h=200&fit=crop",
  },
  {
    id: "s6",
    name: "寶雅 中山店",
    categoryMain: "生活百貨",
    categorySub: "連鎖商店",
    rating: "4.1",
    distance: "1.8km",
    badge: "滿額贈品兌換券",
    coverUrl:
      "https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=300&h=200&fit=crop",
  },
  {
    id: "s7",
    name: "SOGO 忠孝館",
    categoryMain: "百貨商場",
    categorySub: "百貨公司",
    rating: "4.6",
    distance: "1.3km",
    badge: "週年慶滿額禮券",
    coverUrl:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=300&h=200&fit=crop",
  },
  {
    id: "s8",
    name: "家樂福 桂林店",
    categoryMain: "量販超市",
    categorySub: "連鎖超市",
    rating: "4.0",
    distance: "2.7km",
    badge: "生鮮商品折扣券",
    coverUrl:
      "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=300&h=200&fit=crop",
  },
  {
    id: "s9",
    name: "Uniqlo 信義旗艦店",
    categoryMain: "服飾配件",
    categorySub: "服飾店",
    rating: "4.5",
    distance: "1.6km",
    badge: "限時特價優惠券",
    coverUrl:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=200&fit=crop",
  },
  {
    id: "s10",
    name: "莫凡彼 微風廣場店",
    categoryMain: "冰品甜點",
    categorySub: "冰淇淋",
    rating: "4.8",
    distance: "1.1km",
    badge: "VIP點數回饋券",
    coverUrl:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop",
  },
  {
    id: "s11",
    name: "健身工廠 內湖旗艦店",
    categoryMain: "運動健身",
    categorySub: "健身中心",
    rating: "4.4",
    distance: "3.2km",
    badge: "首月入會優惠券",
    coverUrl:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop",
  },
  {
    id: "s12",
    name: "康是美 南京店",
    categoryMain: "藥妝保健",
    categorySub: "連鎖藥妝",
    rating: "4.3",
    distance: "0.9km",
    badge: "會員獨享折扣券",
    coverUrl:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop",
  },
]);

const pageSize = 8;
const page = ref(1);

const totalPages = computed(() => {
  const n = Math.ceil(stores.value.length / pageSize);
  return Math.max(1, n);
});

function goStoreDetail(s) {
  router.push(`/deal/${s.id}`);
}

watch(
  () => stores.value.length,
  () => {
    if (page.value > totalPages.value) page.value = totalPages.value;
  }
);

const pagedStores = computed(() => {
  const start = (page.value - 1) * pageSize;
  return stores.value.slice(start, start + pageSize);
});
</script>
