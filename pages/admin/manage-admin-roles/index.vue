<template>
    <h1 class="mb-4">Admin Panel - Manage admin roles</h1>
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
                Role Name
                </th>
                <th class="text-left">
                Permissions
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
                <td>Admin</td>
                <td>EditUser,DisableUser,DeleteUser,CreateSiteAdmin,EditSiteAdmin,DisableSiteAdmin,DeleteSiteAdmin,DisableCourse,DeleteCourse</td>
                <td class="text-right">
                    <v-btn
                        class="ms-2"
                        variant="outlined"
                        size="small"
                    >
                        Edit Permissions
                        <v-dialog
                            v-model="roleDialog[n]"
                            activator="parent"
                            scrollable
                            width="auto"
                        >
                            <v-card>
                                <v-card-title>Select Permissions</v-card-title>
                                <v-divider></v-divider>
                                <v-card-text>
                                    <v-row>
                                        <v-col>
                                            <v-checkbox
                                                label="EditUser"
                                                value="edituser"
                                                class="my-2 mx-4"
                                                hide-details
                                            ></v-checkbox>
                                            <v-checkbox
                                                label="DisableUser" value="disableuser"
                                                class="my-2 mx-4"
                                                hide-details
                                            ></v-checkbox>
                                            <v-checkbox
                                                label="DeleteUser" value="deleteuser"
                                                class="my-2 mx-4"
                                                hide-details
                                            ></v-checkbox>
                                        </v-col>
                                        <v-col>
                                            <v-checkbox
                                                label="CreateSiteAdmin"
                                                value="createsiteadmin"
                                                class="my-2 mx-4"
                                                hide-details
                                            ></v-checkbox>
                                            <v-checkbox
                                                label="EditSiteAdmin"
                                                value="editsiteadmin"
                                                class="my-2 mx-4"
                                                hide-details
                                            ></v-checkbox>
                                            <v-checkbox
                                                label="DisableSiteAdmin"
                                                value="disablesiteadmin"
                                                class="my-2 mx-4"
                                                hide-details
                                            ></v-checkbox>
                                        </v-col>
                                        <v-col>
                                            <v-checkbox
                                                label="DeleteSiteAdmin"
                                                value="deletesiteadmin"
                                                class="my-2 mx-4"
                                                hide-details
                                            ></v-checkbox>
                                            <v-checkbox
                                                label="DisableCourse"
                                                value="disablecourse"
                                                class="my-2 mx-4"
                                                hide-details
                                            ></v-checkbox>
                                            <v-checkbox
                                                label="DeleteCourse"
                                                value="deletecourse"
                                                class="my-2 mx-4"
                                                hide-details
                                            ></v-checkbox>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-btn
                                        color="blue-darken-1"
                                        variant="text"
                                        @click="roleDialog[n] = false"
                                    >
                                        Save
                                    </v-btn>
                                    <v-btn
                                        color="black"
                                        variant="text"
                                        @click="roleDialog[n] = false"
                                    >
                                        Close
                                    </v-btn>
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
                                    Are you sure you want to delete USER?
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
    const deleteDialog = ref({});
    const roleDialog = ref({});
</script>