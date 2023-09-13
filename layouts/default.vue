<template>
  <v-app>
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

        <v-menu
          min-width="200px"
          rounded
        >
          <template #activator="{ props }">
            <v-btn
              icon
              v-bind="props"
            >
              <v-avatar
                class="ms-4"
                color="grey-darken-1"
                size="large"
              >
                <span class="text-h6">AN</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar color="grey-darken-1">
                  <span class="text-h5">AN</span>
                </v-avatar>
                <h3>ANONYMOUS TODO</h3>
                <p class="text-caption mt-1">ANONYMOUS@TODO.COM</p>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  rounded
                  variant="text"
                >
                  <NuxtLink
                    to="/account"
                    class="text-button text-decoration-none text-black"
                    >Account Settings</NuxtLink
                  >
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  rounded
                  variant="text"
                >
                  <NuxtLink
                    to="/logout"
                    class="text-button text-decoration-none text-black"
                    >Logout</NuxtLink
                  >
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer
      expand-on-hover
      rail
      permanent
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <v-divider></v-divider>

      <v-list
        nav
        rounded
        class="drawer-list"
      >
        <v-list-item
          class="listItemFont"
          prepend-icon="mdi-home"
          title="Home"
          value="home"
          href="/home"
        >
        </v-list-item>

        <v-list-group
          class="listItemFont"
          :value="hovered ? 'Browse' : null"
        >
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-format-list-bulleted"
              title="Browse"
            >
            </v-list-item>
          </template>

          <v-list-item
            v-for="(browseTitle, i) in browse"
            :key="i"
            :title="browseTitle"
            href="?"
          >
          </v-list-item>
        </v-list-group>

        <v-list-group
          class="listItemFont"
          :value="hovered ? 'Courses' : null"
        >
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-view-dashboard"
              title="Courses"
            >
            </v-list-item>
          </template>

          <v-list-item
            v-for="(courseTitle, i) in dashboard"
            :key="i"
            :title="courseTitle"
            href="?"
          >
          </v-list-item>
        </v-list-group>
      </v-list>

      <!-- <v-divider></v-divider> -->

      <v-list-item
        class="listItemFont"
        prepend-icon="mdi-cog"
        title="Settings"
        value="Settings"
        href="?"
      >
      </v-list-item>
    </v-navigation-drawer>

    <v-main class="bg-main">
      <v-container
        class="fill-height"
        fluid
      >
        <v-card
          class="pa-4 w-100 fill-height"
          rounded="lg"
        >
          <slot />
        </v-card>
      </v-container>
    </v-main>

    <v-footer
      app
      height="50"
    >
      <p class="text-center w-100">
        AntLMS &copy; {{ new Date().getFullYear() }}
      </p>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    loaded: false,
    loading: false,
    hovered: false,
    browse: ["Browse all", "Creative", "Technology", "Business"],
    dashboard: ["Dashboard", "Math 101", "Business 101", "Baking 101"],
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

<style>
.v-footer {
  font-size: small;
}

.listItemFont .v-list-item-title {
  font-size: 15px;
}

.drawer-list {
  display: flex;
  flex-direction: column;
  height: 91.75%;
}
</style>
