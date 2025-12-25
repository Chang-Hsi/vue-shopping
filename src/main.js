// main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import { definePreset } from "@primeuix/themes";

import App from "./App.vue";
import router from "./router";
import Tooltip from "primevue/tooltip";
import "./assets/style.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

const AuraOrange = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{orange.50}",
      100: "{orange.100}",
      200: "{orange.200}",
      300: "{orange.300}",
      400: "{orange.400}",
      500: "{orange.500}",
      600: "{orange.600}",
      700: "{orange.700}",
      800: "{orange.800}",
      900: "{orange.900}",
      950: "{orange.950}",
    },
  },
});

app.use(PrimeVue, {
  theme: {
    preset: AuraOrange,
    options: {
      darkModeSelector: "system",
      cssLayer: false,
    },
  },
});

app.directive("tooltip", Tooltip);

app.mount("#app");
