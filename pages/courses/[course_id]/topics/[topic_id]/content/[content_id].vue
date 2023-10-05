<template>
  <div>
    <div class="text-h2 mb-6">{{ data?.title }}</div>
    <v-divider
      :thickness="7"
      class="border-opacity-100"
    ></v-divider>
    <div v-html="data?.content"></div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/content/${route.params.content_id}`, {
  method: "GET",
})
</script>

<style scoped></style>
