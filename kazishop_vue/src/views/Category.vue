<template>
  <div>
    <div class="">
      <h2 class="text-center pt-4 mb-10"> {{ category.name }}</h2>
    </div>
    <div class="grid md:grid-cols-4 gap-2">
            <ProductBox 
            v-for="product in category.products"
            v-bind:key="product.id"
            v-bind:product="product" />
    </div>
  </div>
    
</template>

<script>
import axios from 'axios'
import ProductBox from '../components/ProductBox.vue';
import Swal from 'sweetalert2';

export default {
  name: 'Category',
  components: {
    ProductBox
  },
  data(){
    return{
      category: {
        products: []
      }
    }
  },
  mounted(){
    this.getCategory()
  },
  watch: {
        $route(to, from) {
            if (to.name === 'Category') {
                this.getCategory()
            }
        }
    },
  methods: {
    getCategory() {
            const categorySlug = this.$route.params.category_slug

            axios.get(`/api/v1/products/${categorySlug}/`).then(response => {
                    this.category = response.data

                    document.title = this.category.name + ' | Kazishop'
                }).catch(error => {
                    console.log(error)

                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Something went wrong. Please try again.',
                      position: 'bottom-end',
                      timer: 2000,
                      toast: true,
                      showConfirmButton: false
                    });
                })
        }
  }
}
</script>