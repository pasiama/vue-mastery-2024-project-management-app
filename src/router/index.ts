import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // routes: [
  //   {
  //     path: '/',
  //     name: 'landing',
  //     component: () => import('@/views/LandingView.vue'),
  //   },
  //   {
  //     path: '/register',
  //     name: 'register',
  //     component: () => import('@/views/RegisterView.vue'),
  //   },
  //   {
  //     path: '/home',
  //     name: 'home',
  //     component: () => import('@/views/HomeView.vue'),
  //   },
  //   {
  //     path: '/projects',
  //     name: 'projects',
  //     component: () => import('@/views/ProjectsView.vue'),
  //   },
  //   {
  //     //dynamic routing using wildcats
  //     path: '/projects/:id',
  //     name: 'single-project',
  //     component: () => import('@/views/SingleProjectView.vue'),
  //   },
  //   {
  //     //not found
  //     path: '/:catchAll(.*)*',
  //     name: 'NotFound',
  //     component: h('div', 'Page Not Found'),
  //   },
  // ],
})

export default router

// study why the dynamic import is necesaary in vue and not the lazy loady in content rendering with routing (lazy loading rotes with vite's dynamic import)
//understanding wildcat in dynamic routing
//learn the unplugin-use-router and how it works
