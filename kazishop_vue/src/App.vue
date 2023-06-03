<template>
  <!-- <RouterView /> -->
<main class = "min-h-screen">
    <!-- Navigation Section Start -->
    <section id="navbar">
      <nav
        class="
          md:flex md:justify-between md:items-center
          bg-gradient-to-r from-slate-800 to-slate-400 px-2 sm:px-4 py-2.5
        "
      >
        <div class="flex items-center justify-between">
          <h1 class="
              text-sm 
              text-white
              md:text-base
        
            "
            > <router-link to='/'>Kazishop</router-link> 
          </h1>
          <!-- Mobile menu button -->
          <div @click="showMenu = !showMenu" class="flex md:hidden">
            <button
              type="button"
              class="
                text-gray-800
                hover:text-gray-600
                focus:outline-none focus:text-gray-400
              "
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
          <li class="text-sm w-12 h-6 font-bold flex items-center justify-center md:rounded md:bg-white text-gray-300 md:text-gray-800 md:hover:text-gray-600 hover:text-sky-800">
            <router-link to="">Log in</router-link>
          </li>

          <li class="text-sm font-bold text-gray-300 md:text-gray-800  ">
            <router-link to=""> Cart </router-link>
          </li>
        </ul>
      </nav>
    </section>
    <!-- Navigation Section End -->

  <section class="section">
    <router-view/>
    <!-- <RouterView/> -->
  </section>

  <footer class="footer">
    <p class="text-center">Copyright (c) 2023</p>
  </footer>


</main>

</template>


<script>
import axios from 'axios'
import { RouterLink, RouterView } from 'vue-router'

export default {
  data() {
    return {
      showMenu: false,
    };
  },
};
</script>
