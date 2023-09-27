<script setup lang="ts">
// const { data, error, execute, refresh } = await useFetch('/api/courses', {
//   query: {
//     status: "all"
//   }
// })
// const courses = error !== null ? data : []
const courses = await fetchAllCourses()

// This is required for computed property to work
const reactiveElements = reactive({
  searchString: "",
  courseList: courses,
})

const { searchString, courseList } = toRefs(reactiveElements)

const filteredCourseList = computed(() => {
  if (searchString.value === "") {
    return courseList.value.sort((a: any, b: any) => a.id - b.id)
  } else {
    return courseList.value
      .filter((course: any) =>
        course.title.toLowerCase().includes(searchString.value.toLowerCase()),
      )
      .sort((a: any, b: any) => a.id - b.id)
  }
})

const updateCourses = async () => {
  // await refresh()
  courseList.value = await fetchAllCourses()
}
</script>

<template>
  <v-text-field
    v-model:model-value="searchString"
    clearable
    label="Search"
    type="text"
    variant="outlined"
  >
  </v-text-field>
  <v-table fixed-header>
    <thead>
      <tr>
        <th class="text-left">ID</th>
        <th class="text-left">Thumbnail</th>
        <th class="text-left">Course Name</th>
        <th class="text-left">Enabled</th>
        <th class="text-right">Action</th>
      </tr>
    </thead>
    <tbody>
      <AdminCourseTableItem
        v-for="course in filteredCourseList"
        :key="course.id"
        :course="course"
        @delete:course-list="updateCourses"
        @update:course-list="updateCourses"
      ></AdminCourseTableItem>
    </tbody>
  </v-table>
</template>
