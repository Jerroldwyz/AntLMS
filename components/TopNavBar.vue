<template>
  <v-app-bar flat>
    <v-container
      class="d-flex align-center justify-space-between"
      fluid
    >
      <v-btn
        prepend-icon="mdi-vuetify"
        variant="text"
        color="black"
        size="large"
      >
        <NuxtLink
          to="/home"
          class="text-button text-decoration-none text-black"
          >AntLMS</NuxtLink
        >
      </v-btn>

      <v-responsive
        max-width="500"
        align-center
        justify-center
      >
        <v-card-text>
          <v-text-field
            v:model="searchQuery"
            :loading="loading"
            density="compact"
            variant="solo"
            label="Search for courses"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            @click:append-inner="performSearch"
            @keyup.enter="performSearch"
          ></v-text-field>
        </v-card-text>
      </v-responsive>
      <UserProfileMenu></UserProfileMenu>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
const loaded = ref(false)
const loading = ref(false)
const searchQuery = ref("")
const router = useRouter()

function performSearch() {
  loading.value = true

  setTimeout(() => {
    loading.value = false
    loaded.value = true

    router.push({ path: "/search", query: { query: searchQuery.value } })
  }, 2000)
}
</script>
