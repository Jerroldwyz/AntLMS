<template>
  <v-app id="inspire">
    <TopNavBar></TopNavBar>

    <SideNavDrawer></SideNavDrawer>

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

    <Footer></Footer>
  </v-app>
</template>

<script></script>

<style></style>
