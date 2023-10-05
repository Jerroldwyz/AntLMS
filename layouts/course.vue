<template>
  <div class="w-full flex flex-col">
    <CourseSideBar :course="enrollment.course" />
    <div class="mx-16">
      <slot />
    </div>
    <div class="ma-10">
      <v-row
        v-if="route.params.topic_id"
        class="d-flex flex-row justify-space-around"
      >
        <v-btn
          color="primary"
          class="text-none"
          variant="outlined"
          size="x-large"
          prepend-icon="mdi-arrow-left"
          >Previous</v-btn
        >
        <v-btn
          class="text-none"
          color="primary"
          size="x-large"
          append-icon="mdi-arrow-right"
          >Next</v-btn
        >
      </v-row>
      <v-row v-else>
        <v-btn color="primary"> Start </v-btn>
      </v-row>
    </div>
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
