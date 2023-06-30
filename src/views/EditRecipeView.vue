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
        <div class="button-container">
          <v-btn
            :disabled="title === '' || description === ''"
            @click="updateRecipe"
            :loading="isLoading"
          >
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
    updateRecipe() {
      axios
        .put(`http://localhost:3000/recipes/${this.id}`, {
          title: this.title,
          description: this.description,
        })
        .then(({ data }) => {
          this.recipe = data;
          setTimeout(() => {
            this.$router.push("/recipes");
          }, 2000);
        })
        .catch((error) => console.error("An error occurred:", error));
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
}
.button-container {
  display: flex;
  justify-content: center;
}
</style>
