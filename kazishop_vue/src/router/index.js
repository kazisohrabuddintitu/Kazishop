import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Category from "../views/Category.vue"
import Product from "../views/Product.vue"
import Search from "../views/Search.vue"
import Cart from "../views/Cart.vue"
import SignUp from "../views/SignUp.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:category_slug',
      name: 'Category',
      component: Category
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/:category_slug/:product_slug',
      name: 'Product',
      component: Product
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
