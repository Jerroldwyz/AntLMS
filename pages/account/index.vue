<!-- Index.vue -->

<template>
  <v-container class="w-75">
    <v-toolbar color="blue">
      <v-toolbar-title>Account Settings</v-toolbar-title>
    </v-toolbar>
    <v-row>
      <v-col cols="3">
        <v-tabs
          v-model="tab"
          direction="vertical"
          color="blue"
        >
          <v-tab value="profile">
            <v-icon start> mdi-account </v-icon>
            Profile
          </v-tab>
          <v-tab value="security">
            <v-icon start> mdi-lock </v-icon>
            Security
          </v-tab>
        </v-tabs>
      </v-col>
      <v-col>
        <v-window v-model="tab">
          <v-window-item value="profile">
            <v-row>
              <v-col cols="7">
                <FormAccountEdit />
              </v-col>
              <v-col cols="3">
                <v-container style="position: relative">
                  <h4>Profile picture</h4>
                  <v-avatar
                    class="outlined"
                    size="250"
                    color="grey-darken-1"
                  >
                    <v-img
                      v-if="user?.thumbnail"
                      :aspect-ratio="1"
                      cover
                      :src="thumbnail"
                    ></v-img>
                    <span
                      v-else
                      class="text-h1"
                      >{{ userStore.initials }}</span
                    >
                  </v-avatar>
                  <EditProfilePictureMenu
                    :thumbnail="thumbnailPath"
                    @thumbnail:upload="updateProfilePicture"
                    @thumbnail:remove="updateProfilePicture"
                  />
                </v-container>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item value="security">
            <AccountSecuritySetting />
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { User } from "~/types"

const userStore = useUserStore()

if (userStore.isAdmin) setPageLayout("admin")
else setPageLayout("default")

definePageMeta({
  middleware: ["user"],
  layout: false,
})

const tab = ref("option-1")

const userData = ref(userStore.user)

const currentUser = userStore.user

const user = computed(() => {
  return userStore.user
})

const fetchedThumbnail = ref<string | undefined>()
const thumbnailPath = ref<string | undefined>()

const thumbnail = computed(() => {
  if (currentUser?.thumbnail) {
    getImage(currentUser?.thumbnail).then((url) => {
      fetchedThumbnail.value = url
    })

    return fetchedThumbnail.value
  }

  if (thumbnailPath.value) {
    getImage(thumbnailPath.value).then((url) => {
      fetchedThumbnail.value = url
    })
  } else {
    fetchedThumbnail.value =
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
  }

  return fetchedThumbnail.value
})

const updateProfilePicture = async (path: string) => {}
</script>

<style scoped>
.v-window-item {
  transition: none;
}
</style>
