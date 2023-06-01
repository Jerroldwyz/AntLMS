<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
const props = defineProps({
  title: String,
  subtitle: String,
})
</script>

<template>
  <v-card>
    <v-card-text class="pa-7 pt-5">
      <div class="d-sm-flex align-center">
        <div>
          <h3 class="text-h6 title font-weight-medium">
            <span class="lstick d-inline-block align-middle"></span>
            {{ title }}
          </h3>
          <h5>{{ subtitle }}</h5>
        </div>
        <v-spacer></v-spacer>
        <div><slot name="actions"></slot></div>
      </div>
      <slot />
    </v-card-text>
  </v-card>
</template>
