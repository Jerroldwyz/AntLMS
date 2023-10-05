<template>
  <div class="w-full flex flex-col">
    <CourseSideBar :course="enrollment.course" />
    <slot />
    <v-row v-if="route.params.topic_id">
      <v-btn>Previous</v-btn>
      <v-btn color="primary">Next</v-btn>
    </v-row>
    <v-row v-else>
      <v-btn color="primary"> Start </v-btn>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { course_id, topic_id, content_id } = route.params
const userStore = useUserStore()
const enrollment = await $fetch(
  `/api/users/${userStore.user?.uid}/enrollments/${course_id}`,
  {
    method: "GET",
  },
)
</script>

<style scoped></style>
