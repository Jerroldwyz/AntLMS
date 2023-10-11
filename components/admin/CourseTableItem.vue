<script setup lang="ts">
const prop = defineProps(["course"])
const emits = defineEmits(["delete:courseList", "update:courseList"])
const disableDialog = ref(false)
const enableDialog = ref(false)
const deleteDialog = ref(false)
const course = prop.course

const presignedUrl = await getImage(course.thumbnail)
console.log(presignedUrl)

const disableCourseNow = async () => {
  await disableCourseById(course.id)
  emits("update:courseList", course.id)
  disableDialog.value = false
}
const enableCourseNow = async () => {
  await enableCourseById(course.id)
  emits("update:courseList", course.id)
  enableDialog.value = false
}
const deleteCourseNow = async () => {
  await deleteCourseById(course.id)
  emits("delete:courseList", course.id)
  deleteDialog.value = false
}
</script>

<template>
  <tr>
    <td>{{ course.id }}</td>
    <td>
      <v-avatar
        class="ma-3"
        size="64"
        rounded="lg"
      >
        <v-img :src="presignedUrl"></v-img>
      </v-avatar>
    </td>
    <td>{{ course.title }}</td>
    <td>{{ course.enabled }}</td>
    <td class="text-right">
      <v-btn
        class="ms-2"
        variant="outlined"
        size="small"
      >
        View
      </v-btn>

      <v-btn
        v-if="course.enabled === false"
        class="ms-2"
        variant="outlined"
        size="small"
      >
        Enable
        <v-dialog
          v-model="enableDialog"
          activator="parent"
          width="auto"
        >
          <v-card>
            <v-card-text>
              Are you sure you want to enable course {{ course.title }}?
            </v-card-text>
            <v-card-actions class="d-flex justify-center align-center pb-4">
              <v-btn
                color="red"
                variant="outlined"
                @click="enableCourseNow"
                >Yes</v-btn
              >
              <v-btn
                color="black"
                variant="outlined"
                @click="disableDialog = false"
                >No</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
      <v-btn
        v-if="course.enabled === true"
        class="ms-2"
        variant="outlined"
        size="small"
      >
        Disable
        <v-dialog
          v-model="disableDialog"
          activator="parent"
          width="auto"
        >
          <v-card>
            <v-card-text>
              Are you sure you want to disable course {{ course.title }}?
            </v-card-text>
            <v-card-actions class="d-flex justify-center align-center pb-4">
              <v-btn
                color="red"
                variant="outlined"
                @click="disableCourseNow"
                >Yes</v-btn
              >
              <v-btn
                color="black"
                variant="outlined"
                @click="disableDialog = false"
                >No</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
      <v-btn
        class="ms-2"
        variant="outlined"
        size="small"
        color="red"
      >
        Delete
        <v-dialog
          v-model="deleteDialog"
          activator="parent"
          width="auto"
        >
          <v-card>
            <v-card-text>
              Are you sure you want to delete course {{ course.title }}?
            </v-card-text>
            <v-card-actions class="d-flex justify-center align-center pb-4">
              <v-btn
                color="red"
                variant="outlined"
                @click="deleteCourseNow"
                >Yes</v-btn
              >
              <v-btn
                color="black"
                variant="outlined"
                @click="deleteDialog = false"
                >No</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </td>
  </tr>
</template>
