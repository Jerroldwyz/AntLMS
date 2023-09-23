<script setup lang="ts">
const props = defineProps(["courses"])
const courses = props.courses
const courseList = ref(courses)
const updateCourses = (courseIdToDelete: number) => {
  courseList.value = courseList.value.filter(
    (course: any) => course.id !== courseIdToDelete,
  )
}
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
        v-for="course in courseList"
        :key="course.id"
        :course="course"
        @delete:courseList="updateCourses"
      ></AdminCourseTableItem>
    </tbody>
  </v-table>
</template>
