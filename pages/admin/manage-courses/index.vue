<template>
    <h1 class="mb-4">Admin Panel - Courses</h1>
    <v-text-field
        clearable
        label="Search"
        type="text"
        variant="outlined"
    >
        <template v-slot:prepend>
            <v-tooltip location="bottom">
                <template v-slot:activator="{ props }">
                    <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
                </template>
                Filter courses
            </v-tooltip>
        </template>
    </v-text-field>

    <div>
        <v-table
            fixed-header
        >
            <thead>
            <tr>
                <th class="text-left">
                Thumbnail
                </th>
                <th class="text-left">
                Course Name
                </th>
                <th class="text-left">
                Description
                </th>
                <th class="text-right">
                Action
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="n in 9"
            >
                <td>
                    <v-avatar
                        class="ma-3"
                        size="64"
                        rounded="lg"
                    >
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img>
                    </v-avatar>
                </td>
                <td>TITLE</td>
                <td>DESCRIPTION</td>
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
                            activator="parent"
                            v-model="disableDialog[n]"
                            width="auto"
                        >
                            <v-card>
                                <v-card-text>
                                    Are you sure you want to disable course TITLE?
                                </v-card-text>
                                <v-card-actions class="d-flex justify-center align-center pb-4">
                                    <v-btn color="red" variant="outlined">Yes</v-btn>
                                    <v-btn color="black" variant="outlined" @click="disableDialog[n] = false">No</v-btn>
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
                            activator="parent"
                            v-model="deleteDialog[n]"
                            width="auto"
                        >
                            <v-card>
                                <v-card-text>
                                    Are you sure you want to delete course TITLE?
                                </v-card-text>
                                <v-card-actions class="d-flex justify-center align-center pb-4">
                                    <v-btn color="red" variant="outlined">Yes</v-btn>
                                    <v-btn color="black" variant="outlined" @click="deleteDialog[n] = false">No</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-btn>
                </td>
            </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script setup>
    const disableDialog = ref({});
    const deleteDialog = ref({});
</script>