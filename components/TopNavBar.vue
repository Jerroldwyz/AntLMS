<template>
  <v-app-bar flat>
    <v-container
      class="d-flex align-center justify-space-between"
      fluid="true"
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
            :loading="loading"
            density="compact"
            variant="solo"
            label="Search for courses"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            @click:append-inner="onClick"
          ></v-text-field>
        </v-card-text>
      </v-responsive>

      <UserProfileMenu></UserProfileMenu>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    loaded: false,
    loading: false,
  }),

  methods: {
    onClick() {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    },
  },
}
</script>
