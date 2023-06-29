<template>
  <main>
    <v-container v-show="$route.name !== 'addRecipe' && $route.name !== 'edit'">
      <v-app>
        <div class="header">
          <h1>List of recipes</h1>
          <router-link :to="'/addRecipe'">
            <v-btn> Add new recipe </v-btn>
          </router-link>
        </div>
        <v-row>
          <v-col
            v-for="{ _id, title, description } in listOfRecipes"
            cols="12"
            sm="4"
          >
            <v-card class="mx-auto" max-width="400" :key="_id">
              <v-img
                class="align-end text-white"
                height="200"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                cover
              >
                <v-card-title>{{ title }}</v-card-title>
              </v-img>

              <v-card-text>
                <div>{{ description }}</div>
              </v-card-text>

              <v-card-actions>
                <router-link :to="`/edit/${_id}`">
                  <v-btn color="green-darken-2" append-icon="mdi:mdi-pencil">
                    Edit
                  </v-btn>
                </router-link>

                <v-btn
                  color="red"
                  @click="deleteRecipe(_id)"
                  append-icon="mdi:mdi-delete"
                >
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-app>
    </v-container>
  </main>
  <RouterView />
</template>

<script lang="ts">
import axios from "axios";
import { RouterView } from "vue-router";
import { type Recipe } from "@/types";

export default {
  props: {
    initialRecipes: {
      type: Array as () => Recipe[],
      default: () => [],
    },
  },
  data() {
    return {
      listOfRecipes: [] as Recipe[],
    };
  },
  mounted() {
    this.listOfRecipes = [...this.initialRecipes];
    this.fetchRecipes();
  },
  methods: {
    fetchRecipes() {
      axios
        .get("http://localhost:3000/recipes")
        .then(({ data }) => {
          this.listOfRecipes = data;
        })
        .catch((error) => {
          console.error("Error fetching recipes:", error);
        });
    },
    deleteRecipe(id: string) {
      axios
        .delete(`http://localhost:3000/recipes/${id}`)
        .then(() => {
          this.fetchRecipes();
        })
        .catch((error) => {
          console.error("Error deleting recipe:", error);
        });
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
