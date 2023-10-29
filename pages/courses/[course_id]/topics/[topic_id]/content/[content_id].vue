<template>
  <div>
    <v-progress-linear
      v-if="isLoading"
      color="primary"
      indeterminate
      :height="12"
    ></v-progress-linear>
    <div v-else>
      <div class="text-h2 mb-6">{{ fetchedContent.title }}</div>
      <v-divider
        :thickness="7"
        class="border-opacity-100"
      ></v-divider>
      <div
        v-if="isTextContent(fetchedContent.type)"
        v-html="fetchedContent.content"
      ></div>
      <div v-else>
        <VideoPlayer :path="fetchedContent.content"></VideoPlayer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { handleContentDone } from "~/utils/content-helpers"

const route = useRoute()
const isLoading = ref(true)

const fetchedContent = ref()

const isTextContent = (type: string) => {
  return type === "TEXT"
}

onMounted(async () => {
  isLoading.value = true
  try {
    fetchedContent.value = await $fetch(
      `/api/content/${route.params.content_id}`,
      {
        method: "GET",
      },
    )
  } finally {
    isLoading.value = false
  }

  window.addEventListener("scroll", async (event) => {
    await scrollToBottom(event)
  })
})

const isPageUnscrollable = () => {
  return (
    document.documentElement.clientHeight >=
    document.documentElement.scrollHeight
  )
}

onUnmounted(async () => {
  window.removeEventListener("scroll", scrollToBottom)
  if (isPageUnscrollable() && fetchedContent.value.type === "TEXT") {
    await handleContentDone(
      route.params.content_id as unknown as number,
      route.params.course_id as unknown as number,
    )
  }
})

const scrollToBottom = async (event: Event) => {
  if (fetchedContent.value.type === "TEXT") {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      await handleContentDone(
        route.params.content_id as unknown as number,
        route.params.course_id as unknown as number,
      )
    }
  }
}
</script>

<style scoped></style>
