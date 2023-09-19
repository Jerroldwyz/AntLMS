<script setup lang="ts">
const props = defineProps<{
  id: number
  title: string
  thumbnail: string | null
}>()

const thumbnailUrl = ref<string | null>(null)

onMounted(async () => {
  if (props.thumbnail) {
    thumbnailUrl.value = await getFileUrlFromS3(props.thumbnail)
  }
})
</script>

<template>
  <v-card
    elevation="2"
    rounded="lg"
    width="175"
    height="175"
    @click="navigateTo(`/editcourse/${props.id}`)"
  >
    <v-img
      cover
      height="125"
      :src="
        thumbnailUrl
          ? thumbnailUrl
          : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
      "
    >
    </v-img>

    <v-card-title class="text-center">{{ props.title }}</v-card-title>
  </v-card>
</template>
