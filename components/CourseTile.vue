<script setup lang="ts">
const data = defineProps<{
  id: number
  title: string
  thumbnail?: string | null
  home: boolean | false
}>()
const emit = defineEmits(["clicked"])

const fetchedThumbnail = ref<string>("")
const courseProgressPercentage = ref(0)
const userIsEnrolled = ref(false)
const dialog = ref(false)

const { $firebaseAuth } = useNuxtApp()
const userUid = $firebaseAuth.currentUser!.uid

onMounted(async () => {
  if (userUid !== undefined && data.home) {
    if (await isEnrolled(userUid, data.id)) {
      userIsEnrolled.value = true
      courseProgressPercentage.value =
        (await getCourseProgress(userUid, data.id)) ?? 0
    }
  }

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
})

const thumbnail = computed(() => {
  if (data.thumbnail) {
    getImage(data.thumbnail).then((url) => (fetchedThumbnail.value = url))
  }
  return fetchedThumbnail.value
})

const unenrollUserNow = async () => {
  if (userUid !== undefined) {
    await unenrollUser(userUid, data.id)
    userIsEnrolled.value = false
  }
}

const enrollUserNow = async () => {
  if (userUid !== undefined) {
    await enrollUser(userUid, data.id)
    userIsEnrolled.value = true
  }
}
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
        v-if="home"
        v-bind="props"
        :elevation="isHovering ? 5 : undefined"
        @click="emit('clicked')"
      >
        <v-img
          cover
          height="170"
          :src="thumbnail"
        >
        </v-img>

        <v-container>
          <v-card-title class="text-h6 text-center font-weight-medium">{{
            data.title
          }}</v-card-title>
          <v-card-text v-if="userIsEnrolled">
            <p>{{ courseProgressPercentage }}%</p>
            <v-progress-linear
              v-model:model-value="courseProgressPercentage"
            ></v-progress-linear>
          </v-card-text>
        </v-container>
      </v-card>
      <v-card
        v-else
        v-bind="props"
        :elevation="isHovering ? 5 : undefined"
        @click="dialog = true"
      >
        <v-img
          cover
          height="170"
          :src="thumbnail"
        >
        </v-img>

        <v-container>
          <v-card-title class="text-h6 text-center font-weight-medium">{{
            data.title
          }}</v-card-title>
        </v-container>
      </v-card>
    </v-hover>
  </v-col>
  <v-dialog
    v-model="dialog"
    persistent
    width="50%"
  >
    <v-card>
      <v-card-title class="text-h5 bg-primary"> Enrollment </v-card-title>
      <v-card-text>
        {{ userIsEnrolled ? "Unenroll" : "Enroll" }} in
        <strong> {{ data.title }}</strong>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green-darken-1"
          variant="text"
          @click="dialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
          v-if="!userIsEnrolled"
          color="primary"
          variant="elevated"
          @click="
            () => {
              enrollUserNow()
              dialog = false
            }
          "
        >
          Enroll
        </v-btn>
        <v-btn
          v-else
          color="red"
          variant="elevated"
          @click="
            () => {
              unenrollUserNow()
              dialog = false
            }
          "
        >
          Unenroll
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
