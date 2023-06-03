<template>
  <div class="page-product">
  <div class="grid md:grid-cols-2">
    <div class="p-4">
      <figure>
        <img :src="product.get_image" class="w-full">
      </figure>

      <h1 class="text-3xl font-bold mt-6">{{ product.name }}</h1>

      <p class="mt-4">{{ product.description }}</p>
    </div>

    <div class="p-4">
      <h2 class="text-2xl">Information</h2>

      <p class="mt-2"><strong>Price:</strong> BDT{{ product.price }}</p>

      <div class="mt-6">
        <div class="flex items-center">
          <input type="number" class="w-16 px-2 py-1 border rounded" min="1" v-model="quantity">
          <button class="ml-2 py-2 px-4 bg-gray-800 text-white rounded" @click="addToCart">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2';

export default {
    name: 'Product',
    data(){
        return {
            product: {},
            quantity: 1
        }
    },
    mounted(){
        this.getProduct()
    },
    methods: {
        getProduct(){
            const category_slug = this.$route.params.category_slug
            const product_slug = this.$route.params.product_slug

            axios.get(`/api/v1/products/${category_slug}/${product_slug}`)
            .then(response => {
                this.product = response.data
            }).catch(error => {
                console.log(error)
            })
        },
        addToCart() {
          if (isNaN(this.quantity) || this.quantity < 1){
            this.quantity = 1
          }

          const item = {
            product: this.product,
            quantity: this.quantity
          }

          this.$store.commit('addToCart', item)
          
          // Display a pop-up notification using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Product Added',
        text: 'The product was added to the cart',
        position: 'bottom-end',
        timer: 2000,
        toast: true,
        showConfirmButton: false
      });

        }
    }
}
</script>

<style>

</style>