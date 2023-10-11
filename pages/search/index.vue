<script setup lang="ts">
const route = useRoute()
const results = await fetchSearchQuery(route.query.searchQuery as string)
</script>

<template>
  <div>
    <div class="text-h4 font-weight-medium">Search</div>
    <br />
    <div class="text-h5 font-weight-bold py-2">
      Search results for "{{ route.query.searchQuery }}""
    </div>
    <v-divider></v-divider>
    <br />

    <v-row>
      <CourseTile
        v-for="course in results"
        :id="course.id"
        :key="course.id"
        :title="course.title"
        :thumbnail="course.thumbnail"
      />
    </v-row>
  </div>
</template>
