<template>
  <v-app id="inspire">
    <TopNavBar></TopNavBar>

    <SideNavDrawer></SideNavDrawer>

    <v-main class="d-flex align-center justify-center bg-main">
      <v-container
        class="fill-height"
        fluid
      >
        <v-card
          class="pa-7 m-10 w-100 h-100"
          rounded="lg"
        >
          <slot />
        </v-card>
      </v-container>
    </v-main>

    <Footer></Footer>
  </v-app>
</template>
