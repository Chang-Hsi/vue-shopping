// src/stores/themeStore.js
import { defineStore } from "pinia";

function makeThemeCard({ id, name, category, rating, distance, imageUrl }) {
  return {
    id,
    name,
    category,
    rating,
    distance,
    // ✅ 改成直接指定網址
    image: imageUrl,
  };
}

function makeTheme({ id, title, subtitle, heroImageUrl, cards, stores }) {
  return {
    id: String(id),
    title,
    subtitle,
    // ✅ 改成直接指定網址
    heroImage: heroImageUrl,
    cards,
    stores,
  };
}

function makeStore({
  id,
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
    name,
    categoryMain,
    categorySub,
    rating,
    distance,
    badge,
    // ✅ 改成直接指定網址
    coverUrl,
  };
}

export const useThemeStore = defineStore("themeStore", {
  state: () => {
    const themes = [
      makeTheme({
        id: 1,
        title: "美食饗宴",
        subtitle: "12個店家",
        heroImageUrl:
          "https://i.pinimg.com/1200x/b0/e7/47/b0e747a8e32385349f1e10f0dbfdcabd.jpg",
        cards: [
          makeThemeCard({
            id: "t1-c1",
            name: "築間幸福鍋物",
            category: "美食 ＞ 火鍋",
            rating: "4.5",
            distance: "1.2km",
            imageUrl:
              "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&h=900&fit=crop&q=90",
          }),
          makeThemeCard({
            id: "t1-c2",
            name: "欣葉台菜",
            category: "美食 ＞ 台菜",
            rating: "4.8",
            distance: "2.5km",
            imageUrl:
              "https://images.unsplash.com/photo-1665898362159-616b0ade1044?w=1200&h=900&fit=crop&q=90",
          }),
          makeThemeCard({
            id: "t1-c3",
            name: "饗食天堂",
            category: "美食 ＞ 吃到飽",
            rating: "4.3",
            distance: "3.1km",
            imageUrl:
              "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=900&fit=crop&q=90", 
          }),
        ],
        stores: [
          makeStore({
            id: "t-1-1",
            name: "築間幸福鍋物",
            categoryMain: "美食",
            categorySub: "火鍋",
            rating: "4.5",
            distance: "1.2km",
            badge: "鍋物加料兌換券",
            coverUrl:
              "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=1200&h=900&fit=crop&q=90",
          }),
          makeStore({
            id: "t-1-2",
            name: "欣葉台菜",
            categoryMain: "美食",
            categorySub: "台菜",
            rating: "4.8",
            distance: "2.5km",
            badge: "指定套餐折扣券",
            coverUrl:
              "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&h=900&fit=crop&q=90",
          }),
          makeStore({
            id: "t-1-3",
            name: "饗食天堂",
            categoryMain: "美食",
            categorySub: "吃到飽",
            rating: "4.3",
            distance: "3.1km",
            badge: "週末用餐折扣券",
            coverUrl:
              "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&h=900&fit=crop&q=90", 
          }),
          makeStore({
            id: "t-1-4",
            name: "Subway 南京店",
            categoryMain: "美食",
            categorySub: "速食",
            rating: "4.0",
            distance: "1.1km",
            badge: "指定組合折扣",
            coverUrl:
              "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1200&h=900&fit=crop&q=90", 
          }),
        ],
      }),

      makeTheme({
        id: 5,
        title: "美味甜點",
        subtitle: "16個店家",
        heroImageUrl:
          "https://i.pinimg.com/1200x/f7/e5/49/f7e5496d69939d2993c4e1e1f1967a60.jpg", 
        cards: [
          makeThemeCard({
            id: "t5-c1",
            name: "Lady M",
            category: "甜點 ＞ 蛋糕",
            rating: "4.6",
            distance: "0.8km",
            imageUrl:
              "https://images.unsplash.com/photo-1692448971346-2433e35d50d5?w=1200&h=900&fit=crop&q=90", 
          }),
          makeThemeCard({
            id: "t5-c2",
            name: "Häagen-Dazs",
            category: "甜點 ＞ 冰淇淋",
            rating: "4.5",
            distance: "1.5km",
            imageUrl:
              "https://images.unsplash.com/photo-1673551494246-0ea345ddbf86?w=1200&h=900&fit=crop&q=90", 
          }),
          makeThemeCard({
            id: "t5-c3",
            name: "春水堂",
            category: "甜點 ＞ 珍珠奶茶",
            rating: "4.4",
            distance: "1.1km",
            imageUrl:
              "https://images.unsplash.com/photo-1756969953423-2c199c6dbd79?w=1200&h=900&fit=crop&q=90", 
          }),
        ],
        stores: [
          makeStore({
            id: "t-5-1",
            name: "Lady M",
            categoryMain: "甜點",
            categorySub: "蛋糕",
            rating: "4.6",
            distance: "0.8km",
            badge: "千層蛋糕折扣券",
            coverUrl:
              "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=1200&h=900&fit=crop&q=90", 
          }),
          makeStore({
            id: "t-5-2",
            name: "Häagen-Dazs",
            categoryMain: "甜點",
            categorySub: "冰淇淋",
            rating: "4.5",
            distance: "1.5km",
            badge: "第二杯半價",
            coverUrl:
              "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&h=900&fit=crop&q=90", 
          }),
          makeStore({
            id: "t-5-3",
            name: "春水堂",
            categoryMain: "飲品",
            categorySub: "珍珠奶茶",
            rating: "4.4",
            distance: "1.1km",
            badge: "飲品加料券",
            coverUrl:
              "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1200&h=900&fit=crop&q=90", 
          }),
        ],
      }),

      makeTheme({
        id: 6,
        title: "咖啡時光",
        subtitle: "10個店家",
        heroImageUrl:
          "https://i.pinimg.com/736x/6f/e1/11/6fe111d94ca6ab10e81c9bd96328a82d.jpg", 
        cards: [
          makeThemeCard({
            id: "t6-c1",
            name: "自家烘焙咖啡",
            category: "咖啡 ＞ 手沖",
            rating: "4.7",
            distance: "0.9km",
            imageUrl:
              "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=300&h=200&fit=crop", 
          }),
          makeThemeCard({
            id: "t6-c2",
            name: "巷弄咖啡館",
            category: "咖啡 ＞ 甜點",
            rating: "4.4",
            distance: "1.7km",
            imageUrl:
              "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=300&h=200&fit=crop", 
          }),
          makeThemeCard({
            id: "t6-c3",
            name: "深夜咖啡",
            category: "咖啡 ＞ 夜貓",
            rating: "4.2",
            distance: "2.2km",
            imageUrl:
              "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=200&fit=crop", 
          }),
        ],
        stores: [
          makeStore({
            id: "t-6-1",
            name: "自家烘焙咖啡",
            categoryMain: "咖啡",
            categorySub: "手沖",
            rating: "4.7",
            distance: "0.9km",
            badge: "手沖第二杯折扣",
            coverUrl:
              "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop", 
          }),
          makeStore({
            id: "t-6-2",
            name: "巷弄咖啡館",
            categoryMain: "咖啡",
            categorySub: "甜點",
            rating: "4.4",
            distance: "1.7km",
            badge: "甜點加購折扣",
            coverUrl:
              "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=300&h=200&fit=crop", 
          }),
          makeStore({
            id: "t-6-3",
            name: "深夜咖啡",
            categoryMain: "咖啡",
            categorySub: "夜貓",
            rating: "4.2",
            distance: "2.2km",
            badge: "夜間限定折扣",
            coverUrl:
              "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&h=200&fit=crop", 
          }),
        ],
      }),

      makeTheme({
        id: 7,
        title: "療癒下午茶",
        subtitle: "8個店家",
        heroImageUrl:
          "https://i.pinimg.com/1200x/f9/d5/26/f9d52644eb532b80ccdb00d01cf1e78b.jpg", 
        cards: [
          makeThemeCard({
            id: "t7-c1",
            name: "水果千層",
            category: "下午茶 ＞ 蛋糕",
            rating: "4.6",
            distance: "1.0km",
            imageUrl:
              "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&h=900&fit=crop&q=90", 
          }),
          makeThemeCard({
            id: "t7-c2",
            name: "手作司康",
            category: "下午茶 ＞ 烘焙",
            rating: "4.5",
            distance: "1.9km",
            imageUrl:
              "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&h=900&fit=crop&q=90", 
          }),
          makeThemeCard({
            id: "t7-c3",
            name: "花草茶館",
            category: "下午茶 ＞ 茶飲",
            rating: "4.3",
            distance: "2.8km",
            imageUrl:
              "https://images.unsplash.com/photo-1692448971346-2433e35d50d5?w=1200&h=900&fit=crop&q=90", 
          }),
        ],
        stores: [],
      }),

      makeTheme({
        id: 8,
        title: "人氣小吃",
        subtitle: "14個店家",
        heroImageUrl:
          "https://i.pinimg.com/1200x/3e/66/b2/3e66b212ded14b3e83221d20963000a4.jpg", 
        cards: [
          makeThemeCard({
            id: "t8-c1",
            name: "鹽酥雞",
            category: "小吃 ＞ 炸物",
            rating: "4.5",
            distance: "0.6km",
            imageUrl:
              "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300&h=200&fit=crop", 
          }),
          makeThemeCard({
            id: "t8-c2",
            name: "滷味攤",
            category: "小吃 ＞ 滷味",
            rating: "4.2",
            distance: "1.4km",
            imageUrl:
              "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=300&h=200&fit=crop", 
          }),
          makeThemeCard({
            id: "t8-c3",
            name: "古早味麵線",
            category: "小吃 ＞ 麵線",
            rating: "4.4",
            distance: "2.0km",
            imageUrl:
              "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=200&fit=crop", 
          }),
        ],
        stores: [],
      }),

      makeTheme({
        id: 9,
        title: "餐酒微醺",
        subtitle: "9個店家",
        heroImageUrl:
          "https://i.pinimg.com/1200x/27/4e/92/274e92c65be7513f12ad52e9fdd5be2a.jpg", 
        cards: [
          makeThemeCard({
            id: "t9-c1",
            name: "小酒館",
            category: "餐酒 ＞ 調酒",
            rating: "4.6",
            distance: "1.3km",
            imageUrl:
              "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=200&fit=crop", 
          }),
          makeThemeCard({
            id: "t9-c2",
            name: "精釀啤酒吧",
            category: "餐酒 ＞ 啤酒",
            rating: "4.4",
            distance: "2.1km",
            imageUrl:
              "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=300&h=200&fit=crop", 
          }),
          makeThemeCard({
            id: "t9-c3",
            name: "牛排餐酒",
            category: "餐酒 ＞ 牛排",
            rating: "4.5",
            distance: "3.0km",
            imageUrl:
              "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=900&fit=crop&q=90", 
          }),
        ],
        stores: [],
      }),
    ];

    return { themes };
  },

  getters: {
    getThemes: (state) => state.themes,

    getThemeById: (state) => {
      return (id) => state.themes.find((t) => String(t.id) === String(id)) || null;
    },

    getThemeStoresById: (state) => {
      return (id) => state.themes.find((t) => String(t.id) === String(id))?.stores || [];
    },

    getThemeCardsById: (state) => {
      return (id) => state.themes.find((t) => String(t.id) === String(id))?.cards || [];
    },
  },
});
