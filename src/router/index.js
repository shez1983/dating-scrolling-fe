import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/verify',
      name: 'verifyEmail',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/verifyEmail.vue')
    },
    {
      path: '/feedback',
      name: 'feedback.create',
      component: () => import('../views/FeedbackCreateView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/users',
      name: 'users.index',
      component: () => import('../views/UsersIndexView.vue')
    },
    {
      path: '/users/:username',
      name: 'users.show',
      // route level code-splitting
      component: () => import('../views/UsersShowView.vue')
    },
    {
      path: '/profiles/me',
      name: 'profile.edit',
      // route level code-splitting
      component: () => import('../views/UsersEditView.vue')
    },
    {
      path: '/blocked-users',
      name: 'blockedUsers.index',
      component: () => import('../views/BlockedUsersIndex.vue')
    },
    {
      path: '/taps',
      name: 'taps.index',
      component: () => import('../views/TapsIndex.vue')
    },
    {
      path: '/favourites',
      name: 'favourites.index',
      component: () => import('../views/FavouritesIndex.vue')
    },
    {
      path: '/preferences/me',
      name: 'preferences.show',
      component: () => import('../views/preferencesEdit.vue')
    },
    {
      path: '/inboxes',
      name: 'inboxes.index',
      component: () => import('../views/InboxesIndexView.vue')
    },
    {
      path: '/inboxes/:id',
      name: 'inboxes.show',
      component: () => import('../views/InboxesShowView.vue')
    },
  ]
})

export default router
