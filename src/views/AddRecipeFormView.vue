<template>
  <div class="form">
    <router-link :to="'recipes'">
      <v-btn> Back to recipes list </v-btn>
    </router-link>
    <v-form v-model="valid">
      <v-container>
        <v-text-field
          v-model="title"
          :rules="titleRule"
          label="Title"
          required
        />
        <v-textarea
          v-model="description"
          :rules="descriptionRule"
          label="Description"
          required
        />
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
    isLoading: false,
  }),
  methods: {
    createRecipe() {
      this.isLoading = true;
      axios
        .post("http://localhost:3000/recipes", {
          title: this.title,
          description: this.description,
        })
        .then(() => {
          setTimeout(() => {
            this.$router.push("/recipes");
          }, 2000);
        })
        .finally(() => {
          setTimeout(() => {
            this.isLoading = false;
          }, 2000);
        });
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  align-items: center;
  flex-direction: column;
}

button {
  margin-bottom: 20px;
}
</style>
