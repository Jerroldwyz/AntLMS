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
                <v-text-field
                    density="compact"
                    flat
                    hide-details
                    label="Course Search"
                    rounded="lg"
                    variant="filled"
                    single-line
                ></v-text-field>
                </v-responsive>

                <v-avatar
                class="ms-4 "
                color="grey-darken-1"
                size="48"
                >
                    <span class="text-h6">AN</span>
                </v-avatar>
            </v-container>
        </v-app-bar>

        <v-main class="bg-grey-lighten-3">
            <v-container>
                <v-sheet
                min-height="80vh"
                rounded="lg"
                class="pa-4"
                >
                    <slot />
                </v-sheet>
            </v-container>
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

<style>

</style>