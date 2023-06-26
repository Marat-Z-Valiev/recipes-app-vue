<script setup lang="ts">
import ListOfRecipes from "../components/ListOfRecipes.vue";
</script>

<template>
  <div class="about">
    <ListOfRecipes />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
