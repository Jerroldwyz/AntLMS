<script setup lang="ts">
const route = useRoute()
</script>
<template>
  <v-container
    class="border"
    fluid
  >
    <v-container>
      <v-row>
        <v-col>
          <FormCourseEdit />
        </v-col>

        <v-col>
          <ContentList />
        </v-col>
      </v-row>
    </v-container>
    <v-container class="d-flex flex-column justify-end">
      <v-card class="bg-grey-lighten-3 w-100">
        <v-container>
          <v-row justify="end">
            <v-btn
              class="text-capitalize"
              variant="text"
              @click="changed = false"
            >
              Cancel
            </v-btn>
            <v-btn class="text-capitalize bg-primary"> Save Changes </v-btn>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
  </v-container>
</template>
