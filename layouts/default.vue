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

const classs = 'page-enter'
</script>

<template>
  <v-app
    :theme="customizer.darktheme ? 'dark' : 'light'"
    :class="[
      customizer.mini_sidebar ? 'mini-sidebar' : '',
      customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
    ]"
  >
    <Customizer />
    <VerticalSidebarVue v-if="!customizer.setHorizontalLayout" />
    <VerticalHeaderVue v-if="!customizer.setHorizontalLayout" />
    <v-main>
      <HorizontalHeader v-if="customizer.setHorizontalLayout" />
      <HorizontalSidebar v-if="customizer.setHorizontalLayout" />
      <v-container fluid class="page-wrapper">
        <div v-if="classs">
          <slot />
        </div>
        <v-btn
          class="customizer-btn"
          icon="mdi-cog"
          size="large"
          flat
          @click.stop="
            customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)
          "
        >
        </v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>
