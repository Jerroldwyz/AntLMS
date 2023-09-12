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
            to="/home"
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

        <v-menu
          min-width="200px"
          rounded
        >
          <template v-slot:activator="{ props }">
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
          AntLMS &copy {{ new Date().getFullYear() }}
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
