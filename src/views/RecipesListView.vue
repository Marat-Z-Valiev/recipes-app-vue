<template>
  <main>
    <v-container
      v-show="
        $route.name !== 'addRecipe' &&
        $route.name !== 'edit' &&
        $route.name !== 'view'
      "
    >
      <v-app>
        <div v-if="!isLoading" class="header">
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
              <router-link :to="`/view/${_id}`">
                <v-img
                  class="align-end text-white"
                  height="200"
                  :src="
                    imagesUrls[Math.floor(Math.random() * imagesUrls.length)]
                  "
                  cover
                >
                  <v-card-title>{{ title }}</v-card-title>
                </v-img>
              </router-link>

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
      isLoading: false,
      listOfRecipes: [] as Recipe[],
      imagesUrls: [
        "https://i.ibb.co/rbrXPB7/plant-based-recipes.jpg",
        "https://i.ibb.co/R91JKkp/im-121422.jpg",
        "https://i.ibb.co/K51vvzv/jcliv9dg-shahi-paneer-625x300-15-March-22.jpg",
        "https://i.ibb.co/vDJVKpy/vegetarian-recipes-1672e2b4f9104ed3b3867a2a14889ce9.jpg",
      ],
    };
  },

  mounted() {
    this.$watch(
      () => this.$route.params,
      () => {
        if (this.$route.path === "/recipes") {
          this.fetchRecipes();
          this.listOfRecipes = [...this.initialRecipes];
        }
      },
      { immediate: true }
    );
  },
  methods: {
    async fetchRecipes() {
      this.isLoading = true;
      // let results = await axios
      //   .get("../../.netlify/functions/get_recipes")
      //   .then((response) => {
      //     console.log("response ", response);
      //     // this.listOfRecipes = response.json;
      //     this.isLoading = false;
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching recipes:", error);
      //   });

      let results = await fetch(
        "https://recipes-vue-app-mv.netlify.app/.netlify/functions/get_recipes"
      ).then((response) => response.json());
      this.listOfRecipes = results;
      console.log("results ", results);
    },
    deleteRecipe(id: string) {
      axios
        .delete(`/recipes/${id}`)
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
