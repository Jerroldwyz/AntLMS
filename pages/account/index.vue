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
                  <EditProfilePictureDialog />
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
definePageMeta({
  middleware: ["user"],
})

const tab = ref("option-1")
</script>

<style scoped>
.v-window-item {
  transition: none;
}
</style>
