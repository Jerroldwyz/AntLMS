<template>
  <div>
    <v-progress-linear
      v-if="isLoading"
      color="primary"
      indeterminate
      :height="12"
    ></v-progress-linear>
    <div v-else>
      <div class="text-h2 mb-6">{{ fetchedContent.value?.title }}</div>
      <v-divider
        :thickness="7"
        class="border-opacity-100"
      ></v-divider>
      <div v-html="fetchedContent.value?.content"></div>
      <v-btn
        color="secondary"
        @click="handleContentDone"
        >Mark as done</v-btn
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const isLoading = ref(true)
const fetchData = async () => {
  const { data } = await useFetch(`/api/content/${route.params.content_id}`, {
    method: "GET",
  })

  return data
}

const fetchedContent = ref()

onMounted(async () => {
  isLoading.value = true
  try {
    fetchedContent.value = await fetchData()
  } finally {
    isLoading.value = false
  }
})

const handleContentDone = async () => {
  const userStore = useUserStore()
  const courseProgressStore = useCourseProgressStore()
  try {
    const result = await $fetch(`/api/users/${userStore.user?.uid}/progress`, {
      method: "POST",
      body: {
        enrollmentId: courseProgressStore.enrollmentId,
        contentId: route.params.content_id,
        userId: userStore.user?.uid,
      },
    })

    if (result) {
      courseProgressStore.updateContentProgress(route.params.course_id)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
