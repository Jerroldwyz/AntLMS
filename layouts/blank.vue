<script setup lang="ts">
import { useCustomizerStore } from '@/stores/customizer'

const customizer = useCustomizerStore()

const title = ref('Dashboard')

useHead({
  meta: [{ content: title }],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Dashboard` : 'Dashboard'
  },
})
</script>

<template>
  <v-app
    :theme="customizer.darktheme ? 'dark' : 'light'"
    :class="[
      customizer.mini_sidebar ? 'mini-sidebar' : '',
      customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
    ]"
  >
    <slot />
  </v-app>
</template>
