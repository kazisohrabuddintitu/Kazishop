<template>
  <div class="page-my-account bg-slate-300">
        <div class="p-5">
            <div class="pt-10">
                <h1 class="title text-2xl">My account</h1>
            </div>

            <div class="pt-3">
                <button @click="logout()" class="bg-red-600 text-white py-1 
        px-2 rounded text-sm">Log out</button>
            </div>

            <hr>

            <div class="p-10">
                <h2 class="subtitle">My orders</h2>

                <OrderSummary
                    v-for="order in orders"
                    v-bind:key="order.id"
                    v-bind:order="order" />
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import OrderSummary from '../components/OrderSummary.vue'


export default {
    name: 'MyAccount',
    components: {
        OrderSummary
    },
    data(){
        return {
            orders: []
        }
    },
    mounted(){
        document.title = 'My account | Kazishop'
        this.getMyOrders()
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
        async getMyOrders() {
            this.$store.commit('setIsLoading', true)

            await axios
                .get('/api/v1/orders/')
                .then(response => {
                    this.orders = response.data
                })
                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)
        }

    }
}
</script>