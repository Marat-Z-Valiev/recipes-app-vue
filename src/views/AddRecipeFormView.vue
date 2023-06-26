<template>
  <v-form v-model="valid">
    <v-container>
      <v-text-field v-model="title" :rules="titleRule" label="Title" required />
      <v-textarea
        v-model="description"
        :rules="descriptionRule"
        label="Description"
        required
      />
    </v-container>
    <v-btn> Create recipe </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    title: "",
    titleRule: [
      (value) => {
        if (value) return true;

        return "Title is required.";
      },
    ],
    description: "",
    descriptionRule: [
      (value) => {
        if (value) return true;

        return "Description is required.";
      },
    ],
  }),
};
</script>
