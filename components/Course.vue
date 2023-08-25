<script setup lang="ts">
  const props = defineProps(["title", "img"])

</script>


<template>
  <v-card 
    height="100%"
    :elevation="2" 
    rounded="lg"
  > 
    <v-img 
      height="75%"
      cover
      :src="props.img"
    ></v-img>

    <v-card-item>
      <v-card-title class="text-center"> 
        {{ props.title }} 
      </v-card-title>
    </v-card-item>
  </v-card>
</template>
