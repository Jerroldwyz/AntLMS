<script setup lang="ts">
// Need any to fix weird type errors...
const courses: any = await fetchAllCourses()

// This is required for computed property to work
const reactiveElements = reactive({
  searchString: "",
  courseList: courses,
})

const { searchString, courseList } = toRefs(reactiveElements)

const filteredCourseList = computed(() => {
  if (courseList.value) {
    if (searchString.value === "") {
      return courseList.value.sort((a: any, b: any) => a.id - b.id)
    } else {
      return courseList.value
        .filter((course: any) =>
          course.title.toLowerCase().includes(searchString.value.toLowerCase()),
        )
        .sort((a: any, b: any) => a.id - b.id)
    }
  } else {
    return []
  }
})

const updateCourses = async () => {
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
        :key="course.enabled ? `${course.id}-en` : course.id"
        :course="course"
        @delete:course-list="updateCourses"
        @update:course-list="updateCourses"
      ></AdminCourseTableItem>
    </tbody>
  </v-table>
</template>
