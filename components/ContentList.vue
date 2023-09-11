<script setup lang="ts">
import draggable from "vuedraggable"
const drag = ref(false)
const changed = ref(false)

// TODO: change any to real type
const { course } = defineProps<{
  course: any
}>()

//TODO: add proper type
function getIcon(content: any): string {
  switch (content.type) {
    case "TEXT":
      return "mdi-text-box-outline"
    case "VIDEO":
      return "mdi-video-box"
    default:
      return "mdi-pencil-circle"
  }
}
</script>

<template>
  <v-card class="w-100">
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

      <v-list
        max-height="100%"
        height="400"
      >
        <draggable
          v-model="course.topics"
          group="topics"
          item-key="id"
          animation="200"
          @change="changed = true"
          @start="drag = true"
          @end="drag = false"
        >
          <template #item="{ element: topic }">
            <v-list-group>
              <template #activator="{ props }">
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
                v-model="topic.content"
                group="content"
                item-key="id"
                animation="200"
                @change="changed = true"
                @start="drag = true"
                @end="drag = false"
              >
                <template #item="{ element: content }">
                  <v-list-item :prepend-icon="getIcon(content)">
                    {{ content.title }}
                    <template #append>
                      <v-btn
                        @click="deleteContent(content)"
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
  </v-card>
</template>