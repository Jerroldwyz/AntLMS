<script setup lang="ts">
const browse = ["Creative", "Technology", "Business"]
const courses = await fetchAllCourses()
</script>

<template>
  <div class="text-h4 font-weight-medium">Explore</div>
  <br />
  <div class="text-h5 font-weight-bold">Browse Categories</div>
  <div class="font-weight-light py-2">
    Discover key content and tools for mastering skills in high-demand industry
    roles.
  </div>
  <v-divider></v-divider>
  <br />

  <v-btn
    v-for="(title, n) in browse"
    :key="n"
    class="mr-4 text-none text-left"
    size="large"
    variant="flat"
    color="#ECEFF1"
    min-width="275px"
    min-height="60px"
  >
    {{ title }}
  </v-btn>

  <div class="my-4"><br /></div>

  <div class="my-4 text-h5 font-weight-bold">All Courses</div>
  <v-divider />
  <br />

  <v-row>
    <CourseTile
      v-for="course in courses"
      :id="course.id"
      :key="course.id"
      :title="course.title"
      :thumbnail="course.thumbnail"
    >
    </CourseTile>
  </v-row>
</template>
