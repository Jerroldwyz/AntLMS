<script setup lang="ts">
  const topics = [
    {
      title: "Introduction to HTML",
      subtopics: [
        {
          title: "What is HTML?",
          complete: true,
          icon: "mdi-text-box-outline"
        },
        {
          title: "Basic HTML elements",
          complete: false,
          icon: "mdi-text-box-outline"
        }
      ]
    },
    {
      title: "Introduction to CSS",
      subtopics: [
        {
          title: "What is CSS?",
          complete: true,
          icon: "mdi-text-box-outline"
        },
        {
          title: "Quiz 1",
          complete: true,
          icon: "mdi-pencil-circle"
        }
      ]
    },
  ]
</script>

<template>
  <v-card>
    <v-container>
      <v-list >
        <v-list-group v-for="topic in topics">
          <template v-slot:activator="{ props }">
            <v-list-item 
              v-bind="props"
              prepend-icon="mdi-brain"
            >
            {{ topic.title }}
            </v-list-item>
          </template>
          <v-list-item
              v-for="subtopic in topic.subtopics"
              :prepend-icon="subtopic.icon"
          >
          {{ subtopic.title }} 
          </v-list-item>
          <v-list-item
              @click="navigateTo('/mycourses')"
              prepend-icon="mdi-plus"
              class="font-weight-bold"
          >
            New Content
          </v-list-item>
        </v-list-group>
          <v-list-item
              class="font-weight-bold"
              @click="navigateTo('/mycourses')"
              prepend-icon="mdi-plus"
          >
          New Topic
          </v-list-item>
      </v-list>
    </v-container>
  </v-card>
</template>
