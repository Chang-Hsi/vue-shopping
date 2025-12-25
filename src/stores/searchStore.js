// src/stores/searchStore.js
import { defineStore } from "pinia";

function makeStore({
  id,
  brand, // 熱門關鍵字群組，例如：IKEA / 星巴克 / 誠品書店...
  name,
  categoryMain,
  categorySub,
  rating,
  distance,
  badge,
  coverUrl,
}) {
  return {
    id,
    brand,
    name,
    categoryMain,
    categorySub,
    rating,
    distance,
    badge: badge || "",
    coverUrl: coverUrl || "",
  };
}

function normalizeText(v) {
  return String(v || "")
    .trim()
    .toLowerCase();
}

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    hotKeywords: ["星巴克", "IKEA", "全聯", "家樂福", "誠品書店", "康是美", "屈臣氏", "寶雅"],

    storesByKeyword: {
      誠品書店: [
        makeStore({
          id: "eslite-xinyi",
          brand: "誠品書店",
          name: "誠品書店 信義旗艦店",
          categoryMain: "書籍文具",
          categorySub: "連鎖書店",
          rating: "4.7",
          distance: "1.5km",
          coverUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=300&h=200&fit=crop", 
        }),
        makeStore({
          id: "eslite-songyan",
          brand: "誠品書店",
          name: "誠品書店 松菸店",
          categoryMain: "書籍文具",
          categorySub: "連鎖書店",
          rating: "4.8",
          distance: "1.8km",
          coverUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200&h=900&fit=crop&q=90", 
        }),
        makeStore({
          id: "eslite-nangang",
          brand: "誠品書店",
          name: "誠品書店 南港店",
          categoryMain: "書籍文具",
          categorySub: "連鎖書店",
          rating: "4.6",
          distance: "2.9km",
          coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&h=900&fit=crop&q=90", 
        }),
        makeStore({
          id: "eslite-banqiao",
          brand: "誠品書店",
          name: "誠品書店 板橋店",
          categoryMain: "書籍文具",
          categorySub: "連鎖書店",
          rating: "4.7",
          distance: "3.5km",
          coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=900&fit=crop&q=90", 
        }),
        makeStore({
          id: "eslite-dunhua",
          brand: "誠品書店",
          name: "誠品書店 敦南店",
          categoryMain: "書籍文具",
          categorySub: "連鎖書店",
          rating: "4.9",
          distance: "1.1km",
          coverUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=300&h=200&fit=crop", 
        }),
      ],

      IKEA: [
        makeStore({
          id: "ikea-main",
          brand: "IKEA",
          name: "IKEA",
          categoryMain: "家居",
          categorySub: "傢俱",
          rating: "4.6",
          distance: "4.2km",
          coverUrl: "https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=300&h=200&fit=crop", 
        }),
        makeStore({
          id: "ikea-xinzhuang",
          brand: "IKEA",
          name: "IKEA 新莊店",
          categoryMain: "家居生活",
          categorySub: "家具賣場",
          rating: "4.5",
          distance: "4.5km",
          coverUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&h=200&fit=crop", 
        }),
        makeStore({
          id: "ikea-taipei",
          brand: "IKEA",
          name: "IKEA 台北店",
          categoryMain: "家居生活",
          categorySub: "家具賣場",
          rating: "4.6",
          distance: "5.1km",
          coverUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop", 
        }),
        makeStore({
          id: "ikea-taoyuan",
          brand: "IKEA",
          name: "IKEA 桃園店",
          categoryMain: "家居生活",
          categorySub: "家具賣場",
          rating: "4.5",
          distance: "15.2km",
          coverUrl: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=300&h=200&fit=crop", 
        }),
        makeStore({
          id: "ikea-taichung",
          brand: "IKEA",
          name: "IKEA 台中店",
          categoryMain: "家居生活",
          categorySub: "家具賣場",
          rating: "4.7",
          distance: "18.5km",
          coverUrl: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=300&h=200&fit=crop", 
        }),
      ],

      星巴克: [
        makeStore({
          id: "starbucks-dunhua",
          brand: "星巴克",
          name: "星巴克 敦南門市",
          categoryMain: "咖啡飲品",
          categorySub: "連鎖咖啡",
          rating: "4.7",
          distance: "0.6km",
          coverUrl: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=300&h=200&fit=crop", 
        }),
        makeStore({
          id: "starbucks-xinyi",
          brand: "星巴克",
          name: "星巴克 信義門市",
          categoryMain: "咖啡飲品",
          categorySub: "連鎖咖啡",
          rating: "4.7",
          distance: "1.2km",
          coverUrl: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=1200&h=900&fit=crop&q=90", 
        }),
        makeStore({
          id: "starbucks-nangang",
          brand: "星巴克",
          name: "星巴克 南港門市",
          categoryMain: "咖啡飲品",
          categorySub: "連鎖咖啡",
          rating: "4.6",
          distance: "2.8km",
          coverUrl: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&h=900&fit=crop&q=90", 
        }),
        makeStore({
          id: "starbucks-banqiao",
          brand: "星巴克",
          name: "星巴克 板橋門市",
          categoryMain: "咖啡飲品",
          categorySub: "連鎖咖啡",
          rating: "4.5",
          distance: "3.2km",
          coverUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=900&fit=crop&q=90", 
        }),
        makeStore({
          id: "starbucks-zhongshan",
          brand: "星巴克",
          name: "星巴克 中山門市",
          categoryMain: "咖啡飲品",
          categorySub: "連鎖咖啡",
          rating: "4.6",
          distance: "0.9km",
          coverUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&h=900&fit=crop&q=90", 
        }),
      ],

      全聯: [
        makeStore({
          id: "pxmart-xinyi",
          brand: "全聯",
          name: "全聯 信義店",
          categoryMain: "量販超市",
          categorySub: "連鎖超市",
          rating: "4.3",
          distance: "0.8km",
          coverUrl: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&h=900&fit=crop&q=90", 
        }),
        makeStore({
          id: "pxmart-taipei",
          brand: "全聯",
          name: "全聯 大安店",
          categoryMain: "量販超市",
          categorySub: "連鎖超市",
          rating: "4.2",
          distance: "1.2km",
          coverUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=900&fit=crop&q=90", 
        }),
        makeStore({
          id: "pxmart-nangang",
          brand: "全聯",
          name: "全聯 南港店",
          categoryMain: "量販超市",
          categorySub: "連鎖超市",
          rating: "4.4",
          distance: "2.5km",
          coverUrl: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=1200&h=900&fit=crop&q=90", 
        }),
        makeStore({
          id: "pxmart-banqiao",
          brand: "全聯",
          name: "全聯 板橋店",
          categoryMain: "量販超市",
          categorySub: "連鎖超市",
          rating: "4.1",
          distance: "3.8km",
          coverUrl: "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=1200&h=900&fit=crop&q=90", 
        }),
        makeStore({
          id: "pxmart-neihu",
          brand: "全聯",
          name: "全聯 內湖店",
          categoryMain: "量販超市",
          categorySub: "連鎖超市",
          rating: "4.3",
          distance: "2.9km",
          coverUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=900&fit=crop&q=90", 
        }),
        makeStore({
          id: "pxmart-songshan",
          brand: "全聯",
          name: "全聯 松山店",
          categoryMain: "量販超市",
          categorySub: "連鎖超市",
          rating: "4.2",
          distance: "1.5km",
          coverUrl: "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=1200&h=900&fit=crop&q=90", 
        }),
      ],

      家樂福: [
        makeStore({
          id: "carrefour-xinzhuang",
          brand: "家樂福",
          name: "家樂福 新莊店",
          categoryMain: "量販賣場",
          categorySub: "大型超市",
          rating: "4.4",
          distance: "4.0km",
          coverUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=900&fit=crop&q=90", 
          badge: "停車方便",
        }),
        makeStore({
          id: "carrefour-neihu",
          brand: "家樂福",
          name: "家樂福 內湖店",
          categoryMain: "量販賣場",
          categorySub: "大型超市",
          rating: "4.3",
          distance: "3.2km",
          coverUrl: "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=1200&h=900&fit=crop&q=90", 
        }),
        makeStore({
          id: "carrefour-banqiao",
          brand: "家樂福",
          name: "家樂福 板橋店",
          categoryMain: "量販賣場",
          categorySub: "大型超市",
          rating: "4.2",
          distance: "4.8km",
          coverUrl: "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=1200&h=900&fit=crop&q=90", 
        }),
        makeStore({
          id: "carrefour-taoyuan",
          brand: "家樂福",
          name: "家樂福 桃園店",
          categoryMain: "量販賣場",
          categorySub: "大型超市",
          rating: "4.2",
          distance: "15.0km",
          coverUrl: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=1200&h=900&fit=crop&q=90", 
        }),
      ],

      康是美: [
        makeStore({
          id: "cosmed-xinyi",
          brand: "康是美",
          name: "康是美 信義門市",
          categoryMain: "美容保養",
          categorySub: "藥妝店",
          rating: "4.5",
          distance: "0.9km",
          coverUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop", 
        }),
        makeStore({
          id: "cosmed-daan",
          brand: "康是美",
          name: "康是美 大安門市",
          categoryMain: "美容保養",
          categorySub: "藥妝店",
          rating: "4.4",
          distance: "1.6km",
          coverUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&h=900&fit=crop&q=90", 
        }),
        makeStore({
          id: "cosmed-banqiao",
          brand: "康是美",
          name: "康是美 板橋門市",
          categoryMain: "美容保養",
          categorySub: "藥妝店",
          rating: "4.3",
          distance: "3.7km",
          coverUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=1200&h=900&fit=crop&q=90", 
        }),
      ],

      屈臣氏: [
        makeStore({
          id: "watsons-xinyi",
          brand: "屈臣氏",
          name: "屈臣氏 信義門市",
          categoryMain: "美容保養",
          categorySub: "藥妝店",
          rating: "4.4",
          distance: "1.0km",
          coverUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=900&fit=crop&q=90", 
        }),
        makeStore({
          id: "watsons-zhongshan",
          brand: "屈臣氏",
          name: "屈臣氏 中山門市",
          categoryMain: "美容保養",
          categorySub: "藥妝店",
          rating: "4.3",
          distance: "1.3km",
          coverUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&h=900&fit=crop&q=90", 
        }),
        makeStore({
          id: "watsons-neihu",
          brand: "屈臣氏",
          name: "屈臣氏 內湖門市",
          categoryMain: "美容保養",
          categorySub: "藥妝店",
          rating: "4.2",
          distance: "3.4km",
          coverUrl: "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=1200&h=900&fit=crop&q=90", 
        }),
      ],

      寶雅: [
        makeStore({
          id: "poya-xinyi",
          brand: "寶雅",
          name: "寶雅 信義店",
          categoryMain: "生活雜貨",
          categorySub: "美妝日用品",
          rating: "4.4",
          distance: "1.1km",
          coverUrl: "https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=300&h=200&fit=crop", 
        }),
        makeStore({
          id: "poya-daan",
          brand: "寶雅",
          name: "寶雅 大安店",
          categoryMain: "生活雜貨",
          categorySub: "美妝日用品",
          rating: "4.3",
          distance: "1.9km",
          coverUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=1200&h=900&fit=crop&q=90", 
        }),
        makeStore({
          id: "poya-banqiao",
          brand: "寶雅",
          name: "寶雅 板橋店",
          categoryMain: "生活雜貨",
          categorySub: "美妝日用品",
          rating: "4.2",
          distance: "3.6km",
          coverUrl: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&h=900&fit=crop&q=90", 
        }),
      ],
    },
  }),

  getters: {
    getHotKeywords(state) {
      return state.hotKeywords;
    },

    getAllStores(state) {
      const all = [];
      Object.keys(state.storesByKeyword || {}).forEach((k) => {
        const arr = state.storesByKeyword[k] || [];
        all.push(...arr);
      });
      return all;
    },
  },

  actions: {
    getStoresByKeyword(keyword) {
      const k = String(keyword || "").trim();
      if (!k) return this.getAllStores;

      if (this.storesByKeyword[k]) {
        return this.storesByKeyword[k] || [];
      }

      const kw = normalizeText(k);
      return this.getAllStores.filter((s) => {
        const hay = normalizeText(`${s.brand} ${s.name} ${s.categoryMain} ${s.categorySub}`);
        return hay.includes(kw);
      });
    },
  },
});
