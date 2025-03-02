import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

// study why the dynamic import is necesaary in vue and not the lazy loady in content rendering with routing (lazy loading rotes with vite's dynamic import)
//understanding wildcat in dynamic routing
//learn the unplugin-use-router and how it works
///why IIFE can be used and nit the unmounted lifecycle hook
/// study tandstack with shadcn ui, iconify
/// how the packages and dependencies are moaking life easier with relation to nuxt.js
///also study tthe h funtion from vue
