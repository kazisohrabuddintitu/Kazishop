<template>
   <main>
    <div class="flex justify-center items-center h-screen">
        <div class="w-full max-w-sm">
            <h1 class="text-2xl font-bold mb-4">Sign up</h1>

            <form @submit.prevent="submitForm" class="mb-4">
            <div class="mb-4">
                <label class="block text-gray-900">Username</label>
                <input type="text" class="input border" v-model="username">
            </div>

            <div class="mb-4">
                <label class="block text-gray-900">Password</label>
                <input type="password" class="input border" v-model="password">
            </div>

            <div v-if="errors.length" class="mb-4">
                <p v-for="error in errors" :key="error" class="text-red-500">{{ error }}</p>
            </div>

            <div class="mb-4">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Log in</button>
            </div>

            <hr class="mb-4">

            <p>Or <router-link to="/sign-up" class="text-blue-500">click here</router-link> to sign up!</p>
            </form>
        </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LogIn',
    data(){
        return {
            username: '',
            password: '',
            errors: []
        }
    },
    mounted(){
        document.title = 'Log in | Kazishop'
    },
    methods: {
        async submitForm() {
            axios.defaults.headers.common["Authorization"] = ""

            localStorage.removeItem("token")

            const formData = {
                username: this.username,
                password: this.password
            }

            await axios
                .post("/api/v1/token/login/", formData)
                .then(response => {
                    const token = response.data.auth_token

                    this.$store.commit('setToken', token)
                    
                    axios.defaults.headers.common["Authorization"] = "Token " + token

                    localStorage.setItem("token", token)

                    const toPath = this.$route.query.to || '/cart'

                    this.$router.push(toPath)
                })
                .catch(error => {
                    if (error.response) {
                        for (const property in error.response.data) {
                            this.errors.push(`${property}: ${error.response.data[property]}`)
                        }
                    } else {
                        this.errors.push('Something went wrong. Please try again')
                        
                        console.log(JSON.stringify(error))
                    }
                })
        }
    }
}
</script>

<style>

</style>