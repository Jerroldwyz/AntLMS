<script setup lang="ts">
import VerticalHeaderVue from '@/components/lc/full/vertical-header/VerticalHeader.vue'
import Customizer from '@/components/lc/full/customizer/Customizer.vue'
import HorizontalHeader from '@/components/lc/full/horizontal-header/HorizontalHeader.vue'
import HorizontalSidebar from '@/components/lc/full/horizontal-sidebar/HorizontalSidebar.vue'
import VerticalSidebarVue from '@/components/lc/full/vertical-sidebar/VerticalSidebar.vue'
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
  <v-app>
    <VerticalSidebarVue />
    <VerticalHeaderVue />
      <v-container fluid class="page-wrapper">
        <div>
          <slot />
        </div>
      </v-container>
  </v-app>
</template>
