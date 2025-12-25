<!-- src/views/DealDetailView.vue -->
<template>
  <section class="w-full bg-slate-50">
    <!-- 手機版：無卡片（圖片 + 內容區塊） -->
    <div class="w-full sm:hidden">
      <div class="w-full bg-white">
        <!-- 圖片區塊 -->
        <div class="relative h-65 w-full overflow-hidden bg-slate-100">
          <img
            :src="vm.imageUrl"
            :alt="vm.title"
            class="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        <!-- 內容 -->
        <div class="flex w-full flex-col px-5 pb-8 pt-5">
          <!-- 標題 -->
          <div class="text-[22px] tracking-wide text-slate-900">
            {{ vm.title }}
          </div>

          <!-- 副標 -->
          <div class="mt-2 text-[13px] text-slate-500">
            {{ vm.categoryMain }} ＞ {{ vm.categorySub }}
          </div>

          <!-- 評分 / 距離 -->
          <div class="mt-3 flex w-full items-center gap-6 text-[13px] text-slate-600">
            <div class="flex items-center gap-2">
              <StarIcon class="h-4.5 w-4.5 text-orange-500" />
              <span class="text-slate-700">{{ vm.rating }}</span>
            </div>

            <div class="flex items-center gap-2">
              <MapPinIcon class="h-4.5 w-4.5 text-slate-400" />
              <span>{{ vm.distance }}</span>
            </div>
          </div>

          <!-- 資訊列表 -->
          <div class="mt-5 flex w-full flex-col gap-3 text-[13px]">
            <div class="flex w-full items-start justify-between gap-6">
              <div class="w-24 shrink-0 text-slate-500">營業時間</div>
              <div class="min-w-0 flex-1 text-right text-slate-700">
                {{ vm.hours }}
              </div>
            </div>

            <div class="flex w-full items-start justify-between gap-6">
              <div class="w-24 shrink-0 text-slate-500">電話</div>
              <div class="min-w-0 flex-1 text-right text-slate-700">
                {{ vm.phone }}
              </div>
            </div>

            <div class="flex w-full items-start justify-between gap-6">
              <div class="w-24 shrink-0 text-slate-500">地址</div>
              <div class="min-w-0 flex-1 text-right text-slate-700">
                {{ vm.address }}
              </div>
            </div>
          </div>

          <!-- 分隔線 -->
          <div class="my-6 h-px w-full bg-slate-200"></div>

          <!-- 內文：店家介紹 -->
          <div class="flex w-full flex-col gap-3">
            <div class="text-[14px] text-slate-900">店家介紹</div>

            <div class="deal-content w-full text-[13px] leading-7 text-slate-600">
              <p v-for="(p, idx) in vm.introParagraphs" :key="idx" class="mb-4 last:mb-0">
                {{ p }}
              </p>
            </div>
          </div>

          <!-- 內文：使用說明 -->
          <div class="mt-8 flex w-full flex-col gap-3">
            <div class="text-[14px] text-slate-900">優惠使用說明</div>

            <div class="deal-content w-full text-[13px] leading-7 text-slate-600">
              <ul>
                <li v-for="(r, idx) in vm.rules" :key="idx">{{ r }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 桌機/平板版：保留你原本卡片 -->
    <div class="mx-auto hidden w-full max-w-360 px-6 py-10 sm:flex">
      <div class="flex w-full justify-center">
        <div
          class="flex w-full max-w-245 flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200"
        >
          <div class="relative h-150 w-full overflow-hidden bg-slate-100">
            <img
              :src="vm.imageUrl"
              :alt="vm.title"
              class="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div class="flex w-full flex-col px-10 pb-10 pt-8">
            <div class="flex w-full flex-col gap-3">
              <div class="text-[28px] tracking-wide text-slate-900">
                {{ vm.title }}
              </div>

              <div class="text-[14px] text-slate-500">
                {{ vm.categoryMain }} ＞ {{ vm.categorySub }}
              </div>

              <div class="flex w-full items-center gap-6 pt-1 text-[14px] text-slate-600">
                <div class="flex items-center gap-2">
                  <StarIcon class="h-5 w-5 text-orange-500" />
                  <span class="text-slate-700">{{ vm.rating }}</span>
                </div>

                <div class="flex items-center gap-2">
                  <MapPinIcon class="h-5 w-5 text-slate-400" />
                  <span>{{ vm.distance }}</span>
                </div>
              </div>

              <div class="pt-4">
                <div class="flex w-full flex-col gap-3 text-[13px]">
                  <div class="flex w-full items-start justify-between gap-6">
                    <div class="w-24 shrink-0 text-slate-500">營業時間</div>
                    <div class="min-w-0 flex-1 text-right text-slate-700">
                      {{ vm.hours }}
                    </div>
                  </div>

                  <div class="flex w-full items-start justify-between gap-6">
                    <div class="w-24 shrink-0 text-slate-500">電話</div>
                    <div class="min-w-0 flex-1 text-right text-slate-700">
                      {{ vm.phone }}
                    </div>
                  </div>

                  <div class="flex w-full items-start justify-between gap-6">
                    <div class="w-24 shrink-0 text-slate-500">地址</div>
                    <div class="min-w-0 flex-1 text-right text-slate-700">
                      {{ vm.address }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="my-8 h-px w-full bg-slate-200"></div>

            <div class="flex w-full flex-col gap-10">
              <div class="flex w-full flex-col gap-4">
                <div class="text-[16px] text-slate-900">店家介紹</div>

                <div class="deal-content w-full text-[13px] leading-7 text-slate-600">
                  <p
                    v-for="(p, idx) in vm.introParagraphs"
                    :key="idx"
                    class="mb-4 last:mb-0"
                  >
                    {{ p }}
                  </p>
                </div>
              </div>

              <div class="flex w-full flex-col gap-4">
                <div class="text-[16px] text-slate-900">優惠使用說明</div>

                <div class="deal-content w-full text-[13px] leading-7 text-slate-600">
                  <ul>
                    <li v-for="(r, idx) in vm.rules" :key="idx">{{ r }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import { StarIcon, MapPinIcon } from "@heroicons/vue/24/solid";

const vm = reactive({
  title: "85度C 南京東路店",
  categoryMain: "咖啡飲品",
  categorySub: "連鎖咖啡",
  rating: 4.4,
  distance: "0.5km",
  hours: "週一至週日 11:00-22:00",
  phone: "02-2345-6789",
  address: "台北市信義區信義路五段7號",
  imageUrl:
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&h=800&fit=crop&q=90",
  introParagraphs: [
    "王品牛排創立於1993年，秉持「只款待心中最重要的人」的品牌精神，為每一位貴賓提供最頂級的用餐體驗。我們嚴選 prime 等級牛肉，搭配主廚特製醬汁，呈現最完美的口感與風味。",
    "台北信義店位於信義商圈核心地帶，擁有寬敞舒適的用餐環境與專業親切的服務團隊。無論是商務宴請、家庭聚餐或浪漫約會，我們都能為您打造難忘的美食時光。",
    "店內提供完整的套餐服務，包含精緻沙拉吧、主廚湯品、主餐、甜點及飲品。每一道菜餚都經過嚴格品管，確保食材新鮮與烹調火候，讓您享受五星級的餐宴體驗。",
  ],
  rules: [
    "請於消費前出示優惠券給店員確認",
    "每人每次限用一張優惠券",
    "本優惠不得與其他優惠併用",
    "優惠券使用前請先電話預約訂位",
    "特殊節日（春節、情人節、母親節等）可能不適用",
    "店家保留活動修改、暫停或終止之權利",
    "詳細使用規範以現場公告為準",
  ],
});
</script>

<style scoped>
.deal-content :deep(ul) {
  list-style-type: disc;
  list-style-position: outside;
  padding-left: 22px;
  margin: 0;
}

.deal-content :deep(li) {
  display: list-item;
  margin: 8px 0;
}

.deal-content :deep(p) {
  margin: 0;
}
</style>
