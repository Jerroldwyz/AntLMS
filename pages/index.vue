<script setup lang="ts">
const { data } = await useFetch('api/hello')
</script>

<template>
  <h1>Example index page</h1>
  <VuetifyTest />
  <h2>Api test: {{ data.data }}</h2>
</template>

<style>
h1 {
  color: red;
}
</style>
