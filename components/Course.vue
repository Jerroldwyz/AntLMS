<script setup lang="ts">
const props = defineProps(["id", "title", "img"])
</script>

<template>
  <v-card
    class="fill-height"
    @click="navigateTo(`/editcourse/${props.id}`)"
    elevation="2"
    rounded="lg"
  >
    <v-img
      class="h-75"
      :src="props.img"
      cover
    ></v-img>

    <v-card-item>
      <v-card-title class="text-center">
        {{ props.title }}
      </v-card-title>
    </v-card-item>
  </v-card>
</template>
