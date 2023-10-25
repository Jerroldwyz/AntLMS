<script setup lang="ts">
definePageMeta({
  middleware: "auth",
})
const browse = ["Creative", "Technology", "Business"]
const courses = await fetchAllCourses()
const router = useRouter()
const dialog = ref(false)

function navigateToSearch(title: string) {
  title = title.toLowerCase()
  router.push({ path: "/search", query: { searchQuery: title } })
}

const handleClick = (isEnrolled: boolean) => {
  console.log(isEnrolled)
}
</script>

<template>
  <div class="text-h2">Explore</div>
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
    class="mr-4 my-1 text-none text-left"
    size="large"
    variant="flat"
    color="#ECEFF1"
    min-width="275px"
    min-height="60px"
    @click="navigateToSearch(title)"
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
      :home="false"
      @clicked="handleClick"
    >
    </CourseTile>
  </v-row>
</template>
