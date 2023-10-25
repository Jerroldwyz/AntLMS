<template>
  <v-app id="inspire">
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
            to="/"
            class="text-button text-decoration-none text-black"
            >AntLMS</NuxtLink
          >
        </v-btn>

        <span class="text-button text-white bg-red px-2 me-1 py-1 rounded-lg"
          >ADMIN</span
        >

        <v-btn variant="text">
          <NuxtLink
            to="/admin/managers"
            class="text-button text-decoration-none text-black"
            >Managers</NuxtLink
          >
        </v-btn>
        <v-btn variant="text">
          <NuxtLink
            to="/admin/roles"
            class="text-button text-decoration-none text-black"
            >Modify Roles</NuxtLink
          >
        </v-btn>
        <v-btn variant="text">
          <NuxtLink
            to="/admin/courses"
            class="text-button text-decoration-none text-black"
            >Courses</NuxtLink
          >
        </v-btn>
        <v-btn variant="text">
          <NuxtLink
            to="/admin/users"
            class="text-button text-decoration-none text-black"
            >Users</NuxtLink
          >
        </v-btn>

        <v-spacer></v-spacer>

        <UserProfileMenu />
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-sheet
        min-height="80vh"
        rounded="lg"
        class="ma-4 pa-4"
      >
        <slot />
      </v-sheet>
    </v-main>

    <v-footer>
      <v-row
        justify="center"
        no-gutters
      >
        <v-col
          class="text-center mt-4"
          cols="12"
        >
          AntLMS &copy; {{ new Date().getFullYear() }}
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts"></script>

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
