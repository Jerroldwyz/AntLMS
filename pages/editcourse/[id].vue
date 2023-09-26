<script setup lang="ts">
definePageMeta({
  middleware: ["user"],
})
const route = useRoute()
const course = await fetchUserCourse(route.params.id)
const file = ref<File[]>([])
watchEffect(() => console.log(file.value))
</script>
<template>
  <v-container fluid>
    <v-container
      class="d-flex"
      style="gap: 2em"
      fluid
    >
      <FormCourseEdit
        v-model:course="course"
        v-model:file="file"
      />
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
