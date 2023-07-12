<template>
  <div class="form">
    <div class="back-to-list-button">
      <router-link :to="'recipes'">
        <v-btn> Back to recipes list </v-btn>
      </router-link>
      <v-btn
        :disabled="title === '' || description === ''"
        @click="createRecipe"
        :loading="isLoading"
      >
        Create recipe
        <template v-slot:loader>
          <v-progress-circular color="blue-lighten-3" indeterminate />
        </template>
      </v-btn>
    </div>
    <v-form v-model="valid">
      <v-container>
        <v-text-field
          id="title-field"
          v-model="title"
          :rules="titleRule"
          label="Recipe Title"
          required
        />
        <v-textarea
          id="description-field"
          v-model="description"
          :rules="descriptionRule"
          label="Description"
          required
        />
        <div v-for="index in ingredientFields" :key="index">
          <v-text-field
            :id="String(index)"
            v-model="ingredients[index - 1]"
            label="Ingredient"
          />
        </div>
        <v-textarea
          id="instructions-field"
          v-model="instructions"
          label="Instructions"
        />
        <div class="button-container">
          <v-btn @click="addIngredientField"> Add ingredient </v-btn>
          <v-btn @click="removeIngredientField"> Remove ingredient </v-btn>
        </div>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
import axios from "axios";
export default {
  data: () => ({
    valid: false,
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
    ingredients: [] as string[],
    ingredient: "",
    ingredientFields: 0,
    instructions: "",
    isLoading: false,
  }),
  methods: {
    createRecipe() {
      this.isLoading = true;
      axios
        .post(
          "https://recipes-vue-app-mv.netlify.app/.netlify/functions/recipes",
          {
            title: this.title,
            description: this.description,
            ingredients: this.ingredients.filter((instruction) => instruction),
            instructions: this.instructions,
          }
        )
        .then(() => {
          setTimeout(() => {
            this.$router.push("/recipes");
          }, 2000);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setTimeout(() => {
            this.isLoading = false;
          }, 2000);
        });
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
  width: 80%;
}

.back-to-list-button {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.button-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
