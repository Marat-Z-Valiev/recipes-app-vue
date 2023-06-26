<script lang="ts">
export default {
  data() {
    return {
      listOfRecipes: [
        {
          id: 1,
          title: "Cake",
          description: "Make a cake",
          icon: "mdi:mdi-pencil",
        },
        {
          id: 2,
          title: "Pie",
          description: "Make a pie",
          icon: "mdi:md-minus",
        },
      ],
    };
  },
};
</script>

<template>
  <v-app>
    <v-list>
      <router-link :to="'/addRecipe'">
        <v-btn> Add recipe </v-btn>
      </router-link>
      <v-list-subheader>List of recipes</v-list-subheader>
      <v-list-item v-for="recipe in listOfRecipes" :key="recipe.id">
        <v-list-item-title>{{ recipe.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ recipe.description }}</v-list-item-subtitle>
        <router-link :to="'/edit/' + recipe.id">
          <v-icon
            size="large"
            color="green-darken-2"
            :icon="recipe.icon"
          ></v-icon>
        </router-link>
      </v-list-item>
    </v-list>
  </v-app>
</template>
