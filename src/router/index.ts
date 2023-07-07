import { createRouter, createWebHistory } from "vue-router";
import RecipesListView from "../views/RecipesListView.vue";
import AddRecipeFormView from "../views/AddRecipeFormView.vue";
import EditRecipeView from "../views/EditRecipeView.vue";
import RecipePageView from "../views/RecipePageView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/recipes",
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
    {
      path: "/view/:id",
      name: "view",
      component: RecipePageView,
    },
  ],
});

export default router;
