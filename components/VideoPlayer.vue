<template>
  <v-card
    class="mt-5"
    color="black"
  >
    <v-row
      justify="center"
      align="center"
    >
      <v-progress-circular
        v-if="isLoading"
        color="primary"
        :size="74"
      />
      <div v-else>
        <video
          class="w-100"
          height="480"
          controls
        >
          <source
            :src="videoUrl"
            type="video/mp4"
          />
        </video>
      </div>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { getVideo } from "~/utils/video-helpers"
const props = defineProps(["path"])
const videoUrl = ref()
const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
  try {
    const url = await getVideo(props.path)
    videoUrl.value = url
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped></style>
