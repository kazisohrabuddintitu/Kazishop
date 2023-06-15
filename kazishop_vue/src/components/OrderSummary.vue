<template>
  <div class="box m-4 bg-slate-100">
        <h3 class="is-size-4 mb-2">Order #{{ order.id }}</h3>

        <h4 class="is-size-5">Products</h4>

        <table class="w-auto md:w-full md:max-w-none">
            <thead class="border">
                <tr>
                    <th class="px-4 py-2">Product</th>
                    <th class="px-4 py-2">Price</th>
                    <th class="px-4 py-2">Quantity</th>
                    <th class="px-4 py-2">Total</th>
                </tr>                   
            </thead>

            <tbody>
                <tr
                    v-for="item in order.items"
                    v-bind:key="item.product.id"
                >
                    <td>{{ item.product.name }}</td>
                    <td>BDT{{ item.product.price }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>BDT{{ getItemTotal(item).toFixed(2) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'OrderSummary',
    props: {
        order: Object
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price
        },
        orderTotalLength(order) {
            return order.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
    }
}
</script>
