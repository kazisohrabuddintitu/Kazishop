<template>
    <div class="page-success"> 
            <div class="text-lg p-10 text-center">
                <h1 class="title text-2xl mb-5">Thank you</h1>

                <p>Your order will be processed within 48 hours</p>
            </div>      
    </div>
</template>

<script>
export default {
    name: 'Success',
    mounted() {
        document.title = 'Success | Kazishop'
    },
}
</script>