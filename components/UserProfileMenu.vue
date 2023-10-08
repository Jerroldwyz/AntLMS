<template>
  <v-menu
    class="rounded"
    min-width="200px"
  >
    <template #activator="{ props }">
      <v-btn
        icon
        v-bind="props"
      >
        <UserAvatar :size="50" />
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
          <UserAvatar :size="80" />
          <h3>{{ currentUser?.name }}</h3>
          <p class="text-caption mt-1">{{ currentUser?.email }}</p>
          <v-divider class="my-3"></v-divider>
          <v-btn
            rounded
            variant="text"
          >
            <NuxtLink
              to="/account"
              class="text-button text-decoration-none text-black"
              >Account Settings</NuxtLink
            >
          </v-btn>
          <v-divider class="my-3"></v-divider>
          <v-btn
            rounded
            variant="text"
            @click="signOut"
          >
            Logout
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const { logout } = useAuth()

const isAuthenticated = computed(() => {
  return userStore.isAuthenticated
})
const currentUser = computed(() => {
  return userStore.user
})
const initials = computed(() => {
  return userStore.initials
})

const signOut = async () => {
  await logout()
  const router = useRouter()
  router.push("/auth/login")
}
</script>
<style scoped></style>
