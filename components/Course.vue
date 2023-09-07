<script setup lang="ts">
const props = defineProps<{
  id: number
  title: string
  thumbnail: string | null
}>()

console.log(props.thumbnail)
</script>

<template>
  <v-card
    @click="navigateTo(`/editcourse/${props.id}`)"
    elevation="2"
    rounded="lg"
  >
    <v-img
      width="200"
      height="150"
      :src="
        props.thumbnail != null && props.thumbnail != ''
          ? props.thumbnail
          : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
      "
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
