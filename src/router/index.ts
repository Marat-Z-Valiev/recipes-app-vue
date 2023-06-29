import { createRouter, createWebHistory } from "vue-router";
import RecipesListView from "../views/RecipesListView.vue";
import AddRecipeFormView from "../views/AddRecipeFormView.vue";
import EditRecipeView from "../views/EditRecipeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "recipes",
      component: RecipesListView,
    },
    {
      path: "/addRecipe",
      name: "addRecipe",
      component: AddRecipeFormView,
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: EditRecipeView,
    },
  ],
});

export default router;
