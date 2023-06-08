<template>
  <tr>
        <td><router-link :to="item.product.get_absolute_url">{{ item.product.name }}</router-link></td>
        <td>BDT{{ item.product.price }}</td>
        <td>
            {{ item.quantity }}
            <button><a class="px-2 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-200" @click="decrementQuantity(item)">-</a></button>
            <button><a class="px-2 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-200" @click="incrementQuantity(item)">+</a></button>

        </td>
        <td>BDT{{ getItemTotal(item).toFixed(2) }}</td>
        <td><button class="flex items-center justify-center 
        bg-red-500 hover:bg-red-600 text-white font-bold py-1 
        px-2 rounded text-sm" @click="removeFromCart(item)">
            Delete
        </button></td>
    </tr>
</template>

<script>
export default {
    name: 'CartItem',
    props: {
        initialItem: Object
    },
    data() {
        return {
            item: this.initialItem
        }
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price
        },
        decrementQuantity(item) {
            item.quantity -= 1

            if (item.quantity === 0) {
                this.$emit('removeFromCart', item)
            }

            this.updateCart()
        },
        incrementQuantity(item) {
            item.quantity += 1

            this.updateCart()
        },
        updateCart() {
            localStorage.setItem('cart', JSON.stringify(this.$store.state.cart))
        },
        removeFromCart(item) {
            this.$emit('removeFromCart', item)

            this.updateCart()
        },
    },
}
</script>

<style>

</style>