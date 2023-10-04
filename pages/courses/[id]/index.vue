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
console.log(route.params)
const { data } = await useFetch(`/api/courses/${route.params.id}`, {
  method: "GET",
})
</script>

<style scoped></style>
