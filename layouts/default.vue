<script setup lang="ts">
import VerticalSidebarVue from '@/components/lc/full/vertical-sidebar/VerticalSidebar.vue'

const title = ref('Dashboard')

useHead({
  meta: [{ content: title }],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Dashboard` : 'Dashboard'
  },
})
</script>

<template>
  <v-app>
    <div style="display: flex; margin-left: 100px" >
      <VerticalSidebarVue />
      <slot />
    </div>
  </v-app>
</template>


<style scoped>

.v-application {
  background-color: #f1f1f1;
}
</style>
