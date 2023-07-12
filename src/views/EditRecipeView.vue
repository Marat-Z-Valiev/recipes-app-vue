<template>
  <v-progress-circular v-if="isLoading" color="blue-lighten-3" indeterminate />
  <div class="form" v-if="!isLoading">
    <div class="back-to-list-button">
      <router-link :to="'/recipes'">
        <v-btn> Back to recipes list </v-btn>
      </router-link>
    </div>
    <v-form v-model="valid">
      <v-container>
        <v-text-field
          v-model="title"
          :rules="titleRule"
          label="Title"
          :defaultValue="recipe.title"
          required
        />
        <v-textarea
          v-model="description"
          :rules="descriptionRule"
          label="Description"
          :defaultValue="recipe.description"
          required
        />
        <div v-for="index in ingredientFields" :key="index">
          <v-text-field
            :id="String(index)"
            v-model="recipe.ingredients[index - 1]"
            label="Ingredient"
            :defaultValue="recipe.ingredients[index]"
          />
        </div>
        <v-textarea
          id="instructions-field"
          v-model="recipe.instructions"
          label="Instructions"
        />
        <div class="button-container">
          <v-btn @click="addIngredientField"> Add ingredient </v-btn>
          <v-btn @click="removeIngredientField"> Remove ingredient </v-btn>
          <v-btn @click="updateRecipe" :loading="isLoading">
            Save
            <template v-slot:loader>
              <v-progress-circular color="blue-lighten-3" indeterminate />
            </template>
          </v-btn>
        </div>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { type Recipe } from "../types";
export default {
  data() {
    return {
      valid: false,
      recipe: {} as Recipe,
      ingredient: "",
      ingredientFields: 0,
      ingredients: [] as string[],
      instructions: "",
      id: this.$route.params.id as string,
      title: "",
      titleRule: [
        (value: string) => {
          if (value) return true;
          return "Title is required.";
        },
      ],
      description: "",
      descriptionRule: [
        (value: string) => {
          if (value) return true;
          return "Description is required.";
        },
      ],
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
          .get(
            `https://recipes-vue-app-mv.netlify.app/.netlify/functions/recipes?id=${this.id}`
          )
          .then(({ data }) => {
            this.recipe = data;
            this.title = this.recipe.title;
            this.description = this.recipe.description;
            this.ingredientFields = this.recipe.ingredients.length;
            this.ingredients = this.recipe.ingredients;
            this.instructions = this.recipe.instructions;
            this.isLoading = false;
          })
          .catch((error) => {
            console.error("Error fetching recipe:", error);
          });
    },
    updateRecipe() {
      axios
        .put(
          `https://recipes-vue-app-mv.netlify.app/.netlify/functions/recipes?id=${this.id}`,
          {
            title: this.title,
            description: this.description,
          }
        )
        .then(({ data }) => {
          this.recipe = data;
          setTimeout(() => {
            this.$router.push("/recipes");
          }, 2000);
        })
        .catch((error) => console.error("An error occurred:", error));
    },
    addIngredientField() {
      this.ingredientFields++;
      this.ingredients.push(this.ingredient);
    },
    removeIngredientField() {
      this.ingredientFields--;
      this.ingredients.pop();
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 80%;

  .back-to-list-button {
    display: flex;
    justify-content: center;
  }

  .button-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
}
</style>
