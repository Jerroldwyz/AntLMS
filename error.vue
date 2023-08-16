<script setup lang="ts">
const title = ref('404-Page Not Found')

useHead({
  meta: [{ content: title }],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 404-Page Not Found` : 'Dashboard'
  },
})
</script>

<template>
  <div class="error-main blue-grey lighten-5">
    <div class="py-12 error-box">
      <div class="text-center">
        <h1 class="error-title error--text">404</h1>
        <h3 class="text-uppercase error-subtitle">PAGE NOT FOUND !</h3>
        <p class="text-grey-darken-1 mt-4 mb-4">
          You seem to be trying to find your way home
        </p>
        <v-btn color="secondary" to="/">Go to Home</v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.error-main {
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background: url('/images/background/error-bg.jpg');
  background-size: cover;
  display: flex;
  height: 100vh;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.error-box {
  max-width: 500px;
}

.error-title {
  font-size: 15rem;
  font-weight: 900;
  text-shadow: 4px 4px 0 #fff, 6px 6px 0 #343a40;
  line-height: auto;
}

@media (max-width: 991px) {
  .error-title {
    font-size: 120px;
    line-height: 120px;
  }
}

@media (max-width: 767px) {
  .error-title {
    font-size: 40px;
    line-height: 40px;
  }
}
</style>
