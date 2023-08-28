<template>
    <h1 class="mb-4">Admin Panel - Manage Site Admins</h1>
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
                Filter users
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
                User Name
                </th>
                <th class="text-left">
                Email
                </th>
                <th class="text-left">
                Role
                </th>
                <th class="text-right">
                Actions
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="n in 9"
            >
                <td>USER NAME</td>
                <td>EMAIL</td>
                <td>ROLE</td>
                <td class="text-right">
                    <v-btn
                        class="ms-2"
                        variant="outlined"
                        size="small"
                    >
                        Edit role
                    </v-btn>

                    <v-btn
                        class="ms-2"
                        variant="outlined"
                        size="small"
                    >
                        Disable
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
                            v-model="dialog[n]"
                            width="auto"
                        >
                            <v-card>
                                <v-card-text>
                                    Are you sure you want to delete USER?
                                </v-card-text>
                                <v-card-actions class="d-flex justify-center align-center pb-4">
                                    <v-btn color="red" variant="outlined">Yes</v-btn>
                                    <v-btn color="black" variant="outlined" @click="dialog[n] = false">No</v-btn>
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
    const dialog = ref({});
</script>