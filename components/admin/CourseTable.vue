<script setup lang="ts">
const courses = await fetchAllCourses()

let courseList = toRaw(courses.value)
// TODO I would rather use computed value here but it does not want to work lol
const filteredCourseList = ref(courseList)

const updateSearch = (searchString: string) => {
  if (searchString === "") {
    filteredCourseList.value = courseList
  } else {
    filteredCourseList.value = courseList.filter((course: any) =>
      course.title.toLowerCase().includes(searchString.toLowerCase()),
    )
  }
}

const updateCourses = (courseIdToDelete: number) => {
  courseList = courseList.filter(
    (course: any) => course.id !== courseIdToDelete,
  )
}
</script>

<template>
  <v-text-field
    clearable
    label="Search"
    type="text"
    variant="outlined"
    @update:model-value="updateSearch"
  >
  </v-text-field>
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
        v-for="course in filteredCourseList"
        :key="course.id"
        :course="course"
        @delete:courseList="updateCourses"
      ></AdminCourseTableItem>
    </tbody>
  </v-table>
</template>
