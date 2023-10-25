<template>
  <v-avatar :size="props.size">
    <v-img
      v-if="userStore.user?.thumbnail"
      :aspect-ratio="1"
      cover
      :src="fetchedThumbnail"
    ></v-img>
    <span
      v-else
      class="text-h4"
      >{{ userStore.initials }}</span
    >
  </v-avatar>
</template>

<script setup lang="ts">
const props = defineProps<{
  size: string | number
}>()
const userStore = useUserStore()
const fetchedThumbnail = ref(
  "https://media.licdn.com/dms/image/C4D1BAQHBAcyoFKMSbw/company-background_10000/0/1519800508861?e=1696143600&v=beta&t=hByf3zkzZf71sbQ8Nl9J6f5UnfhqI8n0netyB5U7iag",
)
onMounted(() => {
  if (userStore.user?.thumbnail) {
    getImage(userStore.user.thumbnail).then((url) => {
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
</script>

<style>
.v-avatar {
  border: 1px solid #555;
}
</style>
