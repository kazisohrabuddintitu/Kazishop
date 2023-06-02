import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import summer from "../views/summer.vue"
import winter from "../views/winter.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/summer',
      name: 'summer',
      component: summer
    },
    {
      path: '/winter',
      name: 'winter',
      component: winter
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
