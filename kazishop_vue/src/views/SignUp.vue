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

            <div class="mb-4">
                <label class="block text-gray-900">Repeat password</label>
                <input type="password" class="input border" v-model="password2">
            </div>

            <div v-if="errors.length" class="mb-4">
                <p v-for="error in errors" :key="error" class="text-red-500">{{ error }}</p>
            </div>

            <div class="mb-4">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Sign up</button>
            </div>

            <hr class="mb-4">

            <p>Or <router-link to="/log-in" class="text-blue-500">click here</router-link> to log in!</p>
            </form>
        </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
    name: 'SignUp',
    data() {
        return {
            username: '',
            password: '',
            password2: '',
            errors: []
        }
    },
    methods: {
        submitForm() {
            this.errors = []

            if (this.username === '') {
                this.errors.push('The username is missing')
            }

            if (this.password === '') {
                this.errors.push('The password is too short')
            }

            if (this.password !== this.password2) {
                this.errors.push('The passwords doesn\'t match')
            }

            if (!this.errors.length) {
                const formData = {
                    username: this.username,
                    password: this.password
                }

                axios
                    .post("/api/v1/users/", formData)
                    .then(response => {
                        toast({
                            message: 'Account created, please log in!',
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right',
                        })

                        this.$router.push('/log-in')
                    })
                    .catch(error => {
                        if (error.response) {
                            for (const property in error.response.data) {
                                this.errors.push(`${property}: ${error.response.data[property]}`)
                            }

                            console.log(JSON.stringify(error.response.data))
                        } else if (error.message) {
                            this.errors.push('Something went wrong. Please try again')
                            
                            console.log(JSON.stringify(error))
                        }
                    })
            }
        }
    }
}
</script>