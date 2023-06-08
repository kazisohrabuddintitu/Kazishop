<template>
  <!-- <RouterView /> -->
<main class = "flex flex-col min-h-screen">
    <!-- Navigation Section Start -->
    <section id="navbar">
  <nav
    class="
      md:flex md:justify-between md:items-center
      bg-gradient-to-r from-slate-800 to-slate-400 px-2 sm:px-4 py-2.5
    "
  >
          <div class="flex items-center justify-between"> 
            <h1 class="text-sm text-white md:text-base">
              <router-link to="/">Kazishop</router-link>
            </h1>
            <!-- Search bar -->
            <div class="flex items-center pl-2"> 
              <form method="get" action="/search">
                <input
                  type="text"
                  class="input py-1.5 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-lime-600 text-sm text-gray-800"
                  placeholder="What are you looking for?"
                  name="query"
                />
              </form>
            </div>
            <!-- Mobile menu button -->
            <div @click="showMenu = !showMenu" class="flex md:hidden">
              <button
                type="button"
                class="text-white focus:outline-none focus:text-gray-400"
              >
                <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                  <path
                    fill-rule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <ul
          :class="showMenu ? 'flex' : 'hidden'"
          class="
            flex-col
            mt-8
            space-y-4
            md:flex
            md:space-y-0
            md:flex-row
            md:items-center
            md:space-x-10
            md:mt-0
            
          "
        >
          <li class="text-sm font-bold text-gray-300 md:text-gray-800">          
            <router-link to="/summer" > Summer </router-link>
          </li>
          <li class="text-sm font-bold text-gray-300 md:text-gray-800">          
            <router-link to="/winter"> Winter </router-link>
          </li>
          <li class="text-sm w-16 h-8 font-bold flex items-center justify-center rounded bg-lime-600 md:bg-white text-gray-300 md:text-gray-800">
            <router-link to="">Log in</router-link>
          </li>

          <li class="text-sm w-16 h-8 md:h-8 md:w-16 font-bold flex items-center justify-center rounded bg-lime-600 md:bg-white text-gray-300 md:text-gray-800">
            <router-link to="/cart">Cart ({{ cartTotalLength }})</router-link>
          </li>
        </ul>
      </nav>
    </section>
    <!-- Navigation Section End -->

    <section class="flex-grow">
      <router-view/>
      <!-- <RouterView/> -->
    </section>


    <!-- Footer Section Start -->
    <footer class="footer bg-gray-200 py-4 mt-auto">
      <div class="container mx-auto text-center">
        <p class="text-gray-500 text-sm">
          &copy; 2023 Kazishop. All rights reserved.
        </p>
      </div>
    </footer>
    <!-- Footer Section End -->
</main>

</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      showMenu: false,
      cart: {
        items: []
      },
    }
  },
  beforeCreate() {
    this.$store.commit('initializeStore')

    const token = this.$store.state.token

    if (token) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
        axios.defaults.headers.common['Authorization'] = ""
    }
  },
  mounted() {
    this.cart = this.$store.state.cart
  },
  computed: {
      cartTotalLength() {
          let totalLength = 0

          for (let i = 0; i < this.cart.items.length; i++) {
              totalLength += this.cart.items[i].quantity
          }

          return totalLength
      },
      
  }
}
</script>
