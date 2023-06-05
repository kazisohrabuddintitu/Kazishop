<template>
    <div>
        <div>
            <h2 class="">Search term: "{{ query }}"</h2>
        </div>
        <ProductBox 
            v-for="product in products"
            v-bind:key="product.id"
            v-bind:product="product" />
    </div>
  
</template>

<script>
import axios from 'axios';
import ProductBox from '../components/ProductBox.vue';

export default {
    name: 'Search',
    components: {
        ProductBox
    },
    data() {
        return {
            products: [],
            query: ''
        }
    },
    mounted() {
        document.title = 'Search | Kazishop'

        let uri = window.location.search.substring(1)
        let params = new URLSearchParams(uri)

        if (params.get('query')) {
            this.query = params.get('query')

            this.performSearch()
        }
    },
    methods: {
        async performSearch() {
            await axios
                .post('/api/v1/products/search/', {'query': this.query})
                .then(response => {
                    this.products = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>
