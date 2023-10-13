<script setup lang="ts">
const props = defineProps<{
  id: number
  title: string
  thumbnail: string | null
}>()

const emit = defineEmits(["delete"])

const thumbnailUrl = ref<string | null>(null)

onMounted(async () => {
  if (props.thumbnail) {
    thumbnailUrl.value = await getImage(props.thumbnail)
  }
})

async function handleDelete() {
  await deleteCourseById(props.id)
  emit("delete")
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
                  <v-list-item>
                    <v-btn @click="handleDelete">Delete</v-btn>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-toolbar>
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
