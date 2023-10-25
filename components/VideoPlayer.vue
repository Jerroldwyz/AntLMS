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
          ref="videoPlayer"
          class="w-100"
          height="480"
          controls
          @timeupdate="(event) => trackVideoProgress(event)"
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
const route = useRoute()

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

// const video = document.getElementById('videoPlayer')
const videoPlayer = ref<any>(null)

const trackVideoProgress = async (event: Event) => {
  const ended = videoPlayer.value.ended
  if (ended) {
    await handleContentDone(
      route.params.content_id as unknown as number,
      route.params.course_id as unknown as number,
    )
  }
}
</script>

<style scoped></style>
