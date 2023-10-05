<script setup lang="ts">
const route = useRoute()
const titleRules = [
  (value: string) => {
    if (value) return true

    return "You must enter a title"
  },
  (value: string) => {
    if (value.length > 5) return true

    return "Title must be 5 characters or more"
  },
]

const title = ref("")

async function submitTopic() {
  if (typeof route.params.id === "string") {
    await addTopic(route.params.id, title.value)
    await navigateTo(`/editcourse/${route.params.id}`)
  }
}
</script>

<template>
  <v-dialog
    :model-value="true"
    persistent
  >
    <v-container
      class="d-flex justify-center align-center"
      fluid
    >
      <v-card width="25%">
        <v-form @submit.prevent="submitTopic">
          <v-row>
            <v-col>
              <v-card-title class="text-h5"> Add New Topic </v-card-title>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-btn
                icon="mdi-close"
                variant="flat"
                @click="navigateTo(`/editcourse/${$route.params.id}`)"
              ></v-btn>
            </v-col>
          </v-row>
          <v-container>
            <v-text-field
              v-model="title"
              variant="outlined"
              label="Title"
              :rules="titleRules"
            ></v-text-field>
          </v-container>
          <v-card class="d-flex justify-end bg-grey-lighten-3 pa-2">
            <v-btn
              class="text-capitalize"
              variant="text"
              @click="navigateTo(`/editcourse/${$route.params.id}`)"
            >
              Cancel
            </v-btn>
            <v-btn
              class="text-capitalize bg-primary"
              type="submit"
            >
              Create
            </v-btn>
          </v-card>
        </v-form>
      </v-card>
    </v-container>
  </v-dialog>
</template>
