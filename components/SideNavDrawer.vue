<template>
  <v-navigation-drawer
    expand-on-hover
    rail
    permanent
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <v-divider></v-divider>

    <v-list
      nav
      rounded
      class="drawer-list"
    >
      <v-list-item
        class="listItemFont"
        prepend-icon="mdi-home"
        title="Home"
        to="/"
      >
      </v-list-item>

      <v-list-group
        class="listItemFont"
        :value="hovered ? 'Browse' : null"
        title="Browse"
      >
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-format-list-bulleted"
          >
          </v-list-item>
        </template>

        <v-list-item
          v-for="(browseTitle, i) in browse"
          :key="i"
          :title="browseTitle"
          prepend-icon="mdi-circle-small"
          href="?"
        >
        </v-list-item>
      </v-list-group>

      <v-list-group
        class="listItemFont"
        :value="hovered ? 'Courses' : null"
      >
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-view-dashboard"
            title="Courses"
          >
          </v-list-item>
        </template>

        <v-list-item
          v-for="course in courses"
          :id="course.id"
          :key="course.id"
          :title="course.title"
          prepend-icon="mdi-circle-small"
          to=""
        >
        </v-list-item>
      </v-list-group>
    </v-list>

    <v-list-item
      class="listItemFont"
      prepend-icon="mdi-cog"
      title="Settings"
      href="?"
    >
    </v-list-item>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const courses = await fetchAllUserCourses()
const browse = ["Browse all", "Creative", "Technology", "Business"]
const hovered = ref(true)

console.log(courses)
</script>

<style>
.listItemFont .v-list-item-title {
  font-size: 17px;
}

.drawer-list {
  display: flex;
  flex-direction: column;
  height: 91.75%;
}

.v-list-group__items {
  --indent-padding: 0px;
}
</style>
