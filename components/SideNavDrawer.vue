<template>
  <v-navigation-drawer
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    expand-on-hover
    rail
    permanent
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
        value="home"
        href="/home"
      >
      </v-list-item>

      <v-list-group
        class="listItemFont"
        :value="hovered ? 'Browse' : null"
      >
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-format-list-bulleted"
            title="Browse"
          >
          </v-list-item>
        </template>

        <v-list-item
          v-for="(browseTitle, i) in browse"
          :key="i"
          :title="browseTitle"
          :value="title"
          href="?"
        >
        </v-list-item>
      </v-list-group>

      <v-list-group
        class="listItemFont"
        :value="hovered ? 'Courses' : null"
      >
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-view-dashboard"
            title="Courses"
          >
          </v-list-item>
        </template>

        <v-list-item
          v-for="(courseTitle, i) in dashboard"
          :key="i"
          :title="courseTitle"
          :value="title"
          href="?"
        >
        </v-list-item>
      </v-list-group>
    </v-list>

    <!-- <v-divider></v-divider> -->

    <v-list-item
      class="listItemFont"
      prepend-icon="mdi-cog"
      title="Settings"
      value="Settings"
      href="?"
    >
    </v-list-item>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    hovered: false,
    browse: ["Browse all", "Creative", "Technology", "Business"],
    dashboard: ["Math 101", "Business 101", "Baking 101"],
  }),
}
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
</style>
