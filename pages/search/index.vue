<script setup lang="ts">
definePageMeta({
  middleware: "auth",
})
const route = useRoute()
const router = useRouter()

const searchQuery = ref("")
const searchResults = ref()

searchResults.value = await fetchSearchQuery(route.query.searchQuery as string)

onMounted(() => {
  watch(
    () => router.currentRoute.value.query.searchQuery,
    (newSearchQuery) => {
      searchQuery.value = newSearchQuery as string
      fetchSearchQuery(searchQuery.value).then(
        (results) => (searchResults.value = results),
      )
    },
  )
})
</script>

<template>
  <div>
    <div class="text-h4 font-weight-medium">Search</div>
    <br />
    <div class="text-h5 font-weight-bold py-2">
      Search results for "{{ route.query.searchQuery }}"
    </div>
    <v-divider></v-divider>
    <br />

    <v-row>
      <CourseTile
        v-for="course in searchResults"
        :id="course.id"
        :key="course.id"
        :title="course.title"
        :thumbnail="course.thumbnail"
      />
    </v-row>
  </div>
</template>
