<script setup lang="ts">
const route = useRoute()
</script>
<template>
  <v-container
    class="d-flex flex-column fill-height"
    fluid
  >
    <v-container
      class="d-flex justify-around fill-height"
      style="gap: 2em"
      fluid
    >
      <FormCourseEdit />
      <ContentList />
    </v-container>
    <v-container
      class="d-flex align-end"
      fluid
    >
      <v-card class="d-flex justify-end bg-grey-lighten-3 w-100 pa-2">
        <v-btn
          class="text-capitalize"
          variant="text"
          @click="changed = false"
        >
          Cancel
        </v-btn>
        <v-btn class="text-capitalize bg-primary"> Save Changes </v-btn>
      </v-card>
    </v-container>
  </v-container>
</template>
