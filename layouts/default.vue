<template>
    <v-app id="inspire">
        <v-app-bar flat>
            <v-container class="mx-auto d-flex align-center justify-center">
                <span class="text-button text-white bg-brown px-2 py-1 rounded-lg">AntLMS</span>
                <v-btn variant="text">
                    <NuxtLink to="/" class="text-button text-decoration-none text-black">Dashboard</NuxtLink>
                </v-btn>
                <v-btn variant="text">
                    <NuxtLink to="/mycourses" class="text-button text-decoration-none text-black">My Courses</NuxtLink>
                </v-btn>
                <v-btn variant="text">
                    <NuxtLink to="/courses?search=" class="text-button text-decoration-none text-black">Browse</NuxtLink>
                </v-btn>
                <v-spacer></v-spacer>

                <v-responsive max-width="160">
                    <v-text-field density="compact" flat hide-details label="Course Search" rounded="lg" variant="filled"
                        single-line></v-text-field>
                </v-responsive>

                <v-menu min-width="200px" rounded>
                    <template v-slot:activator="{ props }">
                        <v-btn icon v-bind="props">
                            <v-avatar class="ms-4" color="grey-darken-1" size="large">
                                <span class="text-h6">AN</span>
                            </v-avatar>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-text>
                            <div class="mx-auto text-center">
                                <v-avatar color="grey-darken-1">
                                    <span class="text-h5">AN</span>
                                </v-avatar>
                                <h3>ANONYMOUS TODO</h3>
                                <p class="text-caption mt-1">ANONYMOUS@TODO.COM</p>
                                <v-divider class="my-3"></v-divider>
                                <v-btn rounded variant="text">
                                    <NuxtLink to="/account" class="text-button text-decoration-none text-black">Account
                                        Settings</NuxtLink>
                                </v-btn>
                                <v-divider class="my-3"></v-divider>
                                <v-btn rounded variant="text">
                                    <NuxtLink to="/auth/logout" class="text-button text-decoration-none text-black">Logout
                                    </NuxtLink>
                                </v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-menu>
            </v-container>
        </v-app-bar>

        <v-main class="bg-grey-lighten-3">
            <v-sheet min-height="80vh" rounded="lg" class="ma-4 pa-4">
                <slot />
            </v-sheet>
        </v-main>
        <v-footer>
            <v-row justify="center" no-gutters>
                <v-col class="text-center mt-4" cols="12">
                    {{ new Date().getFullYear() }} — <strong>AntLMS</strong>
                </v-col>
            </v-row>
        </v-footer>
    </v-app>
</template>

<script setup>
</script>

<style></style>