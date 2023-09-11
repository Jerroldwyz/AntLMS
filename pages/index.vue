<script setup lang="ts">
let imagePath: string = ""
let videoPath: string = ""

const imageCallback = (x: string) => {
  imagePath = x
  alert(imagePath)
}

const videoCallback = (x: string) => {
  videoPath = x
  alert(videoPath)
}
</script>

<template>
  <h1>Example index page</h1>
  <NuxtLink to="/mycourses"> View Courses </NuxtLink>

  <FormImageInput @upload-status="imageCallback"></FormImageInput>
  <FormVideoInput @upload-status="videoCallback"></FormVideoInput>
  <DemoGetUrl></DemoGetUrl>
  <DemoDeleteFile></DemoDeleteFile>
</template>
