<script setup lang="ts">
const props = defineProps<{
  id: number
  title: string
  thumbnail: string | null
}>()

const thumbnailUrl = ref<string | null>(null)

onMounted(async () => {
  if (props.thumbnail) {
    thumbnailUrl.value = await getImage(props.thumbnail)
  }
})
</script>

<template>
  <v-col
    cols="3"
    sm="6"
    md="4"
    lg="3"
  >
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        v-bind="props"
        :elevation="isHovering ? 5 : undefined"
        @click="navigateTo(`/editcourse/${id}`)"
      >
        <v-img
          cover
          height="170"
          :src="
            thumbnailUrl
              ? thumbnailUrl
              : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
          "
        >
        </v-img>
        <v-container>
          <v-card-title class="text-h6 text-left font-weight-medium">
            {{ title }}
          </v-card-title>
        </v-container>
      </v-card>
    </v-hover>
  </v-col>
</template>
