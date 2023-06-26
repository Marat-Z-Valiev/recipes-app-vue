<script>
export default {
  data() {
    return {
      recipe: null,
    };
  },
  mounted() {
    // Fetch the recipe details using the ID from the route parameter
    const id = this.$route.params.id;
    // Make an API request or use any other method to fetch the recipe details
    // Set the fetched recipe data to the "recipe" data property
    this.recipe = {
      id: id,
      title: "Cake",
      description: "Make a cake",
    };
  },
};
</script>

<template>
  <div>
    <h2 v-if="recipe">Edit Recipe - {{ recipe.id }}</h2>
    <p v-if="recipe">Title: {{ recipe.title }}</p>
    <p v-if="recipe">Description: {{ recipe.description }}</p>
    <router-link :to="'/recipes'">Back to List</router-link>
  </div>
</template>
