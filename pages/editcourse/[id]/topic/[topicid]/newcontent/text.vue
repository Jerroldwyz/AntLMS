<script setup lang="ts">
const route = useRoute()

const loading = ref(false)

const content = ref("")

function submitTextContent() {
  if (
    typeof route.query.title === "string" &&
    typeof route.params.topicid === "string"
  ) {
    submitContent(
      route.query.title,
      "TEXT",
      content.value,
      route.params.topicid,
    )
    navigateTo(`/editcourse/${route.params.id}`)
  }
}
</script>

<template>
  <h1 class="mb-4">{{ route.query.title }}</h1>
  <ClientOnly
    fallback-tag="div"
    fallback="Loading editor..."
  >
    <quill-editor
      v-model:content="content"
      content-type="html"
      theme="snow"
    />
  </ClientOnly>
  <v-card class="d-flex justify-end bg-grey-lighten-3 w-100 pa-2 mt-4">
    <v-btn
      class="text-capitalize"
      variant="text"
      @click="navigateTo(`/editcourse/${route.params.id}`)"
    >
      Cancel
    </v-btn>
    <v-btn
      class="text-capitalize bg-primary"
      :loading="loading"
      @click="submitTextContent"
    >
      Create
    </v-btn>
  </v-card>
</template>

<style>
.ql-editor {
  min-height: 400px;
}
</style>
