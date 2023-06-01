<script setup lang="ts">
import { ref } from 'vue'
import LogoLight from '../logo/LogoLight.vue'
import LogoDark from '../logo/LogoDark.vue'
import sidebarItems from './sidebarItem'
import { useCustomizerStore } from '@/stores/customizer'

const customizer = useCustomizerStore()
const sidebarMenu = ref(sidebarItems)
</script>

<template>
  <v-navigation-drawer
    v-model="customizer.Sidebar_drawer"
    left
    :permanent="$vuetify.display.mdAndUp"
    elevation="10"
    :class="customizer.SidebarColor == 'white' ? '' : 'text-white'"
    :color="customizer.darktheme ? '' : customizer.SidebarColor"
    rail-width="75"
    mobile-breakpoint="960"
    app
    class="leftSidebar"
    :rail="customizer.mini_sidebar"
    expand-on-hover
  >
    <!-- ---------------------------------------------- -->
    <!---Logo part -->
    <!-- ---------------------------------------------- -->
    <div class="pa-4">
      <LogoDark
        v-if="!customizer.darktheme && customizer.SidebarColor == 'white'"
      />
      <LogoLight v-else />
    </div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <PerfectScrollbar class="scrollnavbar">
      <v-list class="pa-4" color="transparent">
        <!-- ---------------------------------------------- -->
        <!---Menu Loop -->
        <!-- ---------------------------------------------- -->
        <template v-for="(item, i) in sidebarMenu" :key="i">
          <!-- ---------------------------------------------- -->
          <!---Item Sub Header -->
          <!-- ---------------------------------------------- -->
          <v-list-subheader v-if="item.header">{{
            item.header
          }}</v-list-subheader>
          <!-- ---------------------------------------------- -->
          <!---If Has Child -->
          <!-- ---------------------------------------------- -->
          <v-list-group v-else-if="item.children">
            <!-- ---------------------------------------------- -->
            <!---Dropdown  -->
            <!-- ---------------------------------------------- -->
            <template #activator="{ props }">
              <v-list-item
                v-bind="props"
                :value="item.title"
                rounded="lg"
                class="mb-1"
              >
                <!---Icon  -->
                <template #prepend>
                  <vue-feather
                    :type="item.icon"
                    class="feather-sm v-icon"
                  ></vue-feather>
                </template>
                <!---Title  -->
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </template>
            <!-- ---------------------------------------------- -->
            <!---Sub Item-->
            <!-- ---------------------------------------------- -->
            <v-list-item
              v-for="(subitem, j) in item.children"
              :key="j"
              :value="subitem.to"
              :to="subitem.to"
              rounded="lg"
              class="first-level-item mb-1"
            >
              <template #prepend>
                <vue-feather
                  type="disc"
                  class="feather-sm v-icon"
                ></vue-feather>
              </template>
              <v-list-item-title>{{ subitem.title }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
          <!-- ---------------------------------------------- -->
          <!---Single Item-->
          <!-- ---------------------------------------------- -->
          <v-list-item v-else :key="i" :to="item.to" rounded="lg" class="mb-1">
            <template #prepend>
              <vue-feather
                :type="item.icon"
                class="feather-sm v-icon v-icon--size-default"
              ></vue-feather>
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
          <!-- ---------------------------------------------- -->
          <!---End Single Item-->
          <!-- ---------------------------------------------- -->
        </template>
      </v-list>
    </PerfectScrollbar>
  </v-navigation-drawer>
</template>
