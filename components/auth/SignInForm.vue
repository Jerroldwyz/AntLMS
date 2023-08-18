<template>
    <v-card>
        <v-card-title>Login Form</v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field label="Email" v-model="email" rules:="[v => !!v || 'Email is required']"
                    required></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary">Login</v-btn>
        </v-card-actions>
    </v-card>
</template>