<template>
  <div class="page-my-account">
        <div class="p-5">
            <div class="pt-10">
                <h1 class="title text-2xl">My account</h1>
            </div>

            <div class="pt-3">
                <button @click="logout()" class="bg-red-600 text-white py-1 
        px-2 rounded text-sm">Log out</button>
            </div>

            <hr>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'MyAccount',

    data(){
        return {

        }
    },
    mounted(){
        document.title = 'My account | Kazishop'
    },
    methods: {
        logout(){
            axios.defaults.headers.common["Authorization"] = ""

            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("userid")

            this.$store.commit('removeToken')

            this.$router.push('/')
        },

    }
}
</script>

<style>

</style>