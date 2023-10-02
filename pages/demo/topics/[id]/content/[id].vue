<template>
  <div>
    <pre>
            {{ data }}
        </pre
    >
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/content/${route.params.id}`, {
  method: "GET",
})
</script>

<style scoped></style>
