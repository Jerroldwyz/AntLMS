<template>
    <div class="container">
        <h2 class="form-title">Login</h2>
        <v-form>
            <v-container>
                <v-col>
                    <v-col cols="12" sm="12">
                        <v-text-field v-model="username" required :readonly="loading" :rules="[emailRules]" clearable
                            label="Email"></v-text-field>

                    </v-col>

                    <v-col cols=" 12" sm="12">
                        <v-text-field v-model="password" required type="password" label="Password"
                            :rules="[passwordRules]" />
                    </v-col>

                    <v-btn color="secondary" class="button" @click="handleLogin">Login</v-btn>
                    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                </v-col>
            </v-container>
        </v-form>
    </div>
</template>

<script setup>
const username = ref('');
const password = ref('');
const errorMessage = ref('');


async function handleLogin() {
    const { login } = useAuth();
    try {
        await login({
            email: username.value,
            password: password.value,
        });
        errorMessage.value = "";
        $router.push('/dashboard');
    } catch (error) {
        errorMessage.value = error.statusMessage || 'An error occurred during login.';
        console.log(error);
    }
}

function emptyRules(v) {
    return !!v || 'Field cannot be empty';
}

function emailRules(v) {
    return /.+@.+\..+/.test(v) || 'Email must be valid';
}

function passwordRules(v) {
    return v.length >= 8 || 'Too Short';
}
// export default {
//     data() {
//         return {
//             username: '',
//             password: '',
//             errorMessage: '',
//         };
//     },
//     methods: {
//         async handleLogin() {
//             const { login } = useAuth();
//             try {
//                 await login({
//                     email: this.username,
//                     password: this.password,
//                 });
//                 this.errorMessage = "";
//                 this.$router.push('/dashboard');
//             } catch (error) {
//                 this.errorMessage = error.statusMessage || 'An error occurred during login.';
//                 console.log(error);
//             }
//         },
//         emptyRules(v) {
//             return !!v || 'Field cannot be empty';
//         },
//         emailRules(v) {
//             return /.+@.+\..+/.test(v) || 'Email must be valid';
//         },
//         passwordRules(v) {
//             return v.length >= 8 || 'Too Short';
//         }
//     },
// };
</script>

<style>
.container {
    background-color: white;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    /* Adjust the max-width if needed */
    margin: 0 auto;
    text-align: center;
}

.form-title {
    font-size: 28px;
    margin-bottom: 20px;
    color: #333;
}

.form-field {
    margin-bottom: 20px;
}

.form-field label {
    font-size: 16px;
    color: #666;
    display: block;
    margin-bottom: 5px;
    text-align: left;
}

/* Adjust the width of v-text-field elements */
.form-field .v-text-field {
    width: 100%;
    /* Make the text field span the full width of its container */
    max-width: 400px;
    /* Limit the maximum width of the text field */
}

.error-message {
    color: red;
    font-size: 14px;
    margin-top: 10px;
}

.button {
    margin-top: 20px;
}
</style>