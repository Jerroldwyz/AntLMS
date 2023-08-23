<script setup lang="ts">
const route = useRoute()

</script>
<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-form class="w-50">
          <v-text-field label="Title"></v-text-field>
          <v-select label="Tag(s)" multiple chips></v-select>
          <v-file-input label="Thumbnail"></v-file-input>
        </v-form>
      </v-col>

      <v-col>
        <TopicList />
      </v-col>
    </v-row>
  </v-container>
</template>
