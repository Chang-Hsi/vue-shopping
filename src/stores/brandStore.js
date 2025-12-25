// src/stores/brandStore.js
import { defineStore } from "pinia";

function makeBrandStore({
  id,
  name,
  brandMain,
  brandSub,
  rating,
  distance,
  badge,
  coverUrl,
}) {
  return {
    id,
    name,
    brandMain,
    brandSub,
    rating,
    distance,
    badge,
    coverUrl: coverUrl || "",
  };
}

export const useBrandStore = defineStore("brandStore", {
  state: () => {
    const brands = [
      {
        id: "kfc",
        name: "肯德基",
        logoUrl:
          "https://images.unsplash.com/photo-1696522618649-403387cb93bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLRkMlMjBsb2dvfGVufDF8fHx8MTc2NTI1ODYwOXww&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        id: "starbucks",
        name: "星巴克",
        logoUrl:
          "https://images.unsplash.com/photo-1545231027-637d2f6210f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTdGFyYnVja3MlMjBsb2dvfGVufDF8fHx8MTc2NTI1MzU3OHww&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        id: "tkk",
        name: "真珠台灣家味",
        logoUrl: "https://i.pinimg.com/736x/ce/7d/a4/ce7da4eb27d85e6dba3d0ab5691f12ca.jpg",
      },
      {
        id: "gogocafe",
        name: "旬日咖啡",
        logoUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=800&fit=crop&q=90",
      },
      {
        id: "bbq",
        name: "開飯川食堂",
        logoUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=800&fit=crop&q=90",
      },
      {
        id: "paradise",
        name: "饗食天堂",
        logoUrl: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&h=800&fit=crop&q=90",
      },
      {
        id: "taco",
        name: "Taco Bell",
        logoUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=800&fit=crop&q=90",
      },
      {
        id: "dq",
        name: "DQ",
        logoUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=800&fit=crop&q=90",
      },
      {
        id: "subway",
        name: "Subway",
        logoUrl:
          "https://images.unsplash.com/photo-1764344815160-0e2afc6939a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTdWJ3YXklMjByZXN0YXVyYW50JTIwbG9nb3xlbnwxfHx8fDE3NjUyNTg2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        id: "burgerking",
        name: "漢堡王",
        logoUrl:
          "https://images.unsplash.com/photo-1654573821777-e00c3a414335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdXJnZXIlMjBLaW5nJTIwbG9nb3xlbnwxfHx8fDE3NjUyNTg2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        id: "mcd",
        name: "麥當勞",
        logoUrl:
          "https://images.unsplash.com/photo-1699727277806-fc241c142c04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNY0RvbmFsZCUyN3MlMjBsb2dvfGVufDF8fHx8MTc2NTI1ODYxMHww&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        id: "pizza",
        name: "必勝客",
        logoUrl:
          "https://images.unsplash.com/photo-1620174645265-05820da4ff20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQaXp6YSUyMEh1dCUyMGxvZ298ZW58MXx8fHwxNzY1MjUzNTc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        id: "mos",
        name: "溫蒂漢堡",
        logoUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=800&fit=crop&q=90",
      },
      {
        id: "pollo",
        name: "波登萊炸",
        logoUrl: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&h=800&fit=crop&q=90",
      },
      {
        id: "ikea",
        name: "IKEA",
        logoUrl: "https://images.unsplash.com/photo-1679050367261-d7a4a7747ef4?w=800&h=800&fit=crop&q=90",
      },
      {
        id: "pxmart",
        name: "全聯",
        logoUrl: "https://images.unsplash.com/photo-1671427478482-2968e71a6311?w=800&h=800&fit=crop&q=90",
      },
      {
        id: "carrefour",
        name: "家樂福",
        logoUrl: "https://images.unsplash.com/photo-1757940059931-6e3c6572d989?w=800&h=800&fit=crop&q=90",
      },
      {
        id: "eslite",
        name: "誠品書店",
        logoUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=800&fit=crop&q=90",
      },
      {
        id: "cosmed",
        name: "康是美",
        logoUrl: "https://images.unsplash.com/photo-1761036602705-48c4b69232c8?w=800&h=800&fit=crop&q=90",
      },
      {
        id: "watsons",
        name: "屈臣氏",
        logoUrl: "https://images.unsplash.com/photo-1713937187927-4e80f5a54efa?w=800&h=800&fit=crop&q=90",
      },
      {
        id: "poya",
        name: "寶雅",
        logoUrl: "https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=800&h=800&fit=crop&q=90",
      },
      {
        id: "net",
        name: "NET",
        logoUrl: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=800&fit=crop&q=90",
      },
      {
        id: "uniqlo",
        name: "UNIQLO",
        logoUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=800&fit=crop&q=90",
      },
      {
        id: "muji",
        name: "MUJI無印良品",
        logoUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=800&fit=crop&q=90",
      },
    ];

    const featuredBrandIds = [
      "starbucks",
      "ikea",
      "pxmart",
      "carrefour",
      "eslite",
      "cosmed",
      "watsons",
      "poya",
      "net",
      "uniqlo",
    ];

    const categories = [
      { id: "food", label: "美味餐廳" },
      { id: "daily", label: "生活雜貨" },
      { id: "hotel", label: "飯店旅館" },
      { id: "sport", label: "運動健身" },
      { id: "beauty", label: "美容保養" },
      { id: "coffee", label: "咖啡飲品" },
      { id: "appliance", label: "家電" },
      { id: "health", label: "保健醫療" },
      { id: "storage", label: "傢俱收納" },
      { id: "mobile", label: "手機相機" },
      { id: "paper", label: "日用紙品" },
      { id: "3c", label: "3C周邊" },
      { id: "pet", label: "寵物用品" },
      { id: "art", label: "圖藝" },
    ];

    const storesByBrandId = {
      kfc: [
        makeBrandStore({
          id: "kfc-1",
          name: "肯德基 台北信義店",
          brandMain: "美食",
          brandSub: "速食",
          rating: "4.2",
          distance: "1.1km",
          badge: "多人餐折扣券",
          coverUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&h=900&fit=crop&q=90",
        }),
        makeBrandStore({
          id: "kfc-2",
          name: "肯德基 中壢中山店",
          brandMain: "美食",
          brandSub: "速食",
          rating: "4.1",
          distance: "0.9km",
          badge: "蛋撻買一送一",
          coverUrl: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&h=900&fit=crop&q=90",
        }),
        makeBrandStore({
          id: "kfc-3",
          name: "肯德基 板橋車站店",
          brandMain: "美食",
          brandSub: "速食",
          rating: "4.0",
          distance: "2.6km",
          badge: "外帶折扣券",
          coverUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&h=900&fit=crop&q=90",
        }),
        makeBrandStore({
          id: "kfc-4",
          name: "肯德基 桃園藝文店",
          brandMain: "美食",
          brandSub: "速食",
          rating: "4.3",
          distance: "3.1km",
          badge: "限定套餐加購優惠",
          coverUrl: "https://images.unsplash.com/photo-1561758033-7e924f619b47?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      starbucks: [
        makeBrandStore({
          id: "sb-1",
          name: "星巴克 南京東路店",
          brandMain: "咖啡飲品",
          brandSub: "連鎖咖啡",
          rating: "4.5",
          distance: "0.6km",
          badge: "中杯飲品兌換券",
          coverUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=900&fit=crop&q=90",
        }),
        makeBrandStore({
          id: "sb-2",
          name: "星巴克 台北101店",
          brandMain: "咖啡飲品",
          brandSub: "門市限定",
          rating: "4.6",
          distance: "1.8km",
          badge: "限定周邊折扣",
          coverUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&h=900&fit=crop&q=90",
        }),
        makeBrandStore({
          id: "sb-3",
          name: "星巴克 中壢SOGO店",
          brandMain: "咖啡飲品",
          brandSub: "連鎖咖啡",
          rating: "4.4",
          distance: "1.2km",
          badge: "甜點加購優惠",
          coverUrl: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      subway: [
        makeBrandStore({
          id: "sub-1",
          name: "Subway 南京店",
          brandMain: "美食",
          brandSub: "速食",
          rating: "4.0",
          distance: "1.1km",
          badge: "指定組合折扣",
          coverUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1200&h=900&fit=crop&q=90",
        }),
        makeBrandStore({
          id: "sub-2",
          name: "Subway 西門店",
          brandMain: "美食",
          brandSub: "速食",
          rating: "4.2",
          distance: "2.4km",
          badge: "飲料加購優惠",
          coverUrl: "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      mcd: [
        makeBrandStore({
          id: "mcd-1",
          name: "麥當勞 西門町店",
          brandMain: "美食",
          brandSub: "速食",
          rating: "4.1",
          distance: "1.6km",
          badge: "點心買一送一",
          coverUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&h=900&fit=crop&q=90",
        }),
        makeBrandStore({
          id: "mcd-2",
          name: "麥當勞 中壢車站店",
          brandMain: "美食",
          brandSub: "速食",
          rating: "4.0",
          distance: "0.7km",
          badge: "早餐優惠券",
          coverUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      ikea: [
        makeBrandStore({
          id: "ikea-1",
          name: "IKEA 新莊店",
          brandMain: "生活百貨",
          brandSub: "傢俱家飾",
          rating: "4.3",
          distance: "3.6km",
          badge: "指定商品折扣",
          coverUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&h=900&fit=crop&q=90",
        }),
        makeBrandStore({
          id: "ikea-2",
          name: "IKEA 台中店",
          brandMain: "生活百貨",
          brandSub: "傢俱家飾",
          rating: "4.4",
          distance: "8.8km",
          badge: "會員點數加碼",
          coverUrl: "https://i.pinimg.com/1200x/37/b4/83/37b483080227811cc909e082fb830935.jpg",
        }),
      ],

      pxmart: [
        makeBrandStore({
          id: "px-1",
          name: "全聯 中壢中山店",
          brandMain: "量販超市",
          brandSub: "連鎖超市",
          rating: "4.2",
          distance: "0.7km",
          badge: "生鮮折扣券",
          coverUrl: "https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=1200&h=900&fit=crop&q=90",
        }),
        makeBrandStore({
          id: "px-2",
          name: "全聯 桃園藝文店",
          brandMain: "量販超市",
          brandSub: "連鎖超市",
          rating: "4.1",
          distance: "3.4km",
          badge: "週末加碼優惠",
          coverUrl: "https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      carrefour: [
        makeBrandStore({
          id: "cf-1",
          name: "家樂福 桂林店",
          brandMain: "量販超市",
          brandSub: "量販店",
          rating: "4.0",
          distance: "2.7km",
          badge: "生鮮商品折扣券",
          coverUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=900&fit=crop&q=90",
        }),
        makeBrandStore({
          id: "cf-2",
          name: "家樂福 內湖店",
          brandMain: "量販超市",
          brandSub: "量販店",
          rating: "4.2",
          distance: "3.9km",
          badge: "滿額折扣券",
          coverUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      eslite: [
        makeBrandStore({
          id: "es-1",
          name: "誠品書店 信義店",
          brandMain: "生活文化",
          brandSub: "書店",
          rating: "4.6",
          distance: "1.3km",
          badge: "會員滿額禮",
          coverUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=900&fit=crop&q=90",
        }),
        makeBrandStore({
          id: "es-2",
          name: "誠品書店 松菸店",
          brandMain: "生活文化",
          brandSub: "書店",
          rating: "4.5",
          distance: "2.0km",
          badge: "選書折扣券",
          coverUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      cosmed: [
        makeBrandStore({
          id: "cm-1",
          name: "康是美 南京店",
          brandMain: "藥妝保健",
          brandSub: "連鎖藥妝",
          rating: "4.3",
          distance: "0.9km",
          badge: "會員獨享折扣券",
          coverUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=900&fit=crop&q=90",
        }),
        makeBrandStore({
          id: "cm-2",
          name: "康是美 中壢店",
          brandMain: "藥妝保健",
          brandSub: "連鎖藥妝",
          rating: "4.2",
          distance: "1.1km",
          badge: "滿千送百購物金",
          coverUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      watsons: [
        makeBrandStore({
          id: "wt-1",
          name: "屈臣氏 忠孝復興門市",
          brandMain: "美妝保養",
          brandSub: "連鎖藥妝",
          rating: "4.3",
          distance: "0.8km",
          badge: "滿額贈品兌換券",
          coverUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=900&fit=crop&q=90",
        }),
        makeBrandStore({
          id: "wt-2",
          name: "屈臣氏 中壢門市",
          brandMain: "美妝保養",
          brandSub: "連鎖藥妝",
          rating: "4.1",
          distance: "1.4km",
          badge: "會員點數加碼",
          coverUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      poya: [
        makeBrandStore({
          id: "po-1",
          name: "寶雅 中山店",
          brandMain: "生活百貨",
          brandSub: "連鎖商店",
          rating: "4.1",
          distance: "1.8km",
          badge: "滿額贈品兌換券",
          coverUrl: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      net: [
        makeBrandStore({
          id: "net-1",
          name: "NET 西門門市",
          brandMain: "服飾配件",
          brandSub: "服飾店",
          rating: "4.2",
          distance: "2.3km",
          badge: "新品上市優惠券",
          coverUrl: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      uniqlo: [
        makeBrandStore({
          id: "uq-1",
          name: "UNIQLO 信義旗艦店",
          brandMain: "服飾配件",
          brandSub: "服飾店",
          rating: "4.5",
          distance: "1.6km",
          badge: "限時特價優惠券",
          coverUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      muji: [
        makeBrandStore({
          id: "mj-1",
          name: "MUJI 無印良品 信義店",
          brandMain: "生活百貨",
          brandSub: "居家生活",
          rating: "4.4",
          distance: "1.9km",
          badge: "會員限定折扣",
          coverUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      tkk: [
        makeBrandStore({
          id: "tkk-1",
          name: "真珠台灣家味 台北忠孝店",
          brandMain: "美食",
          brandSub: "台菜",
          rating: "4.3",
          distance: "2.1km",
          badge: "指定套餐折扣券",
          coverUrl: "https://images.unsplash.com/photo-1665898362159-616b0ade1044?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      gogocafe: [
        makeBrandStore({
          id: "gogo-1",
          name: "旬日咖啡 中壢店",
          brandMain: "咖啡飲品",
          brandSub: "咖啡廳",
          rating: "4.5",
          distance: "1.0km",
          badge: "甜點加購折扣",
          coverUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      bbq: [
        makeBrandStore({
          id: "bbq-1",
          name: "開飯川食堂 板橋店",
          brandMain: "美食",
          brandSub: "川菜",
          rating: "4.3",
          distance: "3.0km",
          badge: "平日加菜券",
          coverUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      paradise: [
        makeBrandStore({
          id: "pd-1",
          name: "饗食天堂 京站店",
          brandMain: "美食",
          brandSub: "吃到飽",
          rating: "4.2",
          distance: "2.8km",
          badge: "週末用餐折扣券",
          coverUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      taco: [
        makeBrandStore({
          id: "taco-1",
          name: "Taco Bell 台北店",
          brandMain: "美食",
          brandSub: "速食",
          rating: "4.1",
          distance: "2.5km",
          badge: "新品嚐鮮折扣",
          coverUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      dq: [
        makeBrandStore({
          id: "dq-1",
          name: "DQ 西門店",
          brandMain: "甜點",
          brandSub: "冰淇淋",
          rating: "4.3",
          distance: "2.2km",
          badge: "霜淇淋第二件半價",
          coverUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      burgerking: [
        makeBrandStore({
          id: "bk-1",
          name: "漢堡王 台北車站店",
          brandMain: "美食",
          brandSub: "速食",
          rating: "4.0",
          distance: "1.9km",
          badge: "雙人餐折扣",
          coverUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      pizza: [
        makeBrandStore({
          id: "pz-1",
          name: "必勝客 中山店",
          brandMain: "美食",
          brandSub: "披薩",
          rating: "4.2",
          distance: "2.4km",
          badge: "外帶折扣券",
          coverUrl: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      mos: [
        makeBrandStore({
          id: "mos-1",
          name: "溫蒂漢堡 台北店",
          brandMain: "美食",
          brandSub: "速食",
          rating: "4.1",
          distance: "2.6km",
          badge: "指定套餐折扣",
          coverUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&h=900&fit=crop&q=90",
        }),
      ],

      pollo: [
        makeBrandStore({
          id: "pl-1",
          name: "波登萊炸 中壢店",
          brandMain: "美食",
          brandSub: "炸物",
          rating: "4.2",
          distance: "1.7km",
          badge: "加點折扣券",
          coverUrl: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=1200&h=900&fit=crop&q=90",
        }),
      ],
    };

    const storesByCategoryId = {
      food: [
        makeBrandStore({
          id: "food-1",
          name: "王品牛排 台北信義店",
          brandMain: "美食",
          brandSub: "連鎖餐廳",
          rating: "4.5",
          distance: "1.2km",
          badge: "平日午餐9折優惠券",
          coverUrl: "https://images.unsplash.com/photo-1558030006-450675393462?w=1200&h=900&fit=crop&q=90",
        }),
      ],
      daily: [],
      hotel: [],
      sport: [],
      beauty: [],
      coffee: [],
      appliance: [],
      health: [],
      storage: [],
      mobile: [],
      paper: [],
      "3c": [],
      pet: [],
      art: [],
    };

    return {
      brands,
      featuredBrandIds,
      categories,
      storesByBrandId,
      storesByCategoryId,
    };
  },

  getters: {
    getBrands: (state) => state.brands,

    getFeaturedBrands: (state) => {
      return (limit = 10) => {
        const ids = state.featuredBrandIds || [];
        const picked = ids
          .map((id) => state.brands.find((b) => b.id === id))
          .filter(Boolean);
        return picked.slice(0, Math.max(0, Number(limit) || 0));
      };
    },

    getBrandById: (state) => {
      return (id) => state.brands.find((b) => b.id === id) || null;
    },

    getStoresByBrandId: (state) => {
      return (brandId) => state.storesByBrandId?.[brandId] || [];
    },

    getCategoryById: (state) => {
      return (id) => state.categories.find((c) => c.id === id) || null;
    },

    getStoresByCategoryId: (state) => {
      return (id) => state.storesByCategoryId?.[id] || [];
    },
  },
});
