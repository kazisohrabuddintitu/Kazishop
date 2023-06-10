<template>
      <main class="min-h-screen">
        <div class="p-10">      
                        <div class="pb-5">
                            <h1 class="text-xl">Cart</h1>
                        </div>
                        <div class="overflow-x-auto shadow-md">
                            <table class="w-auto md:w-full md:max-w-none" v-if="cartTotalLength">
                                <thead class="border">
                                    <tr>
                                    <th class="px-4 py-2">Product</th>
                                    <th class="px-4 py-2">Price</th>
                                    <th class="px-4 py-2">Quantity</th>
                                    <th class="px-4 py-2">Total</th>
                                    </tr>                   
                                </thead>
                                <tbody class="border">
                                    <tr
                                        v-for="item in cart.items"
                                        v-bind:key="item.product.id" class="text-center">
                                        <td>{{ item.product.name }}</td>
                                        <td>BDT{{ item.product.price }}</td>
                                        <td>{{ item.quantity }}</td>
                                        <td>BDT{{ getItemTotal(item).toFixed(2) }}</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr class="text-center">
                                        <td colspan="2" >Total</td>
                                        <td>{{ cartTotalLength }}</td>
                                        <td>BDT{{ cartTotalPrice.toFixed(2) }}</td>
                                    </tr>
                                </tfoot>
                                </table>
                        </div>
                        <div class="mt-10 shadow-md">
                            <h1>Shipping details</h1>
                            <p class="text-gray-500 mt-4 pb-4 text-sm">* All fields are required</p>

                            <div class="grid md:grid-cols-2 p-4">
                                <div class="column pr-3">
                                    <div class="field">
                                        <label>First name*</label>
                                        <div class="control">
                                            <input type="text" class="input border w-full" v-model="first_name">
                                        </div>
                                    </div>

                                    <div class="field">
                                        <label>Last name*</label>
                                        <div class="control">
                                            <input type="text" class="input border w-full" v-model="last_name">
                                        </div>
                                    </div>

                                    <div class="field">
                                        <label>E-mail*</label>
                                        <div class="control">
                                            <input type="email" class="input border w-full" v-model="email">
                                        </div>
                                    </div>

                                    <div class="field">
                                        <label>Phone*</label>
                                        <div class="control">
                                            <input type="text" class="input border w-full" v-model="phone">
                                        </div>
                                    </div>
                                </div>
                            

                                <div class="column pr-3">
                                    <div class="field">
                                        <label>Address*</label>
                                        <div class="control">
                                            <input type="text" class="input border w-full" v-model="address">
                                        </div>
                                    </div>

                                    <div class="field">
                                        <label>Zip code*</label>
                                        <div class="control">
                                            <input type="text" class="input border w-full" v-model="zipcode">
                                        </div>
                                    </div>

                                    <div class="field">
                                        <label>Place*</label>
                                        <div class="control">
                                            <input type="text" class="input border w-full" v-model="place">
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="p-4">
                                <div class="mt-4 bg-red-300" v-if="errors.length">
                                    <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                                </div>
                                <template v-if="cartTotalLength">
                                    <button class="button bg-slate-700 text-white py-1 px-4 rounded" @click="submitForm">Pay </button>
                                </template>
                            </div>                           
                        </div>   
        </div>
    </main>    
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    name: 'Checkout',
    data() {
        return {
            cart: {
                items: []
            },
            card: {},
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            zipcode: '',
            place: '',
            errors: []
        }
    },
    mounted() {
        document.title = 'Checkout | Kazishop'

        this.cart = this.$store.state.cart
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price
        },
        submitForm() {
            this.errors = []

            if (this.first_name === '') {
                this.errors.push('The first name field is missing!')
            }

            if (this.last_name === '') {
                this.errors.push('The last name field is missing!')
            }

            if (this.email === '') {
                this.errors.push('The email field is missing!')
            }

            if (this.phone === '') {
                this.errors.push('The phone field is missing!')
            }

            if (this.address === '') {
                this.errors.push('The address field is missing!')
            }

            if (this.zipcode === '') {
                this.errors.push('The zip code field is missing!')
            }

            if (this.place === '') {
                this.errors.push('The place field is missing!')
            }

            if (!this.errors.length) {
                this.$store.commit('setIsLoading', true) 
                this.stripeTokenHandler()         
            }
            
        },

        async stripeTokenHandler() {
            const items = []

            for (let i = 0; i < this.cart.items.length; i++) {
                const item = this.cart.items[i]
                const obj = {
                    product: item.product.id,
                    quantity: item.quantity,
                    price: item.product.price * item.quantity
                }

                items.push(obj)
            }

            const data = {
                'first_name': this.first_name,
                'last_name': this.last_name,
                'email': this.email,
                'address': this.address,
                'zipcode': this.zipcode,
                'place': this.place,
                'phone': this.phone,
                'items': items,
                
            }
            axios
                .post('/api/v1/checkout/', data, {
                    headers: {
                    'Authorization': `Token ${this.token}`
                    }
                })
                .then(response => {
                    this.$store.commit('clearCart')
                    this.$router.push('/cart/success')
                })
                .catch(error => {
                    this.errors.push('Something went wrong. Please try again')
                    console.log(error)
                })

                this.$store.commit('setIsLoading', false)

        }

    },

    computed: {
        
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.product.price * curVal.quantity
            }, 0)
        },
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
        ...mapState(['token'])
    }
}
</script>
