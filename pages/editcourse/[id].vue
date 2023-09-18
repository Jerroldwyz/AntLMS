<script setup lang="ts">
const route = useRoute()
const course = await fetchUserCourse(route.params.id)
</script>
<template>
  <v-container fluid>
    <v-container
      class="d-flex"
      style="gap: 2em"
      fluid
    >
      <FormCourseEdit :course="course" />
      <ContentList :course="course" />
    </v-container>
    <v-container
      class="d-flex align-end"
      fluid
    >
      <v-card class="d-flex justify-end bg-grey-lighten-3 w-100 pa-2">
        <v-btn
          class="text-capitalize"
          variant="text"
          @click="navigateTo('/mycourses')"
        >
          Cancel
        </v-btn>
        <v-btn class="text-capitalize bg-primary"> Save Changes </v-btn>
      </v-card>
    </v-container>
  </v-container>
</template>
