<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col class="d-flex justify-start align-center">
          <h4 class="text-h4">Details</h4>
        </v-col>
        <v-col class="d-flex justify-end align-center">
          <v-btn
            class="mb-2"
            icon="mdi-dots-vertical"
            flat
          ></v-btn>
        </v-col>
      </v-row>
      <v-divider class="mb-2"></v-divider>
      <v-form>
        <v-text-field label="Title"></v-text-field>
        <v-select
          label="Tag(s)"
          multiple
          chips
        ></v-select>
        <v-file-input label="Thumbnail"></v-file-input>
      </v-form>
    </v-container>
    <v-card color="grey-lighten-3">
      <v-container>
        <v-row justify="end">
          <v-btn
            class="text-capitalize"
            variant="text"
            @click="$emit('close')"
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
