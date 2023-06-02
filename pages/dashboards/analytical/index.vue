<script setup lang="ts">
const cardData = [
  {
    img: '/images/background/git.png',
    text: 'Git Basics',
  },
  {
    img: '/images/background/webdev.jpg',
    text: 'Introduction to Web Development',
  },
]
</script>

<template>
  <div class="d-flex flex-column">
    <h1 class="mt-6 mb-10">Dashboard</h1>
      <v-row>
        <v-col v-for="card in cardData">
          <v-card width=250 height=250>
            <img style="width: 100%; height: 65%;" :src="card.img" />
            <v-card-text>
              <h5 class="title font-weight-medium text-h6 text-center">
                {{ card.text }}
              </h5>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col></v-col>
        <v-col></v-col>
      </v-row>
  </div>
</template>

<style scoped>
.v-card-text {

  padding: 0px;
}
</style>
