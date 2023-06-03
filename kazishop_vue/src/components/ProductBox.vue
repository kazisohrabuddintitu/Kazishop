<template>
    
    <div class="md:w-64 mx-auto">
        <div class="bg-white rounded-lg shadow p-4">
            <figure class="">
            <img :src="product.get_thumbnail" class="mb-4">
            </figure>

            <h3 class="text-xl font-semibold">{{ product.name }}</h3>
            <p class="text-gray-500 text-sm">BDT{{ product.price }}</p>

            <router-link :to="product.get_absolute_url" class="bg-gray-800 text-white text-sm font-medium rounded-full px-4 py-2 mt-4 inline-block">
            View details
            </router-link>
        </div>
    </div>

</template>

<script>
export default {
    name: 'ProductBox',
    props: {
        product: Object
    }
}
</script>
