<script setup lang="ts">
const props = defineProps<{
  id: number
  title: string
  thumbnail: string | null
}>()
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
      src="https://images.pexels.com/photos/9095/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      cover
    >
    </v-img>

    <v-card-item>
      <v-card-title class="text-center">
        {{ props.title }}
      </v-card-title>
    </v-card-item>
  </v-card>
</template>
