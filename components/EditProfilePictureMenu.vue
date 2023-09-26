<template>
  <v-hover
    v-slot="{ isHovering }"
    open-delay="200"
  >
    <v-btn
      color="grey"
      class="text-none"
      variant="elevated"
      size="small"
      rounded
      style="position: absolute; bottom: 10%; left: 10%"
    >
      <v-icon icon="mdi-pencil-box-outline"></v-icon>
      <v-expand-x-transition>
        <span
          v-if="isHovering"
          class="ml-2"
          >Edit</span
        >
      </v-expand-x-transition>
      <v-menu
        location="end"
        activator="parent"
        :close-on-content-click="false"
      >
        <v-list>
          <v-list-item
            v-for="(item, index) in menuItems"
            :key="index"
            :value="index"
            @click="menuActionClick(item.action)"
          >
            <div v-if="item.action === MenuAction.Upload">
              <v-file-input
                id="selectedFile"
                v-model="files"
                accept="image/*"
                style="display: none"
                @change="checkFiles"
              ></v-file-input>
            </div>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </v-hover>
</template>

<script setup lang="ts">
const props = defineProps<{
  thumbnail?: string
}>()
const emit = defineEmits(["thumbnail:upload", "thumbnail:remove"])

enum MenuAction {
  Upload,
  Remove,
}

const files = ref<File[]>([])

const menuItems = ref([
  {
    title: "Upload profile picture",
    action: MenuAction.Upload,
  },
  {
    title: "Remove profile picture",
    action: MenuAction.Remove,
  },
])

const menuActionClick = (action: MenuAction) => {
  switch (action) {
    case MenuAction.Upload:
      upload()
      break
    default:
      remove()
      break
  }
}

const checkFiles = async (event: InputEvent) => {
  if (!files) {
    throw new Error("No file uploaded")
  } else {
    if (props.thumbnail) {
      // remove previous thumbnail from s3
      await deleteImage(props.thumbnail)
    }
    // upload new image to bucket
    const file = files.value[0]
    const mimeType = file.type.split("/")[1]
    const path = await uploadImage(files.value[0], "image")
    emit("thumbnail:upload", path)
  }
}

const upload = () => {
  document.getElementById("selectedFile")?.click()
}

const remove = async () => {
  console.log(`Removing thumbnail: ${props.thumbnail}`)
  if (props.thumbnail) await deleteImage(props.thumbnail)
  emit("thumbnail:remove", null)
}
</script>
