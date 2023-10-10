<template>
  <v-footer
    absolute
    inset
    app
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-col
        class="text-center"
        cols="12"
      >
        AntLMS &copy; {{ new Date().getFullYear() }}
      </v-col>
    </v-row>
  </v-footer>
</template>

<style>
.v-footer {
  font-size: small;
}
</style>
