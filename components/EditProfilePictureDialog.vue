<template>
  <div class="text-center">
    <div
      class="avatar-container"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <v-avatar
        class="editable-avatar"
        :style="{ filter: isHovered ? 'brightness(50%)' : 'brightness(100%)' }"
        size="250"
        @click="dialog = true"
      >
        <v-img
          v-if="userStore.user?.thumbnail"
          :aspect-ratio="1"
          cover
          :src="fetchedThumbnail"
        ></v-img>
        <span
          v-else
          class="text-h1"
          >{{ userStore.initials }}</span
        >
        <h2
          v-if="isHovered"
          class="overlay"
        >
          Edit Avatar
        </h2>
      </v-avatar>
    </div>

    <v-dialog
      v-model="dialog"
      width="auto"
      class="text-center"
    >
      <v-card color="grey-darken-4">
        <v-card-title>Edit profile picture</v-card-title>
        <v-card-item>
          <v-sheet
            color="grey-darken-3"
            class="px-10 py-5"
            rounded="lg"
          >
            <v-avatar
              class="avatar-upload"
              size="250"
              color="blue"
              @click="uploadFile"
              ><v-icon
                icon="mdi-file-upload-outline"
                size="50"
              ></v-icon
            ></v-avatar>
          </v-sheet>
          <v-file-input
            id="selectedFile"
            v-model="files"
            accept="image/*"
            style="display: none"
            @change="onFilesChange"
          ></v-file-input>
        </v-card-item>
        <div class="d-flex flex-row justify-space-around">
          <v-card-actions>
            <v-btn
              class="px-10"
              block
              @click="dialog = false"
              >Cancel</v-btn
            >
          </v-card-actions>
          <v-card-actions>
            <v-btn
              class="px-10"
              variant="tonal"
              color="blue"
              @click="applyChange"
              >Apply</v-btn
            >
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const user = ref(userStore.user)
const dialog = ref(false)
const isHovered = ref(false)
const files = ref<File[]>([])

const fetchedThumbnail = ref(
  "https://media.licdn.com/dms/image/C4D1BAQHBAcyoFKMSbw/company-background_10000/0/1519800508861?e=1696143600&v=beta&t=hByf3zkzZf71sbQ8Nl9J6f5UnfhqI8n0netyB5U7iag",
)

onMounted(() => {
  if (user.value?.thumbnail) {
    getImage(user.value.thumbnail).then((url) => {
      fetchedThumbnail.value = url
    })
  }
})

userStore.$subscribe((mutation, state) => {
  if (state.user?.thumbnail) {
    getImage(state.user.thumbnail).then((url) => {
      fetchedThumbnail.value = url
    })
  }
})

const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
}

const uploadFile = () => {
  document.getElementById("selectedFile")?.click()
}

const onFilesChange = () => {
  console.log(files.value)
}

const applyChange = () => {
  if (!files.value) {
    throw new Error("No files upload")
  } else {
    const currentUserThumbnail = userStore.user?.thumbnail

    uploadImage(files.value[0], "image").then(async (path) => {
      const result = await userStore.updateThumbnail(path)
      if (result.success) {
        dialog.value = false
        if (currentUserThumbnail) {
          await deleteImage(currentUserThumbnail)
        }
        alert("You have successfully updated your profile picture")
      }
    })
  }
}
</script>

<style>
.avatar-container {
  position: relative;
  cursor: pointer;
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(
    0,
    0,
    0,
    0.7
  ); /* Background color for the text overlay */
  color: rgb(255, 255, 255); /* Text color */
  padding: 5px 10px;
  border-radius: 5px;
  display: none;
}

.avatar-container:hover .overlay {
  display: block;
}

.avatar-upload {
  cursor: pointer;
}
</style>
