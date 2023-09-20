<script setup lang="ts">
const props = defineProps(["courses"])
const courses = props.courses
const updateCourses = () => {}
</script>

<template>
  <v-table fixed-header>
    <thead>
      <tr>
        <th class="text-left">Thumbnail</th>
        <th class="text-left">Course Name</th>
        <th class="text-left">Description</th>
        <th class="text-right">Action</th>
      </tr>
    </thead>
    <tbody>
      <AdminCourseTableItem
        v-for="course in courses"
        :key="course.id"
        :course="course"
        @update-courses="updateCourses"
      ></AdminCourseTableItem>
    </tbody>
  </v-table>
</template>
