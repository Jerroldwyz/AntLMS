<script setup lang="ts">
const prop = defineProps(["courses"])
const disableDialog = ref(false)
const deleteDialog = ref(false)
const courses = prop.courses
</script>

<template>
  <tr>
    <td>
      <v-avatar
        class="ma-3"
        size="64"
        rounded="lg"
      >
        <v-img :src="course.thumbnail"></v-img>
      </v-avatar>
    </td>
    <td>{{ course.title }}</td>
    <td>{{ course.description }}</td>
    <td class="text-right">
      <v-btn
        class="ms-2"
        variant="outlined"
        size="small"
      >
        View
      </v-btn>

      <v-btn
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
              Are you sure you want to disable course TITLE?
            </v-card-text>
            <v-card-actions class="d-flex justify-center align-center pb-4">
              <v-btn
                color="red"
                variant="outlined"
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
              Are you sure you want to delete course TITLE?
            </v-card-text>
            <v-card-actions class="d-flex justify-center align-center pb-4">
              <v-btn
                color="red"
                variant="outlined"
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
