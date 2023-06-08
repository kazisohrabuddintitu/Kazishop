<template>
    <main class="bg-slate-200 min-h-screen">
        <div class="p-10">      
                        <div class="pb-5">
                            <h1 class="text-xl">Cart</h1>
                        </div>
                        
                        <div class="overflow-x-auto">
                            <table class="w-auto md:w-full md:max-w-none" v-if="cartTotalLength">
                                <thead>
                                    <tr>
                                    <th class="px-4 py-2">Product</th>
                                    <th class="px-4 py-2">Price</th>
                                    <th class="px-4 py-2">Quantity</th>
                                    <th class="px-4 py-2">Total</th>
                                    <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <CartItem
                                    v-for="item in cart.items"
                                    v-bind:key="item.product.id"
                                    v-bind:initialItem="item"
                                    v-on:removeFromCart="removeFromCart"
                                    class="text-center"
                                    />
                                </tbody>
                                </table>


            <p v-else>You don't have any products in your cart...</p>
            </div>

            <div class="pt-5">
            <h2 class="pb-2">Summary</h2>

            <strong>BDT{{ cartTotalPrice.toFixed(2) }}</strong>, {{ cartTotalLength }} items

            <hr class="my-4">

            <div class="flex justify-center md:justify-start">
                <router-link to="/cart/checkout" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Proceed to checkout</router-link>
            </div>
            </div>
 
        </div>
    </main>     
</template>

<script>
import axios from 'axios'
import CartItem from '../components/CartItem.vue'

export default {
    name: 'Cart',
    components: {
        CartItem
    },
    data() {
        return {
            cart: {
                items: []
            }
        }
    },
    mounted() {
        this.cart = this.$store.state.cart
    },
    methods: {
        removeFromCart(item) {
            this.cart.items = this.cart.items.filter(i => i.product.id !== item.product.id)
        }
    },
    computed: {
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.product.price * curVal.quantity
            }, 0)
        },
    }
}
</script>

<style>

</style>