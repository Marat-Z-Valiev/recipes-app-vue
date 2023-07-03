<template>
  <div class="recipe-view">
    <v-progress-circular
      v-if="isLoading"
      color="blue-lighten-3"
      indeterminate
    />
    <router-link :to="'/recipes'">
      <v-btn> Back to recipes list </v-btn>
    </router-link>
    <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover />
    <h1>{{ recipe.title }}</h1>
    <p>{{ recipe.description }}</p>
    <h2>Ingredients</h2>
    <div class="ingredients">
      <ul v-for="(ingredient, index) in recipe.ingredients">
        <li :key="recipe.ingredients[index]">{{ ingredient }}</li>
      </ul>
    </div>
    <h2>Instructions</h2>
    <p>{{ recipe.instructions }}</p>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { type Recipe } from "../types";
export default {
  data() {
    return {
      recipe: {} as Recipe,
      id: this.$route.params.id as string,
      title: "",
      description: "",
      isLoading: false,
    };
  },
  created() {
    this.fetchRecipe();
  },
  methods: {
    fetchRecipe() {
      (this.isLoading = true),
        axios
          .get(`http://localhost:3000/recipes/${this.id}`)
          .then(({ data }) => {
            this.recipe = data;
            this.title = this.recipe.title;
            this.description = this.recipe.description;
            this.isLoading = false;
          })
          .catch((error) => {
            console.error("Error fetching recipe:", error);
          });
    },
  },
};
</script>

<style scoped>
.recipe-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .ingredients {
    display: flex;
    flex-direction: column;
  }
}
</style>
