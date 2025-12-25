<!-- src/views/TicketView.vue -->
<template>
  <section class="w-full bg-slate-50">
    <!-- 手機版：無卡片 + 底部固定按鈕 -->
    <div class="w-full sm:hidden">
      <div class="w-full bg-white">
        <div class="relative h-65 w-full overflow-hidden bg-slate-100">
          <img
            :src="vm.imageUrl"
            :alt="vm.title"
            class="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div class="flex w-full flex-col px-5 pt-5 pb-24">
          <div class="text-[20px] tracking-wide text-slate-900">
            {{ vm.title }}
          </div>

          <div class="mt-3 flex w-full flex-col gap-2">
            <div class="flex w-full items-center justify-between gap-4">
              <div class="text-[13px] text-slate-500">扣除積分</div>
              <div class="text-[18px] text-orange-500">{{ vm.points }} 積分/份</div>
            </div>

            <div class="flex w-full items-center justify-between gap-4">
              <div class="text-[13px] text-slate-500">可使用期間</div>
              <div class="text-[13px] text-slate-700">
                {{ vm.validFrom }}-{{ vm.validTo }}
              </div>
            </div>
          </div>

          <div class="my-4 h-px w-full bg-slate-200"></div>

          <div class="text-[14px] text-slate-900">使用說明</div>

          <div
            class="ticket-content mt-3 w-full text-[13px] leading-7 text-slate-600"
            v-html="vm.htmlContent"
          ></div>
        </div>
      </div>

      <div
        class="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur shadow-[0_-10px_30px_rgba(15,23,42,0.10)]"
      >
        <div class="mx-auto flex w-full max-w-360 px-5 py-4">
          <button
            type="button"
            class="flex h-14 w-full items-center justify-center rounded-xl bg-orange-500 text-[16px] text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 active:scale-[0.99]"
            @click="onRedeem"
          >
            立即兌換
          </button>
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

          <div class="flex w-full flex-col px-10 pb-8 pt-8">
            <div class="flex w-full flex-col gap-4">
              <div class="text-[28px] tracking-wide text-slate-900">
                {{ vm.title }}
              </div>

              <div class="flex w-full flex-col gap-2">
                <div class="flex w-full items-center justify-between gap-4">
                  <div class="text-[14px] text-slate-500">扣除積分</div>
                  <div class="text-[22px] text-orange-500">{{ vm.points }} 積分/份</div>
                </div>

                <div class="flex w-full items-center justify-between gap-4">
                  <div class="text-[14px] text-slate-500">可使用期間</div>
                  <div class="text-[14px] text-slate-700">
                    {{ vm.validFrom }}-{{ vm.validTo }}
                  </div>
                </div>
              </div>
            </div>

            <div class="my-6 h-px w-full bg-slate-200"></div>

            <div class="flex w-full flex-col gap-6">
              <div class="text-[16px] text-slate-900">使用說明</div>

              <div
                class="ticket-content w-full text-[13px] leading-7 text-slate-600"
                v-html="vm.htmlContent"
              ></div>

              <button
                type="button"
                class="mt-2 flex h-14 w-full items-center justify-center rounded-xl bg-orange-500 text-[16px] text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 active:scale-[0.99]"
                @click="onRedeem"
              >
                立即兌換
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";

const vm = reactive({
  title: "PayEasy大吉大利套餐",
  points: 350,
  validFrom: "2024/08/21",
  validTo: "2024/12/31",
  imageUrl: "https://i.pinimg.com/736x/70/5b/aa/705baaf53f86c52cc60db190745c038c.jpg",
  htmlContent: `
  <div class="section">
    <div class="section-title">使用步驟：</div>
    <ol>
      <li>選擇餐點，前往大吉大利堡，選擇您喜愛的滿額套餐。</li>
      <li>結帳前/結帳時，告知服務人員您持有 PayEasy 優惠券，並出示優惠券號碼。</li>
      <li>輸入優惠碼，如果您使用的是電子優惠券，請在結帳時輸入優惠碼或掃描二維碼。</li>
      <li>享受折扣，結帳時，NT$125 元的折扣將自動應用於您的總金額。</li>
    </ol>
  </div>

  <div class="section">
    <div class="section-title">使用條款：</div>
    <ul>
      <li>此優惠僅限於大吉大利堡套餐與特定的分店使用。</li>
      <li>優惠券不得與其他優惠或促銷活動合併使用。</li>
      <li>優惠券一經使用即失效，不可重複使用。</li>
      <li>請在有效期限內使用，逾期無效。</li>
    </ul>
  </div>
`,
});

function onRedeem() {
  console.log("[ticket] redeem", { title: vm.title, points: vm.points });
}
</script>

<style scoped>
.ticket-content :deep(ol) {
  list-style-type: decimal;
  list-style-position: outside;
  padding-left: 22px;
  margin: 0;
}

.ticket-content :deep(ul) {
  list-style-type: disc;
  list-style-position: outside;
  padding-left: 22px;
  margin: 0;
}

.ticket-content :deep(li) {
  display: list-item;
  margin: 6px 0;
}

.ticket-content :deep(.section) {
  margin-bottom: 22px;
}

.ticket-content :deep(.section-title) {
  font-weight: 400;
  color: #0f172a;
  margin-bottom: 6px;
}
</style>
