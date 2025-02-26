// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@mdi/font/css/materialdesignicons.css";
import api from "./api";
import store from "./store"; // Import the Vuex store

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
  },
});

const app = createApp(App);

app.config.globalProperties.$api = api;
app.use(router);
app.use(vuetify);
app.use(store);
app.mount("#app");
