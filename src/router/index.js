// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // 首頁：點擊「台積電」回這裡
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue"),
    meta: { title: "首頁", layout: "default", public: true },
  },

  // 全部品牌列表頁
  {
    path: "/brandList",
    name: "BrandList",
    component: () => import("@/views/BrandListView.vue"),
    meta: { title: "首頁", layout: "default", public: true },
  },

    // 全部品牌列表頁
  {
    path: "/search",
    name: "SearchPage",
    component: () => import("@/views/SearchView.vue"),
    meta: { title: "搜尋結果", layout: "default", public: true },
  },

  // 分類頁（Header 導航列每一個分類都導到這裡，用 slug 區分）
  {
    path: "/category/:slug",
    name: "Category",
    component: () => import("@/views/CategoryView.vue"),
    meta: { title: "分類", layout: "default", public: true },
  },

  // 主題頁（首頁 輪播區塊點擊大卡片會跳轉到這裡，用 id 區分）
  {
    path: "/theme/:id",
    name: "Theme",
    component: () => import("@/views/ThemeView.vue"),
    meta: { title: "主題", layout: "default", public: true },
  },

  // 品牌/品牌列表點進去的詳情頁（用 id）
   {
    path: "/brand/:id",
    name: "BrandDetail",
    component: () => import("@/views/BrandView.vue"),
    meta: { title: "票券詳情", layout: "default", public: true },
  },

  // 優惠/店家列表點進去的詳情頁（用 id）
  {
    path: "/deal/:id",
    name: "DealDetail",
    component: () => import("@/views/DealDetailView.vue"),
    meta: { title: "優惠詳情", layout: "default", public: true },
  },

   // 票券/票券列表點進去的詳情頁（用 id）
   {
    path: "/ticket/:id",
    name: "TicketDetail",
    component: () => import("@/views/TicketView.vue"),
    meta: { title: "票券詳情", layout: "default", public: true },
  },

  // 登入頁：先做成真正的頁面（之後你可改為彈窗，但路由保留）
  {
    path: "/signin",
    name: "SignIn",
    component: () => import("@/views/SignInView.vue"),
    meta: { title: "登入", layout: "login", public: true },
  },

  // 會員中心（未來你真的做會員功能就用這個）
  {
    path: "/me",
    name: "Me",
    component: () => import("@/views/MeView.vue"),
    meta: { title: "我的帳戶", layout: "default", requiresAuth: true },
  },

  // 設定頁
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/SettingsView.vue"),
    meta: { title: "設定", layout: "default", requiresAuth: true },
  },

  // 404
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFoundView.vue"),
    meta: { title: "找不到頁面", layout: "default", public: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

function isAuthed() {
  try {
    return localStorage.getItem("tailadmin_auth") === "1";
  } catch (e) {
    return false;
  }
}

router.beforeEach((to) => {
  const authed = isAuthed();

  // public 頁：直接放行（但如果已登入又去 /signin，就導回首頁）
  if (to?.meta?.public) {
    if (to.name === "SignIn" && authed) return { path: "/" };
    return true;
  }

  // requiresAuth 頁：未登入就導去 /signin
  if (to?.meta?.requiresAuth && !authed) {
    return { path: "/signin", query: { redirect: to.fullPath } };
  }

  return true;
});

router.afterEach((to) => {
  const title = to?.meta?.title ? `${to.meta.title} - 台積電企業福利網` : "台積電企業福利網";
  document.title = title;
});

export default router;
