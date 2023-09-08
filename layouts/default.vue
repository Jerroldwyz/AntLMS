<template>
  <v-app id="inspire">
    <TopNavBar></TopNavBar>

    <SideNavDrawer></SideNavDrawer>

    <v-main class="bg-grey-lighten-3">
      <v-sheet
        min-height="80vh"
        rounded="lg"
        class="ma-4 pa-4"
      >
        <slot />
      </v-sheet>
    </v-main>

    <Footer></Footer>
  </v-app>
</template>

<script></script>

<style></style>
