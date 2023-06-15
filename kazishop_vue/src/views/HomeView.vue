<template>
  <div class="home">
        <section class="head md:h-60 h-28 bg-slate-600 flex justify-center items-center">
            <div class="grid place-items-center">
              <p class="text-white text-center font-bold text-3xl">
                Welcome to Kazishop
              </p>
              <p class="text-white text-center text-lg">
                  The best online store
              </p>

            </div>
        </section>

        <div class="grid md:grid-cols-4 gap-2 pt-5">
          <ProductBox 
          v-for="product in latestProducts"
          v-bind:key="product.id"
          v-bind:product="product" />
        </div>
  </div>
</template>

<script>
import axios from 'axios'
// import ProductBox from '@/components/ProductBox.vue'
import ProductBox from "../components/ProductBox.vue"

export default {
  name: 'home',
  data() {
    return {
      latestProducts: []
    }
  },
  components: {
    ProductBox
  },
  mounted() {
    this.getLatestProducts()
    document.title = 'Home | Kazishop'
  },
  methods: {
    getLatestProducts() {
      axios.get('/api/v1/latest-products/')
        .then(response => {
          this.latestProducts = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>