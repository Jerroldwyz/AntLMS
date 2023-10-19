<script setup lang="ts">
import draggable from "vuedraggable"
import { removeTopic } from "~/utils/topic-helpers"
const route = useRoute()
const drag = ref(false)
const changed = ref(false)
const topicDialog = ref(false)
const contentDialog = ref(false)

// TODO: change any to real type
const props = defineProps<{
  course: any
}>()

console.log(props.course)

const emit = defineEmits<{
  (e: "delete"): void
  (e: "update:course", course: any): void
}>()

// TODO: add proper type
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

async function handleTopicDelete(topicId: number) {
  await removeTopic(topicId)
  emit("delete")
}

async function handleContentDelete(contentId: number) {
  await deleteContent(contentId)
  emit("delete")
}
</script>

<template>
  <v-card class="w-100">
    <v-container fluid>
      <v-row>
        <v-col class="d-flex justify-start align-center">
          <h4 class="text-h5 font-weight-bold">Topic</h4>
        </v-col>
        <v-col class="d-flex justify-end align-center">
          <v-btn
            class="mb-2 bg-primary"
            icon="mdi-plus"
            @click="
              navigateTo(
                `${route.params.id}/newtopic?position=${
                  course.topics.length + 1
                }`,
              )
            "
          ></v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-list
        max-height="100%"
        height="400"
      >
        <draggable
          :model-value="props.course.topics"
          group="topics"
          item-key="id"
          animation="200"
          @update:model-value="
            (topics) => $emit('update:course', { ...course, topics })
          "
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
                      variant="flat"
                      @click.stop="
                        navigateTo(
                          `${route.params.id}/topic/${
                            topic.id
                          }/newcontent?topicId=${topic.id}&position=${
                            topic.content.length + 1
                          }`,
                        )
                      "
                    >
                    </v-btn>
                    <v-btn
                      icon="mdi-delete"
                      variant="flat"
                      @click.stop="topicDialog = true"
                    >
                    </v-btn>
                  </template>
                  <v-dialog
                    v-model="topicDialog"
                    persistent
                    width="auto"
                  >
                    <v-card>
                      <v-card-title class="text-h5 bg-red">
                        Delete Topic
                      </v-card-title>
                      <v-card-text>
                        Are you sure you want to delete this topic?
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="green-darken-1"
                          variant="text"
                          @click="topicDialog = false"
                        >
                          No
                        </v-btn>
                        <v-btn
                          color="red-darken-1"
                          variant="elevated"
                          @click="
                            () => {
                              handleTopicDelete(topic.id)
                              topicDialog = false
                            }
                          "
                        >
                          Yes
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
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
                        icon="mdi-delete"
                        variant="flat"
                        @click="contentDialog = true"
                      >
                      </v-btn>
                    </template>
                    <v-dialog
                      v-model="contentDialog"
                      persistent
                      width="auto"
                    >
                      <v-card>
                        <v-card-title class="text-h5 bg-red">
                          Delete Content
                        </v-card-title>
                        <v-card-text>
                          Are you sure you want to delete this content?
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="green-darken-1"
                            variant="text"
                            @click="contentDialog = false"
                          >
                            No
                          </v-btn>
                          <v-btn
                            color="red-darken-1"
                            variant="elevated"
                            @click="
                              () => {
                                handleContentDelete(content.id)
                                contentDialog = false
                              }
                            "
                          >
                            Yes
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
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
