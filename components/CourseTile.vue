<script setup lang="ts">
const data = defineProps<{
  id: number
  title: string
  thumbnail: string | null
}>()

const fetchedThumbnail = ref<string>("")

const courseProgressPercentage = ref(0)
const userIsEnrolled = ref(false)

const userStore = useUserStore()
const userUid = userStore.user?.uid

const thumbnail = computed(() => {
  if (data.thumbnail) {
    getImage(data.thumbnail).then((url) => (fetchedThumbnail.value = url))
  }
  return fetchedThumbnail.value
})

onMounted(async () => {
  if (data.thumbnail) {
    try {
      const url = await getImage(data.thumbnail)
      fetchedThumbnail.value = url
    } catch (error) {
      console.error("Error fetching thumbnail:", error)
      fetchedThumbnail.value =
        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
    }
  }
  if (userUid !== undefined) {
    if (await isEnrolled(userUid, data.id)) {
      userIsEnrolled.value = true
      courseProgressPercentage.value =
        (await getCourseProgress(userUid, data.id)) ?? 0
    }
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
    <v-hover>
      <template #default="{ isHovering, props }">
        <v-card
          v-bind="props"
          :elevation="isHovering ? 5 : undefined"
        >
          <v-img
            cover
            height="170"
            :src="thumbnail"
          >
            <v-toolbar color="rgba(0,0,0,0)">
              <template #append>
                <v-menu offset="0, 100">
                  <template #activator="{ props }">
                    <v-btn
                      icon="mdi-dots-vertical"
                      v-bind="props"
                    ></v-btn>
                  </template>

                  <v-list>
                    <v-list-item>Remove course</v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-toolbar>
          </v-img>

          <v-container>
            <v-card-title class="text-h6 text-left font-weight-medium">{{
              data.title
            }}</v-card-title>
            <div v-if="userIsEnrolled">
              <p>{{ courseProgressPercentage }}%</p>
              <v-progress-linear
                v-model:model-value="courseProgressPercentage"
              ></v-progress-linear>
            </div>
          </v-container>
        </v-card>
      </template>
    </v-hover>
  </v-col>
</template>
