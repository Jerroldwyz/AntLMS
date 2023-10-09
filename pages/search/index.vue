<template>
  <div>
    <h1>Search Results for "{{ searchQuery }}"</h1>
    <!-- Display your search results here -->
  </div>
</template>

<script>
export default {
  data() {
    console.log(this.$route.query.query)
    return {
      searchQuery: this.$route.query.query || "", // Get the search query from the URL
    }
  },
}
</script>
