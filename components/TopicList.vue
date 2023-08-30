<script setup lang="ts">
import draggable from "vuedraggable"
const drag = ref(false)
const changed = ref(false)

const topics = ref([
  {
    title: "Introduction to HTML",
    subtopics: [
      {
        title: "What is HTML?",
        complete: true,
        icon: "mdi-text-box-outline",
      },
      {
        title: "Basic HTML elements",
        complete: false,
        icon: "mdi-text-box-outline",
      },
    ],
  },
  {
    title: "Introduction to CSS",
    subtopics: [
      {
        title: "What is CSS?",
        complete: true,
        icon: "mdi-text-box-outline",
      },
      {
        title: "Quiz 1",
        complete: true,
        icon: "mdi-pencil-circle",
      },
    ],
  },
])
</script>

<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col class="d-flex justify-start align-center">
          <h4 class="text-h4">Content</h4>
        </v-col>
        <v-col class="d-flex justify-end align-center">
          <v-btn
            class="mb-2 bg-primary"
            icon="mdi-plus"
          ></v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-list>
        <draggable
          v-model="topics"
          group="topics"
          item-key="id"
          @change="changed = true"
          @start="drag = true"
          @end="drag = false"
        >
          <template #item="{ element: topic }">
            <v-list-group>
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-brain"
                >
                  {{ topic.title }}
                  <template #append>
                    <v-btn
                      icon="mdi-plus"
                      flat
                    >
                    </v-btn>
                    <v-btn
                      icon="mdi-delete"
                      flat
                    >
                    </v-btn>
                  </template>
                </v-list-item>
              </template>

              <draggable
                v-model="topic.subtopics"
                group="subtopics"
                item-key="id"
                @change="changed = true"
                @start="drag = true"
                @end="drag = false"
              >
                <template #item="{ element: subtopic }">
                  <v-list-item :prepend-icon="subtopic.icon">
                    {{ subtopic.title }}
                    <template #append>
                      <v-btn
                        icon="mdi-delete"
                        flat
                      >
                      </v-btn>
                    </template>
                  </v-list-item>
                </template>
              </draggable>
            </v-list-group>
          </template>
        </draggable>
      </v-list>
    </v-container>
    <v-card color="grey-lighten-3">
      <v-container>
        <v-row justify="end">
          <v-btn
            class="text-capitalize"
            variant="text"
            @click="changed = false"
          >
            Cancel
          </v-btn>
          <v-btn
            class="text-capitalize bg-primary"
            @click="
              $emit('course-success')
              $emit('close')
            "
          >
            Save Changes
          </v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-card>
</template>
