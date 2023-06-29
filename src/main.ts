import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import RecipesListViewVue from "./views/RecipesListView.vue";
import router from "./router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(RecipesListViewVue);

app.use(createPinia());

app.use(router);

app.use(vuetify);

app.mount("#app");
