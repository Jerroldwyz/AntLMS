<script setup lang="ts">
const route = useRoute()
</script>
<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <FormCourseEdit />
      </v-col>

      <v-col>
        <ContentList />
      </v-col>
    </v-row>
  </v-container>
</template>
