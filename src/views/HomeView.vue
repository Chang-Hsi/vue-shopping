<!-- src/views/HomeBanner.vue -->
<template>
  <div>
    <HomeBanner />
    <HomeBrands />
    <HomeTicket />
    <HomeTheme />
    <HomeStores />
  </div>
</template>

<script setup>
import HomeBanner from "@/components/home/HomeBanner.vue";
import HomeBrands from "@/components/home/HomeBrands.vue";
import HomeStores from "@/components/home/HomeStores.vue";
import HomeTheme from "@/components/home/HomeTheme.vue";
import HomeTicket from "@/components/home/HomeTicket.vue";
</script>
