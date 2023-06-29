<script lang="ts">
import axios from "axios";
import { type Recipe } from "../types";
export default {
  data() {
    return {
      recipe: {} as Recipe,
    };
  },
  mounted() {
    // Fetch the recipe details using the ID from the route parameter
    const id = this.$route.params.id as string;
    // Make an API request or use any other method to fetch the recipe details
    // Set the fetched recipe data to the "recipe" data property
    this.fetchRecipe(id);
  },
  methods: {
    fetchRecipe(id: string) {
      axios
        .get(`http://localhost:3000/recipes/${id}`)
        .then(({ data }) => {
          this.recipe = data;
        })
        .catch((error) => {
          console.error("Error fetching recipe:", error);
        });
    },
  },
};
</script>

<template>
  <div>
    <p v-if="recipe">Title: {{ recipe.title }}</p>
    <p v-if="recipe">Description: {{ recipe.description }}</p>
    <router-link :to="'/recipes'">Back to List</router-link>
  </div>
</template>
