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
</script>

<style scoped></style>
