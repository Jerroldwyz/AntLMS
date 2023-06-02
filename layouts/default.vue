<script setup lang="ts">
import VerticalSidebarVue from '@/components/lc/full/vertical-sidebar/VerticalSidebar.vue'

const title = ref('Dashboard')

useHead({
  meta: [{ content: title }],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Dashboard` : 'Dashboard'
  },
})

const topicData = [
  'HTML Basics',
  'CSS Fundamentals',
  'Responsive Design',
  'Introducing Javascript',
]
</script>

<template>
  <v-app>
    <div style="display: flex; margin-left: 100px">
      <VerticalSidebarVue />
      <slot />

      <div class="side-widgets">
        <v-btn
          rounded="xl"
          color="white"
          size="x-large"
          class="d-flex mt-6 mb-12"
          style="width: 80%"
        >
          <p>example_user</p>
          <template v-slot:append>
            <span class="user-icon">E</span>
          </template>
        </v-btn>
        <div class="progress-widget">
          <h1 class="text-center">Introduction to Web Development</h1>
          <span
            class="d-flex justify-center align-center text-h5 mt-12 progress-wheel"
            >100%</span
          >
          <v-btn
            rounded="xl"
            size="large"
            style="width: 80%"
            class="mt-12 text-white"
            color="#1976D2"
            >CONTINUE</v-btn
          >
          <ul>
            <li v-for="topic in topicData">
              <span class="text-decoration-line-through"> {{ topic }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </v-app>
</template>

<style scoped>
.v-application {
  background-color: #f1f1f1;
}

.side-widgets {
  right: 0;
  top: 0;
  position: fixed;
  height: 100vh;
  width: 18%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.progress-widget {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 1px 0px 20px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.progress-wheel {
  background-color: #bbb;
  height: 250px;
  width: 250px;
  background-color: white;
  border: 15px solid green;
  border-radius: 50%;
}

.user-icon {
  background-color: #7468BE;
  height: 40px;
  width: 40px;
  display: flex;
  align-items:center;
  justify-content: center;
  border-radius: 50%;
  margin-left: 30px;
  color: white;
}

ul {
  margin: 30px;
}
</style>
